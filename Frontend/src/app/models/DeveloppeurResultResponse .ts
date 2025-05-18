// models/developpeur-result-response.model.ts
export interface DeveloppeurResultResponse {
  id:number;
  nom: string;
  email: string;
  score: number;
  tentative: string;
  temps: string;
  etat: string;
  badge: string;
  apparence: string;
}
