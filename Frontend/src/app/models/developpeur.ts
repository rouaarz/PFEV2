
export interface Developpeur {
    isAssigned: boolean;
    id: number;
    username: string;
    email: string;
    password: string;
    specialite: string;
    score: number;
    technologies: string[];
    experience: number;
    developpeurResponses: any[];  // Remplacez `any` par un modèle approprié si nécessaire
    invitations: any[];           // Idem, remplacez par un modèle approprié si nécessaire
    chefDeProjetId: number;      // ID du Chef de Projet
  }
  