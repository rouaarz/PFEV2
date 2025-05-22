/*import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import * as AOS from 'aos';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isUserMenuOpen: boolean = false;
  isMobileMenuOpen: boolean = false;
 

  userPhotoUrl: string | null = null;
  user: User | null = null;

  constructor(private router: Router, private userService: UserService) {
    router.events.subscribe(() => {
      this.checkLoginStatus();
      this.closeMobileMenu();
    });
  }

  ngOnInit(): void {
    this.checkLoginStatus();
    AOS.init();
    this.loadUserData();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    
    // Ferme le menu utilisateur si clic en dehors
    if (!target.closest('.user-dropdown')) {
      this.isUserMenuOpen = false;
    }
    
    // Ferme le menu mobile si clic en dehors
    if (this.isMobileMenuOpen && 
        !target.closest('.nav-links') && 
        !target.closest('.mobile-menu-btn')) {
      this.closeMobileMenu();
    }
  }

  loadUserData(): void {
    const userId = localStorage.getItem('developpeurId');
    if (userId) {
      this.userService.getUserById(+userId).subscribe({
        next: (userData) => this.user = userData,
        error: (err) => console.error("Erreur lors de la récupération de l'utilisateur", err)
      });

      this.userService.getUserPhoto().subscribe({
        next: (blob: Blob) => {
          const reader = new FileReader();
          reader.onload = () => this.userPhotoUrl = reader.result as string;
          reader.readAsDataURL(blob);
        },
        error: (err) => console.error('Erreur lors du chargement de la photo utilisateur', err)
      });
    }
  }

  checkLoginStatus(): void {
    this.isLoggedIn = !!localStorage.getItem('accessToken');
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isUserMenuOpen) this.isUserMenuOpen = false;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }


  viewProfile(): void {
    this.isUserMenuOpen = false;
    this.router.navigate(['/profile']);
  }

  editProfile(): void {
    this.isUserMenuOpen = false;
    this.router.navigate(['/profile/edit']);
  }

  logout(): void {
    localStorage.clear();
    this.isLoggedIn = false;
    this.isUserMenuOpen = false;
    this.isMobileMenuOpen = false;
    this.router.navigate(['/']);
  }
 toggleUserMenu(event: MouseEvent): void {
  event.stopPropagation();
  this.isUserMenuOpen = !this.isUserMenuOpen;
  console.log('isUserMenuOpen =', this.isUserMenuOpen); // 👈 À AJOUTER
}
 closeAllMenus() {
    this.isMobileMenuOpen = false;
    this.isUserMenuOpen = false;
  }

}*/
import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import * as AOS from 'aos';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { DeveloppeurService } from '../services/developpeur.service'; // 👈 À importer
import { Developpeur } from '../models/developpeur';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isUserMenuOpen: boolean = false;
  isMobileMenuOpen: boolean = false;

  userPhotoUrl: string | null = null;
  user: User | null = null;

  isDeveloppeur: boolean = false; // 👈 Ajouté
 developpeur: Developpeur = {} as Developpeur; // 👈 À typer correctement si tu as une interface `Developpeur`

  constructor(
    private router: Router,
    private userService: UserService,
    private developpeurService: DeveloppeurService // 👈 Injecté ici
  ) {
    router.events.subscribe(() => {
      this.checkLoginStatus();
      this.closeMobileMenu();
    });
  }

  ngOnInit(): void {
    this.checkLoginStatus();
    AOS.init();
    this.loadUserData();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-dropdown')) this.isUserMenuOpen = false;
    if (this.isMobileMenuOpen && 
        !target.closest('.nav-links') && 
        !target.closest('.mobile-menu-btn')) {
      this.closeMobileMenu();
    }
  }

loadUserData(): void {
  const userIdStr = localStorage.getItem('developpeurId');
  const roles = JSON.parse(localStorage.getItem('roles') || '[]');

  if (userIdStr && !isNaN(+userIdStr)) {
    const userId = +userIdStr;

    this.userService.getUserById(userId).subscribe({
      next: (userData) => this.user = userData,
      error: (err) => console.error("Erreur lors de la récupération de l'utilisateur", err)
    });

    this.userService.getUserPhoto().subscribe({
      next: (blob: Blob) => {
        const reader = new FileReader();
        reader.onload = () => this.userPhotoUrl = reader.result as string;
        reader.readAsDataURL(blob);
      },
      error: (err) => console.error('Erreur lors du chargement de la photo utilisateur', err)
    });

    if (roles.includes('ROLE_DEVELOPPEUR')) {
      this.isDeveloppeur = true;
      this.developpeurService.getDeveloppeurProfile(userId).subscribe({
        next: (devData) => {
          this.developpeur = devData;
          console.log('✅ Développeur récupéré:', this.developpeur);
        },
        error: (err) => {
          console.error('❌ Erreur récupération développeur:', err);
        }
      });
    }
  } else {
    console.warn("⚠️ developpeurId invalide ou manquant dans localStorage");
  }
}


  checkLoginStatus(): void {
    this.isLoggedIn = !!localStorage.getItem('accessToken');
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isUserMenuOpen) this.isUserMenuOpen = false;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  viewProfile(): void {
    this.isUserMenuOpen = false;
    this.router.navigate(['/profile']);
  }

  editProfile(): void {
    this.isUserMenuOpen = false;
    this.router.navigate(['/profile/edit']);
  }

  logout(): void {
    localStorage.clear();
    this.isLoggedIn = false;
    this.isUserMenuOpen = false;
    this.isMobileMenuOpen = false;
    this.router.navigate(['/']);
  }

  toggleUserMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.isUserMenuOpen = !this.isUserMenuOpen;
    console.log('isUserMenuOpen =', this.isUserMenuOpen);
  }

  closeAllMenus(): void {
    this.isMobileMenuOpen = false;
    this.isUserMenuOpen = false;
  }
}
