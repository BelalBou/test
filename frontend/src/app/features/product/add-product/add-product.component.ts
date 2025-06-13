import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
})
export class AddProductComponent {
  title = '';
  description = '';
  price: number = 0;
  image_url = '';
  stock: number = 0;
  category_id: number = 1;
  @Output() productAdded = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  saveProduct() {
    const token = localStorage.getItem('token');
    const product = {
      title: this.title,
      description: this.description,
      price: this.price,
      image_url: this.image_url,
      stock: this.stock,
      category_id: this.category_id,
    };

    this.http
      .post('http://localhost:3000/products/me', product, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: () => {
          alert('Produit ajouté');
          this.productAdded.emit();
        },
        error: (err) => console.error(err),
      });
  }
}
