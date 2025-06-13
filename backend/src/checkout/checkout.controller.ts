import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Controller('checkout')
export class CheckoutController {
  private stripe: Stripe;

  constructor(@Inject(ConfigService) private config: ConfigService) {
    this.stripe = new Stripe(this.config.get<string>('STRIPE_SECRET_KEY')!, {
      apiVersion: '2022-11-15' as any,
    });
  }
  @Post('create-session')
  async createCheckoutSession(@Body() body: { cart: any[] }) {
    const frontendUrl = this.config.get<string>('FRONTEND_URL') || 'http://localhost:4200';
    
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: body.cart.map((item) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${frontendUrl}/success`,
      cancel_url: `${frontendUrl}/cart`,
    });

    return { id: session.id };
  }
}
