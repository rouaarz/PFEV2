import { Developpeur } from "./developpeur";

export interface Certification {
  id: number;
  niveau: 'DEBUTANT' | 'DEVELOPPEUR' | 'SENIOR'; // Adapter selon vos valeurs d'énumération Niveau
  dateObtention: string; // Format ISO (ex: "2024-06-04")
  developpeur: Developpeur; // Vous devez aussi créer l'interface Developpeur
}