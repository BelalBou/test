import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Products } from '../../auth/service/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  product?: Products;
  similarProducts: Products[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.productService.getById(id).subscribe((data) => {
          this.product = data;

          // Charger les produits similaires de la même catégorie
          if (data?.category_id) {
            this.productService.getAll().subscribe((allProducts) => {
              this.similarProducts = allProducts.filter(
                (p) => p.category_id === data.category_id && p.id !== data.id // exclure le produit en cours
              );
            });
          }
        });
      }
    });
  }

  addToCart(product?: Products): void {
    const prod = product || this.product;
    if (!prod) return;

    this.cartService.addToCart({
      productId: prod.id,
      name: prod.title,
      price: prod.price,
      quantity: 1,
      imageUrl: prod.image_url,
    });
  }
}
