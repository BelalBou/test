import { Injectable } from '@angular/core';

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey = 'cart';

  constructor() {}

  getCart(): CartItem[] {
    const cart = localStorage.getItem(this.storageKey);
    return cart ? JSON.parse(cart) : [];
  }

  saveCart(cart: CartItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  addToCart(item: CartItem): void {
    const cart = this.getCart();
    const existingItem = cart.find((i) => i.productId === item.productId);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cart.push(item);
    }
    this.saveCart(cart);
  }

  removeFromCart(productId: number): void {
    const cart = this.getCart().filter((item) => item.productId !== productId);
    this.saveCart(cart);
  }

  updateQuantity(productId: number, quantity: number): void {
    const cart = this.getCart().map((item) => {
      if (item.productId === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    this.saveCart(cart);
  }

  clearCart(): void {
    localStorage.removeItem(this.storageKey);
  }

  getTotal(): number {
    return this.getCart().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
