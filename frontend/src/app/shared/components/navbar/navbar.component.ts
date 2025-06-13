import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../features/auth/service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  role: string | null = null;
  showMenu = false;

  constructor(public authService: AuthService) {
    this.authService.role$.subscribe((role) => {
      this.role = role;
    });
  }

  logout() {
    this.authService.clearAuth();
    location.reload(); // ou router.navigate(['/']) si tu préfères
  }
}
