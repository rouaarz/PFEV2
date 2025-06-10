import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  imports: [CommonModule, RouterModule],
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


  constructor(private authService: AuthService, private router: Router) { }

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
  //       console.log("Réponse de l'API :", response); // Pour debug

  //       const token = response.accessToken;
  //       const developpeurId = response.id;
  //       const roles = response.roles; // ⚠️ Vérifie que ce champ existe dans ta réponse

  //       if (developpeurId) {
  //         localStorage.setItem('developpeurId', developpeurId.toString());
  //       }

  //       if (token) {
  //         localStorage.setItem('accessToken', token);

  //         if (roles && Array.isArray(roles)) {
  //           localStorage.setItem('roles', JSON.stringify(roles)); // Si besoin plus tard

  //           // ✅ Redirection selon le rôle
  //           if (roles.includes('ROLE_ADMIN') || roles.includes('ROLE_CHEF')) {
  //             alert("✅ Connexion réussie en tant qu'ADMIN ou CHEF !");
  //             this.router.navigate(['/dash']);
  //           } else if (roles.includes('ROLE_DEVELOPPEUR')) {
  //             alert("✅ Connexion réussie en tant que DEVELOPPEUR !");
  //             this.router.navigate(['/testsbyadmin']);
  //           } else {
  //             alert("⚠️ Rôle non reconnu, redirection par défaut.");
  //             this.router.navigate(['/']); // Par défaut
  //           }

  //         } else {
  //           alert("❌ Rôle utilisateur introuvable !");
  //         }

  //       } else {
  //         alert("❌ Token manquant dans la réponse.");
  //       }
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       console.error('Erreur de connexion:', err);
  //       alert("❌ Échec de la connexion, veuillez réessayer.");
  //     }
  //   });

  // }
  log(event: Event): void {
    event.preventDefault();
    this.errorMessage = '';

    const username = this.usernameRef?.nativeElement.value?.trim();
    const password = this.passwordRef?.nativeElement.value?.trim();

    if (!username || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Champs manquants',
        text: '⚠️ Veuillez remplir tous les champs.',
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false
      });
      return;
    }

    // Loader en cours
    Swal.fire({
      title: 'Connexion en cours...',
      text: 'Veuillez patienter',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.login({ username, password }).subscribe({
      next: (response) => {
        console.log("Réponse de l'API :", response);

        const token = response.accessToken;
        const developpeurId = response.id;
        const roles = response.roles;

        if (developpeurId) {
          localStorage.setItem('developpeurId', developpeurId.toString());
        }

        if (token) {
          localStorage.setItem('accessToken', token);

          if (roles && Array.isArray(roles)) {
            localStorage.setItem('roles', JSON.stringify(roles));

            Swal.close(); // Ferme le loader

            if (roles.includes('ROLE_ADMIN')) {
              Swal.fire({
                icon: 'success',
                title: 'Bienvenue Administrateur !',
                toast: true,
                position: 'top-end',
                timer: 2500,
                showConfirmButton: false
              });
              this.router.navigate(['/dash']);
            } else if (roles.includes('ROLE_CHEF')) {
              Swal.fire({
                icon: 'success',
                title: 'Bienvenue Chef d\'équipe !',
                toast: true,
                position: 'top-end',
                timer: 2500,
                showConfirmButton: false
              });
              this.router.navigate(['/dash']);
            } else if (roles.includes('ROLE_DEVELOPPEUR')) {
              Swal.fire({
                icon: 'success',
                title: 'Bienvenue Développeur !',
                toast: true,
                position: 'top-end',
                timer: 2500,
                showConfirmButton: false
              });
              this.router.navigate(['/testsbyadmin']);
            } else {
              Swal.fire({
                icon: 'warning',
                title: 'Rôle non reconnu',
                text: 'Redirection vers la page d\'accueil.',
                toast: true,
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false
              });
              this.router.navigate(['/']);
            }

          } else {
            Swal.fire({
              icon: 'error',
              title: 'Rôle utilisateur introuvable',
              toast: true,
              position: 'top-end',
              timer: 3000,
              showConfirmButton: false
            });
          }

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Token manquant',
            text: '❌ Impossible de continuer sans token.',
            toast: true,
            position: 'top-end',
            timer: 3000,
            showConfirmButton: false
          });
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erreur de connexion:', err);
        Swal.fire({
          icon: 'error',
          title: 'Échec de la connexion',
          text: 'Veuillez vérifier vos identifiants.',
          toast: true,
          position: 'center',      // Position centrée
          timer: 3000,
          showConfirmButton: false
        });
      }
    });
  }

}