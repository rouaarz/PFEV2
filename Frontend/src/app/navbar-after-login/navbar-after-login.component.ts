import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-after-login',
  imports: [],
  templateUrl: './navbar-after-login.component.html',
  styleUrl: './navbar-after-login.component.css'
})
export class NavbarAfterLoginComponent {
  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('id');
    this.router.navigate(['/']); // Redirige vers la page d'accueil après la déconnexion
  }
}
