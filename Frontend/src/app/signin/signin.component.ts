import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  imports: [CommonModule,RouterModule],
  standalone: true,
})
export class SigninComponent implements AfterViewInit {


  @ViewChild('usernameRef') usernameRef!: ElementRef;
  @ViewChild('passwordRef') passwordRef!: ElementRef;
  errorMessage: string = '';
  private slideInterval: any;
  private currentSlide = 0;
  // Dans votre composant
 showPassword: boolean = false;

 togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}
  

  constructor(private authService: AuthService, private router: Router) {}

  ngAfterViewInit(): void {
    if (!this.usernameRef || !this.passwordRef) {
      alert("Erreur : Les champs d'entrée ne sont pas accessibles !");
    }
    this.initSlideshow();
  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  private initSlideshow(): void {
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
      // Activer la première slide
      slides[0].classList.add('active');
      
      this.slideInterval = setInterval(() => {
        slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + 1) % slides.length;
        slides[this.currentSlide].classList.add('active');
      }, 5000);
    }
  }

  // ... le reste de votre code existant ...

  
  log(event: Event): void {
    event.preventDefault();
    this.errorMessage = ''; // Réinitialisation de l'erreur
  
    const username = this.usernameRef?.nativeElement.value?.trim();
    const password = this.passwordRef?.nativeElement.value?.trim();
  
    if (!username || !password) {
      alert("⚠️ Veuillez remplir tous les champs.");
      return;
    }

    // this.authService.login({ username, password }).subscribe({
    //   next: (response) => {
    //     console.log("Réponse de l'API :", response);  // Vérifiez la structure de la réponse
    //     const token = response.accessToken;
    //     const developpeurId = response.id; 
    //     if (developpeurId) {
    //       localStorage.setItem('developpeurId', developpeurId.toString());
    //       console.log("developpeurId saved:", developpeurId);
    //     } else {
    //       console.warn("⚠️ developpeurId manquant dans la réponse !");
    //     }
    //     if (token) {
    //       localStorage.setItem('accessToken', token);
    //       console.log("Token saved:", token);
    //       alert("✅ Connexion réussie ! Bienvenue 🎉");
    //       this.router.navigate(['/tests']);
    //     } else {
    //       alert("❌ Token manquant dans la réponse.");
    //     }
    //   },
    //   error: (err: HttpErrorResponse) => {
    //     console.error('Erreur de connexion:', err);
    //     alert("❌ Échec de la connexion, veuillez réessayer.");
    //   }
    // });
    
    this.authService.login({ username, password }).subscribe({
      next: (response) => {
        console.log("Réponse de l'API :", response); // Pour debug
    
        const token = response.accessToken;
        const developpeurId = response.id;
        const roles = response.roles; // ⚠️ Vérifie que ce champ existe dans ta réponse
    
        if (developpeurId) {
          localStorage.setItem('developpeurId', developpeurId.toString());
        }
    
        if (token) {
          localStorage.setItem('accessToken', token);
    
          if (roles && Array.isArray(roles)) {
            localStorage.setItem('roles', JSON.stringify(roles)); // Si besoin plus tard
    
            // ✅ Redirection selon le rôle
            if (roles.includes('ROLE_ADMIN') || roles.includes('ROLE_CHEF')) {
              alert("✅ Connexion réussie en tant qu'ADMIN ou CHEF !");
              this.router.navigate(['/dash']);
            } else if (roles.includes('ROLE_DEVELOPPEUR')) {
              alert("✅ Connexion réussie en tant que DEVELOPPEUR !");
              this.router.navigate(['/tests']);
            } else {
              alert("⚠️ Rôle non reconnu, redirection par défaut.");
              this.router.navigate(['/']); // Par défaut
            }
    
          } else {
            alert("❌ Rôle utilisateur introuvable !");
          }
    
        } else {
          alert("❌ Token manquant dans la réponse.");
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erreur de connexion:', err);
        alert("❌ Échec de la connexion, veuillez réessayer.");
      }
    });
    
  }
  
  // log(event: Event): void {
  //   event.preventDefault();
  //   this.errorMessage = ''; // Réinitialisation de l'erreur

  //   const username = this.usernameRef?.nativeElement.value?.trim();
  //   const password = this.passwordRef?.nativeElement.value?.trim();

  //   if (!username || !password) {
  //     alert("⚠️ Veuillez remplir tous les champs.");
  //     return;
  //   }

  //   this.authService.login({ username, password }).subscribe({
  //     next: (response) => {
  //       sessionStorage.setItem('token', response.token); // Stocker le token

  //       alert("✅ Connexion réussie ! Bienvenue 🎉");
        
  //       this.router.navigate(['/dashboard']); // Redirection
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       console.error('Erreur de connexion:', err);

  //       // Gestion des erreurs avec alertes pour l'utilisateur
  //       if (err.status === 401) {
  //         alert("❌ Nom d'utilisateur ou mot de passe incorrect.");
  //       } else if (err.status === 500) {
  //         alert("⚠️ Erreur serveur, veuillez réessayer plus tard.");
  //       } else if (err.error && err.error.message) {
  //         alert(`⚠️ ${err.error.message}`);
  //       } else {
  //         alert("❌ Échec de la connexion, veuillez réessayer.");
  //       }
  //     }
  //   });
  // }
}
