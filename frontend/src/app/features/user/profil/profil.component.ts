import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/service/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profil.component.html',
})
export class ProfilComponent {
  firstname = '';
  lastname = '';
  email = '';
  imagePreview: string | ArrayBuffer | null = null;
  selectedImage: File | null = null;
  role: string | null = null;

  // Nouveaux champs pour la fiche commerçant :
  business_name = '';
  description = '';
  location = '';
  vendorImagePreview: string | ArrayBuffer | null = null;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.role = this.authService.getRole();
    this.loadUserData();

    // Abonnement à l'observable du rôle pour recharger le profil à chaque changement
    this.authService.role$.subscribe((role) => {
      this.role = role;
      this.loadUserData();
    });
  }

  loadUserData() {
    const token = this.authService.getToken();
    this.http
      .get<any>('/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: (user) => {
          this.firstname = user.firstname;
          this.lastname = user.lastname;
          this.email = user.email;

          // Si c'est un vendeur, charger aussi sa fiche :
          if (this.role === 'vendor') {
            this.http
              .get<any>('/api/vendors/me', {
                headers: { Authorization: `Bearer ${token}` },
              })
              .subscribe({
                next: (vendor) => {
                  this.business_name = vendor.business_name;
                  this.description = vendor.description;
                  this.location = vendor.location;
                  this.vendorImagePreview = vendor.image_url;
                },
                error: (err) => {
                  if (err.status !== 404) {
                    console.error(err);
                  }
                  // Si 404, on ignore simplement (pas encore vendeur)
                },
              });
          }
        },
        error: (err) => console.error(err),
      });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onVendorImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.vendorImagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  save() {
    const token = this.authService.getToken();
    const data = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
    };
    this.http
      .patch('/api/users/me', data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: () => alert('Profil mis à jour'),
        error: (err) => console.error(err),
      });
  }

  saveVendorInfo() {
    const token = this.authService.getToken();
    const data = {
      business_name: this.business_name,
      description: this.description,
      location: this.location,
      image_url: this.vendorImagePreview,
    };
    this.http
      .patch('/api/vendors/me', data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: () => alert('Fiche commerçant enregistrée !'),
        error: (err) => console.error(err),
      });
  }

  devenirVendeur() {
    const token = this.authService.getToken();
    this.http
      .patch(
        '/api/users/vendor',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .subscribe({
        next: () => {
          this.authService.setRole('vendor');
          this.role = 'vendor';
          alert('Vous êtes maintenant vendeur'); // 👈 Ajoute un message ici si tu veux voir si ça marche
        },
        error: (err) => {
          console.error(err);
          alert('Erreur : impossible de devenir vendeur'); // 👈 à ajouter aussi pour feedback
        },
      });
  }
}
