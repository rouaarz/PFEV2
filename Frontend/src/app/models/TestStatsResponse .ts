// models/test-stats-response.model.ts
export interface TestStatsResponse {
  moyenne: number;
  dureeMoyen: number;
  meilleurScore: ScoreInfo | null;
  pirreScore: ScoreInfo | null;
  echecs: ResultStats;
  reussit: ResultStats;
}

export interface ScoreInfo {
  nom: string;
  score: number;
}

export interface ResultStats {
  pourcentage: number;
  total: number;
  participants: number;
}
