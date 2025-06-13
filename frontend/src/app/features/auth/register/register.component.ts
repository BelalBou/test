import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../service/auth.service'; // ajuste si besoin

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  signupForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;

      this.authService.register(formData).subscribe({
        next: (res) => {
          this.successMessage =
            'Inscription réussie ! Vous pouvez vous connecter.';
          this.errorMessage = null;
          this.signupForm.reset();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erreur inconnue.';
          this.successMessage = null;
        },
      });
    }
  }
}
