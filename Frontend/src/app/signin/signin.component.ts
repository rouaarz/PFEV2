import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  imports: [CommonModule],
  standalone: true, 
})
export class SigninComponent implements AfterViewInit {

  @ViewChild('usernameRef') usernameRef!: ElementRef;
  @ViewChild('passwordRef') passwordRef!: ElementRef;
  errorMessage: string = ''; // Stocke l'erreur pour affichage

  constructor(private authService: AuthService, private router: Router) {}

  ngAfterViewInit(): void {
    if (!this.usernameRef || !this.passwordRef) {
      alert("Erreur : Les champs d'entrée ne sont pas accessibles !");
    }
  }
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
    //     const token = response.accessToken; // Récupération du token
    //     const developpeurId = response.developpeurId; // Vérifier s'il est retourné
    //     if (developpeurId) {
    //       localStorage.setItem('developpeurId', developpeurId.toString());
    //       console.log("developpeurId saved:", developpeurId); // Vérification
    //     } else {
    //       console.warn("⚠️ developpeurId manquant dans la réponse !");
    //     }
    //     if (token) {
    //       localStorage.setItem('accessToken', token); // Stocker le token
    //       console.log("Token saved:", token); // Vérification
    //       alert("✅ Connexion réussie ! Bienvenue 🎉");
    //       this.router.navigate(['/tests']); // Redirection
    //     } else {
    //       alert("❌ Token manquant dans la réponse.");
    //     }
    //   },
    //   error: (err: HttpErrorResponse) => {
    //     console.error('Erreur de connexion:', err);
    //     // Gestion des erreurs
    //     alert("❌ Échec de la connexion, veuillez réessayer.");
    //   }
    // });
    this.authService.login({ username, password }).subscribe({
      next: (response) => {
        console.log("Réponse de l'API :", response);  // Vérifiez la structure de la réponse
        const token = response.accessToken;
        const developpeurId = response.id; 
        if (developpeurId) {
          localStorage.setItem('developpeurId', developpeurId.toString());
          console.log("developpeurId saved:", developpeurId);
        } else {
          console.warn("⚠️ developpeurId manquant dans la réponse !");
        }
        if (token) {
          localStorage.setItem('accessToken', token);
          console.log("Token saved:", token);
          alert("✅ Connexion réussie ! Bienvenue 🎉");
          this.router.navigate(['/tests']);
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
