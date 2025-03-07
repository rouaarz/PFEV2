import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SignupData } from '../models/SignupData';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule] // Ajout des imports nécessaires
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = ''; // Pour afficher les erreurs globales

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
        confirmPassword: ['', Validators.required],
        role: ['developpeur', Validators.required]
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  /**
   * Vérifie si password et confirmPassword sont identiques.
   */
  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  signUp() {
    if (this.signupForm.invalid) {
      this.errorMessage = "Veuillez remplir correctement tous les champs.";
      alert(this.errorMessage);
      return;
    }

    const signupData: SignupData = {
      username: this.signupForm.value.username,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      role: [this.signupForm.value.role]
    };

    this.authService.signup(signupData).subscribe({
      next: response => {
        alert("✅ Inscription réussie !");
        this.signupForm.reset(); // Réinitialiser le formulaire
        Object.keys(this.signupForm.controls).forEach(key => {
          this.signupForm.get(key)?.setErrors(null);
        });
        this.router.navigate(['/signin']);
      },
      error: err => {
        console.error('Erreur d’inscription:', err);

        if (err.status === 400) {
          this.errorMessage = "username or email already in use";
        } else if (err.status === 500) {
          this.errorMessage = "⛔ Erreur serveur. Veuillez réessayer plus tard.";
        } else {
          this.errorMessage = "⚠️ Une erreur inattendue s'est produite.";
        }

        alert(this.errorMessage);
      }
    });
  }
}
