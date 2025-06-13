import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorService, Vendor } from '../../core/services/vendors.service';
import { AddProductComponent } from '../product/add-product/add-product.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mon-commerce',
  standalone: true,
  imports: [CommonModule, AddProductComponent, FormsModule],
  templateUrl: './mon-commerce.component.html',
})
export class MonCommerceComponent {
  showAddForm = false;
  vendor: Vendor | null = null;
  editingProductId: number | null = null;
  editForm: any = {};
  feedbackMessage = '';

  constructor(private vendorService: VendorService, private http: HttpClient) {}

  ngOnInit() {
    this.loadVendor();
  }

  loadVendor() {
    this.vendorService.getMyVendor().subscribe((vendor) => {
      this.vendor = vendor;
      if (this.editingProductId && vendor.products) {
        const prod = vendor.products.find(
          (p: any) => p.id === this.editingProductId
        );
        if (prod) this.editForm = { ...prod };
      }
    });
  }

  onProductAdded() {
    this.showAddForm = false;
    this.loadVendor();
    this.feedback('Produit ajouté avec succès !');
  }

  confirmDelete(product: any) {
    if (confirm('Supprimer ce produit ?')) {
      this.deleteProduct(product);
    }
  }

  deleteProduct(product: any) {
    const token = localStorage.getItem('token');
    this.http
      .delete(`http://localhost:3000/products/${product.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: () => {
          this.loadVendor();
          this.feedback('Produit supprimé !');
        },
        error: () => this.feedback('Erreur lors de la suppression', true),
      });
  }

  startEdit(product: any) {
    this.editingProductId = product.id;
    this.editForm = { ...product };
  }

  isEditing(product: any) {
    return this.editingProductId === product.id;
  }

  cancelEdit() {
    this.editingProductId = null;
    this.editForm = {};
  }

  submitEdit(product: any) {
    const token = localStorage.getItem('token');
    this.http
      .patch(`http://localhost:3000/products/${product.id}`, this.editForm, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: () => {
          this.editingProductId = null;
          this.loadVendor();
          this.feedback('Produit modifié !');
        },
        error: () => this.feedback('Erreur lors de la modification', true),
      });
  }

  feedback(msg: string, error = false) {
    this.feedbackMessage = msg;
    setTimeout(() => (this.feedbackMessage = ''), error ? 4000 : 2000);
  }
}
