import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth2Service } from '../services/auth2.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  isLoading = false;
  message: string = '';
  isSuccess = false;
  emailFocused: any;

  constructor(
    private fb: FormBuilder,
    private authService: Auth2Service,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

 /* onSubmit(): void {
    if (this.forgotPasswordForm.invalid) return;

    this.isLoading = true;
    const email = this.forgotPasswordForm.value.email;

    this.authService.forgotPassword(email).subscribe(
      (response) => {
        this.isLoading = false;
        // Vérifiez si la réponse indique que l'email n'existe pas
        if (response && response.message === 'Email not found') {
          this.isSuccess = false;
          this.message = 'Il n\'y a pas de compte avec cet email';
          alert('Il n\'y a pas de compte avec cet email');
        } else {
          this.router.navigate(['/Confirmationemail'], { state: { email } });
        }
      },
      (error) => {
        this.isSuccess = false;
        // Si le backend retourne une erreur 404 ou un message spécifique
        if (error.status === 404 || error.error?.message === 'Email not found') {
          this.message = 'Il n\'y a pas de compte avec cet email';
          alert('Il n\'y a pas de compte avec cet email');
        } else {
          this.message = error.error?.message || 'Une erreur est survenue.';
        }
        this.isLoading = false;
      }
    );
  }*/
    onSubmit(): void {
      if (this.forgotPasswordForm.invalid) return;
  
      this.isLoading = true;
      const email = this.forgotPasswordForm.value.email;
  
      this.authService.forgotPassword(email).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.isSuccess = true;
          this.message = response.message;
          this.router.navigate(['/Confirmationemail'], { state: { email } });
        },
        error: (error) => {
          this.isLoading = false;
          this.isSuccess = false;
          
          // Vérification spécifique pour l'email inexistant
          if (error.status === 404 && error.error?.error === "Vous n'avez pas de compte avec cet email") {
            this.message = "Vous n'avez pas de compte avec cet email";
          } else {
            this.message = error.error?.message || 'Une erreur est survenue lors de la demande de réinitialisation';
          }
          
          // Optionnel: afficher aussi une alerte
          alert(this.message);
        }
      });
  }
}