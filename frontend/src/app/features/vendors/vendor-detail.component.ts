import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VendorService, Vendor } from '../../core/services/vendors.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  standalone: true,
  selector: 'app-vendor-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './vendor-detail.component.html',
})
export class VendorsDetailComponent implements OnInit {
  vendor?: Vendor;
  private cartService = inject(CartService);

  constructor(
    private route: ActivatedRoute,
    private vendorService: VendorService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.vendorService.getById(id).subscribe((data) => {
        this.vendor = data;
      });
    }
  }
  addToCart(product: any) {
    this.cartService.addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
    });
  }
}
