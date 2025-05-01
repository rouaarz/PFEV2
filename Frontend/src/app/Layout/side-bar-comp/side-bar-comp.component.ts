/*import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { Developpeur } from '../../models/developpeur';
import { Administrateur } from '../../models/administrateur';
import { AuthService } from '../../services/auth.service';
import {ChefDeProjetService} from '../../services/chef-de-projet.service';
import { AdminService } from '../../services/admin.service';
import { ChefDeProjet } from '../../models/chef-de-projet';

@Component({
  selector: 'app-side-bar-comp',
  standalone: true,
  templateUrl: './side-bar-comp.component.html',
  styleUrls: ['./side-bar-comp.component.scss'],
  imports: [MatIconModule, MatButtonModule, MatSidenavModule,CommonModule,RouterModule]
})
export class SideBarCompComponent implements OnInit {
  OpenedSideBar: boolean = true;
  current!: string;
  roles = JSON.parse(localStorage.getItem('roles') || '[]'); // ⚠️ Vérifie que `roles` est bien stocké

  private router = inject(Router);
  questionsMenuOpen: boolean = false;
   developpeur:any;
   admin: Administrateur = {} as Administrateur;
   isAdmin= false;
   chef: ChefDeProjet={}as ChefDeProjet;


  constructor(private authService: AuthService, private adminService: AdminService, private ChefDeProjetService: ChefDeProjetService ) { }

  ngOnInit(): void {
    this.current = this.router.url;
    console.log(this.current);

    this.router.events.subscribe(() => {
      this.current = this.router.url;
    });
  }
    ngOnInit(): void {
      this.authService.authStatus$.subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          const roles = JSON.parse(localStorage.getItem('roles') || '[]');
          console.log('🛡️ Rôles:', roles);
    
          if (roles.includes('ROLE_ADMIN')) {
            this.isAdmin = true;
    
            // ✅ Récupérer l'id de l'admin
            const token = localStorage.getItem('accessToken');
            const id = localStorage.getItem('developpeurId'); // <-- il faut stocker aussi l'id dans le localStorage au login
    
            if (token && id) {
              this.adminService.getAdminById(+id, token).subscribe({
                next: (adminData) => {
                  this.admin = adminData;
                  console.log('✅ Admin récupéré:', this.admin);
                },
                error: (err) => {
                  console.error('❌ Erreur récupération admin:', err);
                }
              });
            } else {
              console.warn('⚠️ Aucun token ou id trouvé dans le localStorage');
            }
    
          } else {
            this.isAdmin = false;
          }
        }
      });


    } 

  
    
    
    

  toggleSidebar(): void {
    this.OpenedSideBar = !this.OpenedSideBar;
  }

  toggleQuestionsMenu(): void {
    this.questionsMenuOpen = !this.questionsMenuOpen;
  }
}*/
/*import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { Administrateur } from '../../models/administrateur';
import { ChefDeProjet } from '../../models/chef-de-projet';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';
import { ChefDeProjetService } from '../../services/chef-de-projet.service';
import { Developpeur } from '../../models/developpeur';

@Component({
  selector: 'app-side-bar-comp',
  standalone: true,
  templateUrl: './side-bar-comp.component.html',
  styleUrls: ['./side-bar-comp.component.scss'],
  imports: [MatIconModule, MatButtonModule, MatSidenavModule, CommonModule, RouterModule]
})
export class SideBarCompComponent implements OnInit {
  OpenedSideBar: boolean = true;
  current!: string;
  roles = JSON.parse(localStorage.getItem('roles') || '[]');

  private router = inject(Router);
  questionsMenuOpen: boolean = false;

  admin: Administrateur = {} as Administrateur;
  chef: ChefDeProjet = {} as ChefDeProjet;
  developpeur: Developpeur = {} as Developpeur;
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private chefDeProjetService: ChefDeProjetService
  ) {}

  ngOnInit(): void {
    this.authService.authStatus$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        const roles = JSON.parse(localStorage.getItem('roles') || '[]');
        const token = localStorage.getItem('accessToken');

        if (!token) {
          console.warn('⚠️ Token manquant dans le localStorage');
          return;
        }

        // 🔐 ADMIN
        if (roles.includes('ROLE_ADMIN')) {
          this.isAdmin = true;
          const adminId = localStorage.getItem('developpeurId');
          if (adminId) {
            this.adminService.getAdminById(+adminId, token).subscribe({
              next: (adminData) => {
                this.admin = adminData;
                console.log('✅ Admin récupéré:', this.admin);
              },
              error: (err) => {
                console.error('❌ Erreur récupération admin:', err);
              }
            });
          } else {
            console.warn('⚠️ adminId non trouvé dans le localStorage');
          }
        }

        // 👨‍💼 CHEF DE PROJET
        const chefId = localStorage.getItem('developpeurId');
        if (chefId) {
          this.chefDeProjetService.getChefById2(+chefId, token).subscribe({
            next: (chefData) => {
              this.chef = chefData;
              console.log('✅ Chef récupéré:', this.chef);
            },
            error: (err) => {
              console.error('❌ Erreur récupération chef:', err);
            }
          });
        } else {
          console.warn('⚠️ chefId non trouvé dans le localStorage');
        }

        
      }
    });

    // Mettre à jour l'URL actuelle à chaque navigation
    this.current = this.router.url;
    this.router.events.subscribe(() => {
      this.current = this.router.url;
    });
  }

  toggleSidebar(): void {
    this.OpenedSideBar = !this.OpenedSideBar;
  }

  toggleQuestionsMenu(): void {
    this.questionsMenuOpen = !this.questionsMenuOpen;
  }
}
*/
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { Administrateur } from '../../models/administrateur';
import { ChefDeProjet } from '../../models/chef-de-projet';
import { Developpeur } from '../../models/developpeur';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';
import { ChefDeProjetService } from '../../services/chef-de-projet.service';
import { DeveloppeurService } from '../../services/developpeur.service';

@Component({
  selector: 'app-side-bar-comp',
  standalone: true,
  templateUrl: './side-bar-comp.component.html',
  styleUrls: ['./side-bar-comp.component.scss'],
  imports: [MatIconModule, MatButtonModule, MatSidenavModule, CommonModule, RouterModule]
})
export class SideBarCompComponent implements OnInit {
  OpenedSideBar: boolean = true;
  current!: string;
  roles = JSON.parse(localStorage.getItem('roles') || '[]');

  private router = inject(Router);
  questionsMenuOpen: boolean = false;

  admin: Administrateur = {} as Administrateur;
  chef: ChefDeProjet = {} as ChefDeProjet;
  developpeur: Developpeur = {} as Developpeur;

  isAdmin = false;
  isDeveloppeur = false;

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private chefDeProjetService: ChefDeProjetService,
    private developpeurService: DeveloppeurService
  ) {}

  ngOnInit(): void {
    this.current = this.router.url;
    this.router.events.subscribe(() => {
      this.current = this.router.url;
    });

    this.authService.authStatus$.subscribe((isAuthenticated) => {
      if (!isAuthenticated) return;

      const roles = JSON.parse(localStorage.getItem('roles') || '[]');
      const token = localStorage.getItem('accessToken');
      const id = localStorage.getItem('developpeurId');

      if (!token || !id) {
        console.warn('⚠️ Token ou ID manquant dans le localStorage');
        return;
      }

      const userId = +id;

      // 🔐 ADMIN
      if (roles.includes('ROLE_ADMIN')) {
        this.isAdmin = true;
        this.adminService.getAdminById(userId, token).subscribe({
          next: (adminData) => {
            this.admin = adminData;
            console.log('✅ Admin récupéré:', this.admin);
          },
          error: (err) => {
            console.error('❌ Erreur récupération admin:', err);
          }
        });
      }

      // 👨‍💼 CHEF DE PROJET
      this.chefDeProjetService.getChefById2(userId, token).subscribe({
        next: (chefData) => {
          this.chef = chefData;
          console.log('✅ Chef récupéré:', this.chef);
        },
        error: (err) => {
          console.error('❌ Erreur récupération chef:', err);
        }
      });

      // 👨‍💻 DÉVELOPPEUR
      if (roles.includes('ROLE_DEVELOPPEUR')) {
        this.isDeveloppeur = true;
        this.developpeurService.getDeveloppeurById(userId).subscribe({
          next: (devData) => {
            this.developpeur = devData;
            console.log('✅ Développeur récupéré:', this.developpeur);
          },
          error: (err) => {
            console.error('❌ Erreur récupération développeur:', err);
          }
        });
      }
    });
  }

  toggleSidebar(): void {
    this.OpenedSideBar = !this.OpenedSideBar;
  }

  toggleQuestionsMenu(): void {
    this.questionsMenuOpen = !this.questionsMenuOpen;
  }
}

