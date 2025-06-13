import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success.component.html',
})
export class SuccessComponent implements OnInit {
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.clearCart(); // 🧹 Vide le panier à l’arrivée
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
