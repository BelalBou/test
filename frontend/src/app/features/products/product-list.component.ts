import { Component, inject } from '@angular/core';
import { CommonModule, NgFor, AsyncPipe } from '@angular/common';
import { ProductService } from '../auth/service/product.service';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service'; // 👈 ajoute ceci

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, NgFor, AsyncPipe, RouterModule],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService); // 👈 ajoute ceci

  products$ = this.productService.getAll();

  addToCart(product: any) {
    this.cartService.addToCart({
      productId: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      imageUrl: product.image_url,
    });
  }
}
