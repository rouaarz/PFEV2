import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('accessToken');
    const roles = JSON.parse(localStorage.getItem('roles') || '[]'); // ⚠️ Vérifie que `roles` est bien stocké
    console.log("🔑 Token récupéré :", token);
    console.log("🛑 Rôles récupérés :", roles);

    const isAuthenticated = !!token;
    const isAdmin = roles.includes('ROLE_ADMIN');
    const isChef = roles.includes('ROLE_CHEF');

    if (!isAuthenticated) {
      console.warn("❌ L'utilisateur n'est pas connecté !");
      alert("❌ Vous devez être connecté !");
      this.router.navigate(['/signin']);
      return false;
    }

    if (!isAdmin && !isChef) {
        console.warn("🚫 L'utilisateur n'a pas les droits requis !");
        alert("🚫 Accès refusé !");
        this.router.navigate(['/dash']);
        return false;
      }

    console.log("✅ Accès ADMIN autorisé !");
    return true;
  }
}
