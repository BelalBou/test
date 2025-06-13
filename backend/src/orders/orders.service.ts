import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { Product } from '../products/products.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly configService: ConfigService,
  ) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY')!,
      {
        apiVersion: '2022-11-15',
      },
    );
  }

  async createOrder(cart: any[]) {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const updatedProducts: Product[] = [];

    for (const item of cart) {
      const product = await this.productRepository.findOneBy({
        id: item.productId,
      });
      if (!product)
        throw new BadRequestException(
          `Produit introuvable : ${item.productId}`,
        );
      if (product.stock < item.quantity)
        throw new BadRequestException(
          `Stock insuffisant pour ${product.title}`,
        );
      product.stock -= item.quantity;
      updatedProducts.push(product);
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: { name: product.title },
          unit_amount: Math.round(Number(product.price) * 100),
        },
        quantity: item.quantity,
      });
    }

    await this.productRepository.save(updatedProducts);

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: 'http://localhost:4200/success',
      cancel_url: 'http://localhost:4200/cart',
    });

    const order = this.orderRepository.create({
      cart,
      totalAmount: cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
      stripeSessionId: session.id,
    });
    await this.orderRepository.save(order);

    return { sessionId: session.id };
  }
}
