// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { TestService } from '../../services/test.service';
// import { TestGenerationRequest } from '../../models/TestGenerationRequest ';
// import { FormsModule } from '@angular/forms'; // ⬅️ ajoute ceci

// @Component({
//   selector: 'app-generate-test',
//   imports: [CommonModule,FormsModule],
//   templateUrl: './generate-test.component.html',
//   styleUrl: './generate-test.component.css',
//   standalone: true,

// })
// export class GenerateTestComponent {
//   request: TestGenerationRequest = {
//     titre: '',
//     description: '',
//     duree: 10,
//     nbQuestions: 10,
//     niveauDifficulte: 'MOYEN',
//     type: 'QCM',
//     accesPublic: true,
//     limiteTentatives: 1,
//     dateExpiration: new Date(),
//     technologies: [],
//     nbQcmFacile: 0,
//     nbQcmMoyen: 0,
//     nbQcmDifficile: 0,
//     nbCodeFacile: 0,
//     nbCodeMoyen: 0,
//     nbCodeDifficile: 0,
//     nbTexteFacile: 0,  // Ajouter cette ligne
//     nbTexteMoyen: 0,   // Ajouter cette ligne
//     nbTexteDifficile: 0, // Ajouter cette li
//     pointsParQuestion: 5
//   };

//   techOptions = ['Java', 'Spring Boot', 'Angular', 'Node.js', 'Python','html'];
//   questionsPreview: any[] = []; // Déclaration de la variable questionsPreview
//   selectedTech: string[] = [];

//   toggleTech(tech: string, event: any) {
//     if (event.target.checked) this.request.technologies.push(tech);
//     else this.request.technologies = this.request.technologies.filter(t => t !== tech);
//   }
//   constructor(private testService: TestService) {}

//   generateTest() {
//     const token = localStorage.getItem('accessToken'); // ou ton système de token actuel
//     if (!token) return alert('🚫 Token manquant');
//     const requestData = this.request;

//     this.testService.generateTest(requestData, token).subscribe({
//       next: (test) => {
//         alert('✅ Test généré avec succès !');
//         console.log(test);
//       },
//       error: (err) => {
//         console.error(err);
//         alert('❌ Erreur lors de la génération du test');
//       }
//     });
//   }
//   generateQuestionsPreview() {
//     const token = localStorage.getItem('accessToken');
//     if (!token) return alert('🚫 Token manquant');
//     const requestData = this.request;
//     // Appeler l'API pour générer les questions
//     this.testService.generateQuestions(requestData, token).subscribe({
//       next: (questions) => {
//         this.questionsPreview = questions;  // Gardez les questions en preview

//         console.log('Questions générées', questions);
//         // Si tu veux, tu peux aussi afficher un aperçu des questions ici dans l'UI
//       },
//       error: (err) => {
//         console.error(err);
//         alert('❌ Erreur lors de la génération des questions');
//       }
//     });
//   }
// }
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestService } from '../../services/test.service';
import { TestGenerationRequest } from '../../models/TestGenerationRequest ';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generate-test',
  imports: [CommonModule, FormsModule],
  templateUrl: './generate-test.component.html',
  styleUrl: './generate-test.component.css',
  standalone: true,
})
export class GenerateTestComponent {
  request: TestGenerationRequest = {
    titre: '',
    description: '',
    duree: 10,
    nbQuestions: 10,
    niveauDifficulte: 'MOYEN',
    type: 'QCM',
    accesPublic: true,
    limiteTentatives: 1,
    dateExpiration: new Date(),
    technologies: [],
    nbQcmFacile: 0,
    nbQcmMoyen: 0,
    nbQcmDifficile: 0,
    nbCodeFacile: 0,
    nbCodeMoyen: 0,
    nbCodeDifficile: 0,
    nbTexteFacile: 0,
    nbTexteMoyen: 0,
    nbTexteDifficile: 0,
    pointsParQuestion: 5,
  };

  techOptions = ['Java', 'Spring Boot', 'Angular', 'Node.js', 'Python', 'html'];
  questionsPreview: any[] = [];
  selectedTech: string[] = [];

  toggleTech(tech: string, event: any) {
    if (event.target.checked) this.request.technologies.push(tech);
    else this.request.technologies = this.request.technologies.filter(t => t !== tech);
  }

  constructor(private testService: TestService) {}

  // Ajout de logs dans la fonction generateTest
  generateTest() {
    const token = localStorage.getItem('accessToken'); 
    if (!token) return alert('🚫 Token manquant');
    
    // Affiche la valeur de la durée avant l'envoi
    console.log('Durée avant envoi:', this.request.duree);

    const requestData = this.request;

    // Affiche l'ensemble de la requête avant l'envoi
    console.log('Données envoyées à l\'API:', requestData);

    this.testService.generateTest(requestData, token).subscribe({
      next: (test) => {
        alert('✅ Test généré avec succès !');
        console.log('Réponse de l\'API:', test);
      },
      error: (err) => {
        console.error('Erreur générant le test:', err);
        alert('❌ Erreur lors de la génération du test');
      }
    });
  }

  // Ajout de logs dans la fonction generateQuestionsPreview
  generateQuestionsPreview() {
    const token = localStorage.getItem('accessToken');
    if (!token) return alert('🚫 Token manquant');
    this.request.technologies = [...this.selectedTech];

    // Affiche la valeur de la durée avant l'envoi
    console.log('Durée avant envoi pour preview des questions:', this.request.duree);
    console.log('technologie avant envoi pour preview des questions:', this.request.technologies);

    const requestData = this.request;

    // Affiche l'ensemble de la requête avant l'envoi
    console.log('Données envoyées pour générer les questions:', requestData);

    this.testService.generateQuestions(requestData, token).subscribe({
      next: (questions) => {
        this.questionsPreview = questions;
        console.log('Questions générées:', questions);
      },
      error: (err) => {
        console.error('Erreur lors de la génération des questions:', err);
        alert('❌ Erreur lors de la génération des questions');
      }
    });
  }
}
