export interface Test {
    id?: number;
    titre: string;
    description: string;
    duree: number | null;
    type: string;
    niveauDifficulte:string;
    nbQuestions: number | null;

    accesPublic: boolean;
    limiteTentatives: number | null;
    statut: string;
    dateCreation: string;
    dateExpiration: string | null;
    createur: { id: number; username: string };
    testQuestions: { id: number; question: string; points: number }[];
    version: 0, 

  }