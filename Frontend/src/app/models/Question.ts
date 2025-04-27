
// export interface Question {
//   id: number;
//   enonce: string;
//   type: 'QCM' | 'Code' | 'Text';
//   niveau: 'FACILE' | 'MOYEN' | 'DIFFICILE';
//   answerOptions: { text: string; isCorrect: boolean }[]; // Optionnel pour éviter d’être requis dans les types autres que QCM
//   codeSnippet?: string; // Optionnel car uniquement pour le type Code
//   codeAnswers?: any; // Peut être précisé selon l'utilisation (ex: string[], objet, etc.)
//   selectedPoints: number;
//   selectedOrdre: number;
//   isAssigned: boolean;  // Ajout de la propriété isAssigned
//   previousPoints?: number; // Ajout de la propriété pour les points précédents
//   previousOrdre?: number;
// }
export interface Question {
  id: number;
  enonce: string;
  type: 'QCM' | 'Code' | 'Text';
  niveau: 'FACILE' | 'MOYEN' | 'DIFFICILE';

  // 🆕 Champs ajoutés
  technologie: string;        // Ex: Java, Python, Angular...
  tempsEstime: number;        // Temps estimé pour répondre (en minutes)

  // Pour les QCM
  answerOptions: { text: string; isCorrect: boolean }[];

  // Pour les questions de type Code
  codeSnippet?: string;
  codeAnswers?: any; // À préciser si tu veux plus de structure (ex: tableau d'objets avec code + langage)
  language?: string;

  // Affectation à un test
  selectedPoints: number;
  selectedOrdre: number;
  isAssigned: boolean;

  // Historique de modification
  previousPoints?: number;
  previousOrdre?: number;
}
