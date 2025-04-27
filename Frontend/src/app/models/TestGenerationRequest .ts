export interface TestGenerationRequest {
    titre: string;
    description: string;
    duree: number;
    nbQuestions: number;
    niveauDifficulte: string;
    type: string; // "QCM", "Code", "Mixte"
    accesPublic: boolean;
    limiteTentatives: number;
    dateExpiration: Date;
    technologies: string[]; // ex: ["Java", "Spring Boot"]
    nbQcmFacile: number;
    nbQcmMoyen: number;
    nbQcmDifficile: number;
    nbCodeFacile: number;
    nbCodeMoyen: number;
    nbCodeDifficile: number;
    nbTexteFacile: number,  // Ajouter cette ligne
    nbTexteMoyen: number,   // Ajouter cette ligne
    nbTexteDifficile: number,
    pointsParQuestion: number;
  }
  