
// src/app/services/stats.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
  private baseUrl = 'http://localhost:8083/api/stats'; // adapte si nécessaire
  token!: string;

  constructor(private http: HttpClient,private AuhService:AuthService) { }

  getTotalUsers() {
    return this.http.get<number>(`${this.baseUrl}/total-users`);
  }

  getDevelopersCount() {
    return this.http.get<number>(`${this.baseUrl}/developers`);
  }

  getChefsProjetCount() {
    return this.http.get<number>(`${this.baseUrl}/chefs-projet`);
  }

  getDemandesActivationCount() {
    return this.http.get<number>(`${this.baseUrl}/demandes-activation`);
  }
  getNombreTestsPublies(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/tests/publies/count`);
  }


  getUtilisateursParRole() {
    return this.http.get<any>(`${this.baseUrl}/utilisateurs-par-role`);
  }
  // Dans StatistiqueService
  getTeamStats(): Observable<any> {
    // Récupération du rôle depuis le AuthService
    const role = this.AuhService.getPrimaryRole();

    // On s'assure que le rôle est valide avant de faire l'appel HTTP
    if (role === 'ADMIN') {
      return this.http.get<any[]>(`${this.baseUrl}/team-stats`);
    } else if (role === 'ROLE_CHEF') {
    
    return this.http.get<any[]>(`${this.baseUrl}/my-team`, { headers: this.getHeaders() });
    } else {
      return throwError(() => new Error('Rôle non supporté'));
    }
  }
  private getHeaders() {
    this.token = localStorage.getItem('accessToken') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    });
  }
  getDeveloppeursCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count-developers-parchef`, {
      headers: this.getHeaders()
    });
  }

  getNombreTestsPubliesParChef(): Observable<number> {
    return this.http.get<number>('http://localhost:8083/api/stats/count-tests-publies', {
      headers: this.getHeaders()
    });
  }
  
  
}