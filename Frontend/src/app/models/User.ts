import { ERole } from "./erole";
import { Role } from "./Role";

export interface User {
    username: string;
    email: string;
    password: string;
    active:boolean;
    image?: string;
    roles: Role[];   
  }
  