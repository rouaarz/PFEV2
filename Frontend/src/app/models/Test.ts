export interface Test {
    id?: number;
    titre: string;
    description: string;
    duree: number | null;
    type: string;
    accesPublic: boolean;
    limiteTentatives: number | null;
    statut: string;
    dateCreation: string;
    dateExpiration: string | null;
    administrateur: { id: number; nom: string };
    testQuestions: { id: number; question: string; points: number }[];
    version: 0, // ⚡ Ajoute cette ligne si `@Version` est utilisé

  }