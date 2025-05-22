import { Component, Input, OnInit } from '@angular/core';
import { TestService } from '../../../services/test.service';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-publish-test',
  templateUrl: './publish-test.component.html',
  styleUrls: ['./publish-test.component.css'],
    imports: [CommonModule, FormsModule],
    standalone: true,
})
export class PublishTestComponent implements OnInit {
  @Input() testId: number | null = null; // accepte aussi null
  @Output() testPublished = new EventEmitter<void>();

  accesRestreint: boolean = false;
  developers: any[] = [];
  selectedDevelopers: number[] = [];
  isLoading = false;  // Variable pour afficher ou cacher le loader

  token = localStorage.getItem('accessToken') || ''; // Récupérer le token via AuthService ou LocalStorage

  constructor(private testService: TestService, private adminService: AdminService,private router: Router) { }

  ngOnInit(): void {
    this.loadDevelopers()
  }
// ✅ Quand on change le type d'accès
onAccesChange(value: boolean) {
  this.accesRestreint = value;
  if (!this.accesRestreint) {
    this.loadDevelopers(); // Charger développeurs si test privé
  } else {
    this.selectedDevelopers = []; // Vider la sélection si public
  }
}
// ✅ Gérer la sélection des développeurs
onDeveloperSelect(event: any, devId: number) {
  if (event.target.checked) {
    // Ajouter si coché
    this.selectedDevelopers.push(devId);
  } else {
    // Enlever si décoché
    this.selectedDevelopers = this.selectedDevelopers.filter(id => id !== devId);
  }
}

// ✅ Récupérer développeurs actifs
loadDevelopers() {
  this.adminService.getActiveUsers().subscribe({
    next: (data) => {
      this.developers = data;
      if (this.developers.length === 0) {
        console.log('Aucun développeur trouvé');
      }
    },
    error: (err) => {
      console.error('Erreur de récupération des développeurs', err);
    }
  });
}

// ✅ Publier le test
publishTest() {
  this.token = localStorage.getItem('accessToken') || ''; // ou autre méthode
  if (this.testId !== null) {
    console.log('TestId:', this.testId);
    console.log('Développeurs sélectionnés:', this.selectedDevelopers);

    this.testService.publishTest(
      this.testId, 
      {
        accesRestreint: this.accesRestreint,
        developerIds: this.selectedDevelopers
      },
      this.token
    ).subscribe({
      next: (data) => {
        alert('Test publié avec succès!');
        console.log('Test publié avec succès!', data);
      },
      error: (err) => {
        console.error('Erreur lors de la publication', err);
      }
    });
  }
  this.isLoading = true;

  // Simuler un délai de 3 secondes avant de rediriger
  setTimeout(() => {
    // Logique de publication du test (à adapter selon ton backend)
    console.log('Test publié');
    alert('Test publié avec succès!');
  this.testPublished.emit(); // ✅ EMIT l'événement ici

    // Redirection vers la route 'admin/TestManagement'
    this.router.navigate(['/admin/TestManagement']);

    // Cacher le loader (si besoin, ici c'est automatique après 3 secondes)
    this.isLoading = false;
  }, 4000);  // Délai de 3 secondes

}
}
