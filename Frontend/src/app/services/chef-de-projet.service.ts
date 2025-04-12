import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChefDeProjet } from '../models/chef-de-projet';
import { Developpeur } from '../models/developpeur';


@Injectable({
  providedIn: 'root'
})
export class ChefDeProjetService {
 
  private baseUrl = 'http://localhost:8083/chefdeprojet'; // Assure-toi que ton backend tourne sur ce port

 

  constructor(private http: HttpClient) {}

  // ajouterChef(chef: ChefDeProjet): Observable<ChefDeProjet> {
  //   return this.http.post<ChefDeProjet>(this.baseUrl, chef);
  // }
  ajouterChef(chefDeProjet: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.post<any>(this.baseUrl, chefDeProjet, { headers });
  }

  verifierUsername(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/exists/username/${username}`);
  }

  verifierEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/exists/email/${email}`);
  }
  
   // Modifier un chef de projet
  modifierChef(id: number, chef: ChefDeProjet, token: string): Observable<ChefDeProjet> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<ChefDeProjet>(`${this.baseUrl}/${id}`, chef, { headers });
  }

  // Supprimer un chef de projet
  supprimerChef(id: number, token: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }

  // Récupérer un chef de projet par ID
  getChefById(id: number): Observable<ChefDeProjet> {
    return this.http.get<ChefDeProjet>(`${this.baseUrl}/${id}`);
  }
  // getDeveloppeursAssignes(chefId: number): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/${chefId}/developpeurs`);
  // }
  getDeveloppeursAssignes(chefId: number, token: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.baseUrl}/${chefId}/developpeurs`, { headers });
  }
  

  // Récupérer tous les chefs de projet
  // getAllChefs( token: string): Observable<ChefDeProjet[]> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   return this.http.get<ChefDeProjet[]>(this.baseUrl , { headers });
  // }
  getAllChefs(): Observable<ChefDeProjet[]> {
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // console.log("En-têtes envoyés :", headers); // Vérifiez que l'en-tête est bien attaché
    return this.http.get<ChefDeProjet[]>(this.baseUrl);
  }
  
  assignerDeveloppeur(chefId: number, devId: number, token: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.baseUrl}/${chefId}/assign/${devId}`, {}, { headers });
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
