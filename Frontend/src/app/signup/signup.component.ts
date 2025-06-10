import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SignupData } from '../models/SignupData';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule,RouterModule]
})
export class SignupComponent implements AfterViewInit, OnDestroy {
  signupForm: FormGroup;
  errorMessage: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  private slideInterval: any;
  private currentSlide = 0;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
        password: ['', [
          Validators.required, 
          Validators.minLength(8), 
          Validators.maxLength(40),
          this.passwordComplexityValidator
        ]],
        confirmPassword: ['', Validators.required],
        role: ['developpeur', Validators.required]
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  ngAfterViewInit(): void {
    this.initSlideshow();
  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  // Validateur pour la complexité du mot de passe
  passwordComplexityValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    
    const hasNumber = /\d/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    
    return hasNumber && hasUpper ? null : { passwordComplexity: true };
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  private initSlideshow(): void {
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
      slides[0].classList.add('active');
      
      this.slideInterval = setInterval(() => {
        slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + 1) % slides.length;
        slides[this.currentSlide].classList.add('active');
      }, 3000);
    }
  }
signUp() {
  // Marquer tous les champs comme touchés pour afficher les erreurs
  if (this.signupForm.invalid) {
    this.signupForm.markAllAsTouched();

    // Vérification spécifique pour la complexité du mot de passe
    if (this.signupForm.get('password')?.errors?.['passwordComplexity']) {
      this.errorMessage = 'Le mot de passe doit contenir au moins un chiffre et une lettre majuscule';
    } else {
      this.errorMessage = 'Veuillez remplir correctement tous les champs';
    }

    Swal.fire('Erreur', this.errorMessage, 'error');
    return;
  }

  const signupData: SignupData = {
    username: this.signupForm.value.username,
    email: this.signupForm.value.email,
    password: this.signupForm.value.password,
    role: [this.signupForm.value.role]
  };

  // Afficher le loader
  Swal.fire({
    title: 'Inscription en cours...',
    text: 'Veuillez patienter pendant l\'envoi de l\'e-mail...',
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  this.authService.signup(signupData).subscribe({
    next: () => {
      Swal.close(); // Ferme le loader

      Swal.fire('✅ Inscription réussie !', 'Votre compte a été créé avec succès.', 'success').then(() => {
        this.signupForm.reset();
        Object.keys(this.signupForm.controls).forEach(key => {
          this.signupForm.get(key)?.setErrors(null);
        });
        this.router.navigate(['/signin']);
      });
    },
    error: (err) => {
      Swal.close(); // Ferme le loader

      if (err.status === 400) {
        this.errorMessage = 'Nom d\'utilisateur ou email déjà utilisé';
      } else if (err.status === 500) {
        this.errorMessage = '⛔ Erreur serveur. Veuillez réessayer plus tard.';
      } else {
        this.errorMessage = '⚠️ Une erreur inattendue s\'est produite';
      }

      Swal.fire('Erreur', this.errorMessage, 'error');
    }
  });
}

  // signUp() {
  //   // Marquer tous les champs comme touchés pour afficher les erreurs
  //   if (this.signupForm.invalid) {
  //     this.signupForm.markAllAsTouched();
      
  //     // Vérification spécifique pour la complexité du mot de passe
  //     if (this.signupForm.get('password')?.errors?.['passwordComplexity']) {
  //       this.errorMessage = 'Le mot de passe doit contenir au moins un chiffre et une lettre majuscule';
  //     } else {
  //       this.errorMessage = 'Veuillez remplir correctement tous les champs';
  //     }
      
  //     return;
  //   }

  //   const signupData: SignupData = {
  //     username: this.signupForm.value.username,
  //     email: this.signupForm.value.email,
  //     password: this.signupForm.value.password,
  //     role: [this.signupForm.value.role]
  //   };

  //   this.authService.signup(signupData).subscribe({
  //     next: () => {
  //       alert('✅ Inscription réussie !');
  //       this.signupForm.reset();
  //       Object.keys(this.signupForm.controls).forEach(key => {
  //         this.signupForm.get(key)?.setErrors(null);
  //       });
  //       this.router.navigate(['/signin']);
  //     },
  //     error: (err) => {
  //       console.error('Erreur d\'inscription:', err);
        
  //       if (err.status === 400) {
  //         this.errorMessage = 'Nom d\'utilisateur ou email déjà utilisé';
  //       } else if (err.status === 500) {
  //         this.errorMessage = '⛔ Erreur serveur. Veuillez réessayer plus tard.';
  //       } else {
  //         this.errorMessage = '⚠️ Une erreur inattendue s\'est produite';
  //       }
        
  //       alert(this.errorMessage);
  //     }
  //   });
  // }
}