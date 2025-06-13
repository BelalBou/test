import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../core/services/cart.service';
import { StripeService } from '../../core/services/stripe.service'; // 👈

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  errorMessage = '';

  constructor(
    private cartService: CartService,
    private stripeService: StripeService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cart = this.cartService.getCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
    this.loadCart();
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  checkout(): void {
    const cart = this.cartService.getCart();
    this.errorMessage = '';
    this.stripeService.redirectToCheckout(cart).catch((err) => {
      if (err && err.error && err.error.message) {
        this.errorMessage = err.error.message;
      } else if (err && err.message) {
        this.errorMessage = err.message;
      } else {
        this.errorMessage = 'Erreur lors du paiement';
      }
    });
  }
}
