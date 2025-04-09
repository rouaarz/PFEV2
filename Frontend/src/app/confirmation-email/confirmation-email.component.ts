import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth2Service } from '../services/auth2.service';

@Component({
  selector: 'app-confirmation-email',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './confirmation-email.component.html',
  styleUrls: ['./confirmation-email.component.css']
})
export class ConfirmationEmailComponent {
  email: string = '';
  isResending: boolean = false;
  resendSuccess: boolean = false;
  errorMessage: string = '';

  constructor(private authService: Auth2Service, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { email?: string };

    if (state?.email) {
      this.email = state.email;
    } else {
      this.errorMessage = "Adresse email manquante. Veuillez recommencer.";
    }
  }

  resendEmail() {
    if (!this.email) {
      this.errorMessage = 'Veuillez entrer une adresse email';
      return;
    }

    this.isResending = true;
    this.errorMessage = '';
    this.resendSuccess = false;

    this.authService.resendResetEmail(this.email).subscribe({
      next: () => {
        this.isResending = false;
        this.resendSuccess = true;
      },
      error: (err) => {
        this.isResending = false;
        this.errorMessage = err.error?.message || 'Erreur lors de l\'envoi de l\'email';
        console.error('Erreur resend email:', err);
      }
    });
  }
}
