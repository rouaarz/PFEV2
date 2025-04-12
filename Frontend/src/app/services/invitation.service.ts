import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvitationTest } from '../models/InvitationTest';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  private apiUrl = 'http://localhost:8083/invitations';  // Remplace l'URL par celle de ton API backend

  constructor(private http: HttpClient) {}

  // Récupérer les détails de l'invitation
  getInvitationDetails(id: number): Observable<any> {
    return this.http.get(`http://localhost:8083/invitations/${id}`);
  }
  

  // Répondre à l'invitation (accepter ou refuser)
  respondToInvitation(invitationId: number, accept: boolean): Observable<any> {
    // Envoie 'accept' comme un paramètre de requête dans l'URL
    return this.http.put(`${this.apiUrl}/${invitationId}/respond?accept=${accept}`, {});
  }
  
}
