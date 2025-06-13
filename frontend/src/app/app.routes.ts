import { AuthGuard } from './features/auth/guards/auth.guard';
import { RoleGuard } from './features/auth/guards/role.guard';
import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { HomeComponent } from './features/home/home.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ProductListComponent } from './features/products/product-list.component';
import { ProductDetailComponent } from './features/product/product-detail/product-detail.component';
import { SuccessComponent } from './features/success/success.component';
import { VendorsComponent } from './features/vendors/vendors.component';
import { VendorsDetailComponent } from './features/vendors/vendor-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      {
        path: 'cart',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./features/cart/cart.component').then((m) => m.CartComponent),
      },
      { path: 'success', component: SuccessComponent },
      { path: 'vendors', component: VendorsComponent },
      { path: 'vendors/:id', component: VendorsDetailComponent },
      {
        path: 'profil',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./features/user/profil/profil.component').then(
            (m) => m.ProfilComponent
          ),
      },
      {
        path: 'mon-commerce',
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['vendor'] },
        loadComponent: () =>
          import('./features/vendors/mon-commerce.component').then(
            (m) => m.MonCommerceComponent
          ),
      },
      {
        path: 'success',
        canActivate: [AuthGuard],
        component: SuccessComponent,
      },
      {
        path: 'ajouter-produit',
        loadComponent: () =>
          import('./features/product/add-product/add-product.component').then(
            (m) => m.AddProductComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
