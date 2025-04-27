export interface AnswerOption {
    id: number;
    text: string;
    isCorrect: boolean;
  }

  export interface DeveloppeurResponse {
    id: number;
    question: {
      id: number;
      enonce: string;
      type: string;
      niveau: string;
      technologie: string;
      tempsEstime: number;
      answerOptions: { id: number; text: string; isCorrect: boolean }[];
    };
    selectedAnswerOptions: { id: number; text: string; isCorrect: boolean }[];
    isCorrect: boolean;
    reponseLibre: string | null;
    note: number | null;
    explication: string | null;
    feedback: string | null;
    reponseCorrecte: string | null;
  }
  