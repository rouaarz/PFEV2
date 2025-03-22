import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar-comp',
  templateUrl: './navbar-comp.component.html',
  standalone:true,
  styleUrls: ['./navbar-comp.component.scss'],
  imports:[MatIconModule,MatButtonModule]
})
export class NavbarCompComponent {

  constructor(private router: Router) {}
  
  logout() {
    localStorage.removeItem('token'); // Suppression du token d'authentification
    this.router.navigate(['/signin']); // Redirection vers la page de connexion
  }
}
