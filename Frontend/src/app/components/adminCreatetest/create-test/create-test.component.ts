
import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BasicInfoComponent } from '../basic-info/basic-info.component';
import { AssignQuestionsComponent } from '../assign-questions/assign-questions.component';
import { PublishTestComponent } from '../publish-test/publish-test.component';
import { TestService } from '../../../services/test.service';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    BasicInfoComponent,
    AssignQuestionsComponent,
    PublishTestComponent
  ],
})
export class CreateTestComponent {
  @ViewChild(MatStepper) stepper!: MatStepper;
  testId: number | null = null;
  questionsAssigned: boolean = false;
  loading: boolean = false; // Pour afficher le spinner de chargement à la fin

  constructor(private router: Router) {}

  // Quand le test est créé
  onTestCreated(testId: number) {
    this.testId = testId;
    console.log('Test créé avec ID:', testId);
    setTimeout(() => this.stepper.next(), 500); // Passage fluide à la prochaine étape
  }

  // Quand les questions sont assignées
  onQuestionsAssigned() {
    this.questionsAssigned = true;
    console.log('Questions assignées avec succès');
    this.stepper.next(); // Passer à la troisième étape après l'assignation des questions
  }
  goToPublicationStep() {
    if (this.questionsAssigned) {
      this.stepper.next(); // Avance à l'étape Publication
    } else {
      alert('Veuillez d\'abord assigner des questions avant de publier le test');
    }
  }
  navigateToTestManagement() {
    this.router.navigate(['/admin/TestManagement']);
  }

  // Quand le test est publié
  onTestPublished() {
    console.log('Publication du test...');
    this.loading = true; // Affichage du spinner
  
    setTimeout(() => {
      console.log('Test publié et emails envoyés!');
      this.loading = false; // Arrêt du spinner
  
      // Maintenant, passer à la dernière étape
      this.stepper.next(); // Si nécessaire, avancer à l'étape suivante
      this.router.navigate(['/admin/TestManagement']); // Redirection après la publication
    }, 2500); // Temps de chargement simulé
  }
  onQuestionsFinalized() {
    console.log('Questions finalisées');
    this.stepper.next(); // Passer à la troisième étape (publication)
  }


  // Méthode appelée lorsque l'étape est changée
  onStepChanged(event: any) {
    // Cela va colorer la ligne de progression et gérer l'activation des étapes
    if (event.selectedIndex >= 0) {
      this.stepper.selectedIndex = event.selectedIndex; 
    }
  }
}
