import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { AuthService } from '../../features/auth/service/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <main style=" min-height: 80vh;">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
})
export class LayoutComponent {
  constructor(private authService: AuthService) {
    console.log('LayoutComponent loaded!');
  }
}
