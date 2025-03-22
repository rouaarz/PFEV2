import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as AOS from 'aos';
import { Router } from '@angular/router'; // Importe le Router

@Component({
  selector: 'app-navbar', 
  standalone: true, // Déclare le composant comme autonome
  imports: [CommonModule, RouterModule], // Importer les modules nécessaires
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
 

  constructor(private router: Router) {
    
  }

  // Méthode de déconnexion
  logout(): void {
    localStorage.clear();
    this.isLoggedIn = false; // Met à jour l'état de l'utilisateur
    this.router.navigate(['/']); // Redirige vers la page d'accueil après la déconnexion
  }

  // Vérifie si un utilisateur est connecté
  checkLoginStatus(): void {
    if (localStorage.getItem('accessToken')) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  ngOnInit(): void {
    this.checkLoginStatus(); // Vérifie si l'utilisateur est connecté au chargement du composant
    AOS.init();
  }
}
