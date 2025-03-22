import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChefDeProjet } from '../models/chef-de-projet';
import { Developpeur } from '../models/developpeur';


@Injectable({
  providedIn: 'root'
})
export class ChefDeProjetService {
 
  private baseUrl = 'http://localhost:8083/chefdeprojet'; // Assure-toi que ton backend tourne sur ce port

 

  constructor(private http: HttpClient) {}

  ajouterChef(chef: ChefDeProjet): Observable<ChefDeProjet> {
    return this.http.post<ChefDeProjet>(this.baseUrl, chef);
  }


  verifierUsername(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/exists/username/${username}`);
  }

  verifierEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/exists/email/${email}`);
  }
  
   // Modifier un chef de projet
  modifierChef(id: number, chef: ChefDeProjet): Observable<ChefDeProjet> {
    return this.http.put<ChefDeProjet>(`${this.baseUrl}/${id}`, chef);
  }

  // Supprimer un chef de projet
  supprimerChef(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Récupérer un chef de projet par ID
  getChefById(id: number): Observable<ChefDeProjet> {
    return this.http.get<ChefDeProjet>(`${this.baseUrl}/${id}`);
  }
  getDeveloppeursAssignes(chefId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${chefId}/developpeurs`);
  }
  

  // Récupérer tous les chefs de projet
  getAllChefs(): Observable<ChefDeProjet[]> {
    return this.http.get<ChefDeProjet[]>(this.baseUrl);
  }
  assignerDeveloppeur(chefId: number, devId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${chefId}/assign/${devId}`, {});
  }
  
  getAllDeveloppeurs(): Observable<Developpeur[]> {
    return this.http.get<Developpeur[]>('http://localhost:8083/api/developpeurs'); // Remplace l'URL par la bonne API
  }
  getDeveloppeursNonAssignes(): Observable<Developpeur[]> {
    return this.http.get<Developpeur[]>('http://localhost:8083/api/developpeurs/non-assignes')
  }
  isDeveloppeurAssigned(devId: number): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8083/api/developpeurs/${devId}/is-assigned`);
  }
  
 
 
  
}
