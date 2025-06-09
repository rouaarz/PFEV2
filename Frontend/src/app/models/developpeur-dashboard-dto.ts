import { Certification } from "./certification";
import { TestStatDTO } from "./test-stat-dto";

export interface DeveloppeurDashboardDTO {
    nomDeveloppeur: string;
    chefEquipe: string;
    scoreGlobal: number;
    tests: TestStatDTO[];
    certifications: Certification[];
  }