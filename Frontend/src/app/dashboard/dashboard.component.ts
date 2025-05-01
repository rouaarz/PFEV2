/*import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarCompComponent } from '../Layout/navbar-comp/navbar-comp.component';
import { SideBarCompComponent } from '../Layout/side-bar-comp/side-bar-comp.component';
import { ChartdemandeComponent } from '../chartdemande/chartdemande/chartdemande.component';
import { ChartsubscribersComponent } from '../chartsubscribers/chartsubscribers/chartsubscribers.component';
import { StatistiqueService } from '../services/statistique.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NavbarCompComponent,
    SideBarCompComponent,
    ChartdemandeComponent,
    ChartsubscribersComponent
  ]
})
export class DashboardComponent implements OnInit {
  number: number = 0;

  totalUsers = 0;
  devCount = 0;
  chefProjetCount = 0;
  demandesActivation = 0;
  nombreTestsPublies = 0;

  constructor(private statsService: StatistiqueService) {
    this.fetchData();
  }

  ngOnInit(): void {
    
    this.statsService.getTotalUsers().subscribe({
      next: data => this.totalUsers = data,
      error: err => console.error('Erreur lors du chargement du nombre total d\'utilisateurs', err)
    });

    this.statsService.getDevelopersCount().subscribe({
      next: data => this.devCount = data,
      error: err => console.error('Erreur lors du chargement du nombre de développeurs', err)
    });

    this.statsService.getChefsProjetCount().subscribe({
      next: data => this.chefProjetCount = data,
      error: err => console.error('Erreur lors du chargement du nombre de chefs de projet', err)
    });

    this.statsService.getDemandesActivationCount().subscribe({
      next: data => this.demandesActivation = data,
      error: err => console.error('Erreur lors du chargement des demandes d\'activation', err)
    });

    this.statsService.getNombreTestsPublies().subscribe({
      next: count => this.nombreTestsPublies = count,
      error: err => console.error('Erreur lors du chargement des tests publiés', err)
    });
    
  }
  

  fetchData() {
    this.number = 100;
  }
}*/
/*
import { Component, OnInit } from '@angular/core';
import { StatistiqueService, TeamStats } from '../services/statistique.service';
import { ChartsubscribersComponent } from '../chartsubscribers/chartsubscribers/chartsubscribers.component';
import { ChartdemandeComponent } from '../chartdemande/chartdemande/chartdemande.component';
import { SideBarCompComponent } from '../Layout/side-bar-comp/side-bar-comp.component';
import { CommonModule } from '@angular/common';
import { NavbarCompComponent } from '../Layout/navbar-comp/navbar-comp.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NavbarCompComponent,
    SideBarCompComponent,
    ChartdemandeComponent,
    ChartsubscribersComponent
  ]
})
export class DashboardComponent implements OnInit {
  number = 0;

  totalUsers = 0;
  devCount = 0;
  chefProjetCount = 0;
  demandesActivation = 0;
  nombreTestsPublies = 0;

  role: string = '';
  teamStats?: TeamStats;
isChefDeProjet=false;

  constructor(private statsService: StatistiqueService,private authService: AuthService) {}

  ngOnInit(): void {

      this.isChefDeProjet = this.authService.isChefDeProjet();
   
  
      console.log("👤 Rôles : Chef =", this.isChefDeProjet);
  
    this.role = localStorage.getItem('role') || '';

    if (this.role === 'CHEF_DE_PROJET') {
      this.statsService.getMyTeamStats().subscribe({
        next: data => this.teamStats = data,
        error: err => console.error('Erreur stats équipe', err)
      });
    } else {
      this.statsService.getTotalUsers().subscribe({
        next: data => this.totalUsers = data,
        error: err => console.error('Erreur nb utilisateurs', err)
      });

      this.statsService.getDevelopersCount().subscribe({
        next: data => this.devCount = data,
        error: err => console.error('Erreur nb devs', err)
      });

      this.statsService.getChefsProjetCount().subscribe({
        next: data => this.chefProjetCount = data,
        error: err => console.error('Erreur nb chefs', err)
      });

      this.statsService.getDemandesActivationCount().subscribe({
        next: data => this.demandesActivation = data,
        error: err => console.error('Erreur demandes activation', err)
      });

      this.statsService.getNombreTestsPublies().subscribe({
        next: count => this.nombreTestsPublies = count,
        error: err => console.error('Erreur tests publiés', err)
      });
    }
  }
 
}*/
/*
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarCompComponent } from '../Layout/navbar-comp/navbar-comp.component';
import { SideBarCompComponent } from '../Layout/side-bar-comp/side-bar-comp.component';
import { ChartdemandeComponent } from '../chartdemande/chartdemande/chartdemande.component';
import { ChartsubscribersComponent } from '../chartsubscribers/chartsubscribers/chartsubscribers.component';
import { StatistiqueService } from '../services/statistique.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NavbarCompComponent,
    SideBarCompComponent,
    ChartdemandeComponent,
    ChartsubscribersComponent
  ]
})
export class DashboardComponent implements OnInit {
  totalUsers = 0;
  devCount = 0;
  chefProjetCount = 0;
  demandesActivation = 0;
  nombreTestsPublies = 0;
  teamStats: any;
  isChefDeProjet = false;
   number: any;
  nombreTestsEquipe=0;
  nombreDevEquipe=0;
  testsPublies=0 ;
isAdmin=false;

  constructor(private statsService: StatistiqueService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isChefDeProjet = this.authService.isChefDeProjet();
    this.isAdmin = this.authService.isAdmin();
    // Fetch stats based on user role
    if (this.isChefDeProjet) {
      this.statsService.getTeamStats().subscribe({
        next: (data) => {
          this.teamStats = data;
        },
        error: (err) => console.error('Erreur stats équipe', err)
      });
      this.statsService.getDeveloppeursCount().subscribe({
        next: (count) => this.nombreDevEquipe = count,
        error: (err) => console.error('Erreur lors du chargement du nombre de développeurs dans l’équipe', err)
      });
      this.statsService.getNombreTestsPubliesParChef().subscribe({
        next: (data) => {
          this.testsPublies = data;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des tests publiés', err);
        }
      });
    }
   
    
    
    else {
      this.fetchGeneralStats();
    }
  }

  fetchGeneralStats(): void {
    this.statsService.getTotalUsers().subscribe({
      next: (data) => (this.totalUsers = data),
      error: (err) => console.error('Erreur lors du chargement du nombre total d\'utilisateurs', err)
    });

    this.statsService.getDevelopersCount().subscribe({
      next: (data) => (this.devCount = data),
      error: (err) => console.error('Erreur lors du chargement du nombre de développeurs', err)
    });

    this.statsService.getChefsProjetCount().subscribe({
      next: (data) => (this.chefProjetCount = data),
      error: (err) => console.error('Erreur lors du chargement du nombre de chefs de projet', err)
    });

    this.statsService.getDemandesActivationCount().subscribe({
      next: (data) => (this.demandesActivation = data),
      error: (err) => console.error('Erreur lors du chargement des demandes d\'activation', err)
    });

    this.statsService.getNombreTestsPublies().subscribe({
      next: (count) => (this.nombreTestsPublies = count),
      error: (err) => console.error('Erreur lors du chargement des tests publiés', err)
    });
  }
}
*/
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarCompComponent } from '../Layout/navbar-comp/navbar-comp.component';
import { SideBarCompComponent } from '../Layout/side-bar-comp/side-bar-comp.component';
import { ChartdemandeComponent } from '../chartdemande/chartdemande/chartdemande.component';
import { ChartsubscribersComponent } from '../chartsubscribers/chartsubscribers/chartsubscribers.component';
import { StatistiqueService } from '../services/statistique.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NavbarCompComponent,
    SideBarCompComponent,
    ChartdemandeComponent,
    ChartsubscribersComponent
  ]
})
export class DashboardComponent implements OnInit {

  // Statistiques globales
  totalUsers = 0;
  devCount = 0;
  chefProjetCount = 0;
  demandesActivation = 0;
  nombreTestsPublies = 0;

  // Statistiques pour chef de projet
  teamStats: any;
  nombreDevEquipe = 0;
  testsPublies = 0;

  // Autres
  isChefDeProjet = false;
  isAdmin = false;
number: any;

  constructor(
    private statsService: StatistiqueService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isChefDeProjet = this.authService.isChefDeProjet();
    this.isAdmin = this.authService.isAdmin();

    if (this.isChefDeProjet) {
      this.loadChefDeProjetStats();
    } else {
      this.loadGeneralStats();
    }
  }

  private loadChefDeProjetStats(): void {
    this.statsService.getTeamStats().subscribe({
      next: data => this.teamStats = data,
      error: err => console.error('Erreur lors de la récupération des statistiques de l\'équipe', err)
    });

    this.statsService.getDeveloppeursCount().subscribe({
      next: count => this.nombreDevEquipe = count,
      error: err => console.error('Erreur lors de la récupération du nombre de développeurs dans l’équipe', err)
    });

    this.statsService.getNombreTestsPubliesParChef().subscribe({
      next: data => this.testsPublies = data,
      error: err => console.error('Erreur lors de la récupération des tests publiés', err)
    });
  }

  private loadGeneralStats(): void {
    this.statsService.getTotalUsers().subscribe({
      next: data => this.totalUsers = data,
      error: err => console.error('Erreur lors du chargement du nombre total d\'utilisateurs', err)
    });

    this.statsService.getDevelopersCount().subscribe({
      next: data => this.devCount = data,
      error: err => console.error('Erreur lors du chargement du nombre de développeurs', err)
    });

    this.statsService.getChefsProjetCount().subscribe({
      next: data => this.chefProjetCount = data,
      error: err => console.error('Erreur lors du chargement du nombre de chefs de projet', err)
    });

    this.statsService.getDemandesActivationCount().subscribe({
      next: data => this.demandesActivation = data,
      error: err => console.error('Erreur lors du chargement des demandes d\'activation', err)
    });

    this.statsService.getNombreTestsPublies().subscribe({
      next: count => this.nombreTestsPublies = count,
      error: err => console.error('Erreur lors du chargement des tests publiés', err)
    });
  }
}
