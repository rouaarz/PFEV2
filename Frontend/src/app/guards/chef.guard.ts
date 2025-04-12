import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChefGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    const isChef = roles.includes('ROLE_CHEF');

    if (isChef) {
      console.warn("🚫 L'utilisateur est un chef et ne peut pas accéder à cette section !");
      alert("🚫 Accès refusé !");
      this.router.navigate(['/dash']);
      return false;
    }

    return true;
  }
}
