/*import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Auth2Service } from '../services/auth2.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  newPasswordFocused = false;
  confirmPasswordFocused = false;
  isLoading = false;
  message = '';
  isSuccess = false;
f: any;

  constructor(
    private fb: FormBuilder,
    private authService: Auth2Service,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      token: [''],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.resetPasswordForm.patchValue({ token });
      } else {
        this.message = 'Token de réinitialisation manquant';
        this.isSuccess = false;
      }
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }
  
    this.isLoading = true;
    this.message = '';
    
   
    const formData = this.resetPasswordForm.value;
  
  
    if (!formData.token) {
      this.message = 'Token de réinitialisation invalide';
      this.isSuccess = false;
      this.isLoading = false;
      return;
    }
  
    console.log('Données envoyées:', formData); 
  
    this.authService.resetPassword(formData).subscribe({
      next: (response) => {
        console.log('Réponse du serveur:', response);
        this.message = 'Votre mot de passe a été réinitialisé avec succès';
        alert('Votre mot de passe a été réinitialisé avec succès');
        this.isSuccess = true;
        
        setTimeout(() => {
          this.router.navigate(['/signin']);
        }, 3000);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erreur:', error); 
        this.isLoading = false;
        this.isSuccess = false;
        
        if (error.status === 400) {
          this.message = error.error?.message || 'Données de réinitialisation invalides';
        } else if (error.status === 404) {
          this.message = 'Le lien de réinitialisation est invalide ou a expiré';
        } else if (error.status === 0) {
          this.message = 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.';
        } else {
          alert('Votre mot de passe a été réinitialisé avec succès');
        }
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Auth2Service } from '../services/auth2.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  newPasswordFocused = false;
  confirmPasswordFocused = false;
  isLoading = false;
  message = '';
  isSuccess = false;

  constructor(
    private fb: FormBuilder,
    private authService: Auth2Service,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      token: [''],
      newPassword: ['', [
        Validators.required, 
        Validators.minLength(8),
        this.passwordComplexityValidator
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.resetPasswordForm.patchValue({ token });
      } else {
        this.message = 'Token de réinitialisation manquant';
        this.isSuccess = false;
      }
    });
  }

  // Validateur pour vérifier la complexité du mot de passe
  passwordComplexityValidator(control: any) {
    const value = control.value;
    if (!value) return null;
    
    const hasNumber = /\d/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    
    return hasNumber && hasUpper ? null : { passwordComplexity: true };
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      
      // Vérification spécifique pour la complexité du mot de passe
      if (this.resetPasswordForm.get('newPassword')?.errors?.['passwordComplexity']) {
        alert('Le mot de passe doit contenir au moins un chiffre et une lettre majuscule');
      }
      
      return;
    }
  
    this.isLoading = true;
    this.message = '';
    
    const formData = this.resetPasswordForm.value;
  
    if (!formData.token) {
      this.message = 'Token de réinitialisation invalide';
      this.isSuccess = false;
      this.isLoading = false;
      return;
    }
  
    this.authService.resetPassword(formData).subscribe({
      next: (response) => {
        this.message = 'Votre mot de passe a été réinitialisé avec succès';
        alert('Votre mot de passe a été réinitialisé avec succès');
        this.isSuccess = true;
        
        setTimeout(() => {
          this.router.navigate(['/signin']);
        }, 1000);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erreur:', error);
        this.isLoading = false;
        this.isSuccess = false;
        
        if (error.status === 400) {
          this.message = error.error?.message || 'Données de réinitialisation invalides';
        } else if (error.status === 404) {
          this.message = 'Le lien de réinitialisation est invalide ou a expiré';
        } else if (error.status === 0) {
          this.message = 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.';
        } else {
          this.message = 'Votre mot de passe a été réinitialisé avec succès';
          alert('Votre mot de passe a été réinitialisé avec succès');
          this.isSuccess = true;
          
          setTimeout(() => {
            this.router.navigate(['/signin']);
          }, 1000);

        }
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}