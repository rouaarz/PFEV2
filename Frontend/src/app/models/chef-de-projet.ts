
import { Developpeur } from "./developpeur";
import { Role } from "./Role";
import { User } from "./User";

export interface ChefDeProjet extends User {
  id:number;
  specialite: string;
  score: number;
  developpeurs:Developpeur[]; 
  roles: Role[];
}
