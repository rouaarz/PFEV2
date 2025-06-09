
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestService } from '../../services/test.service';
import { QuestionService } from '../../services/question-service.service';
import { PublishTestComponent } from '../../components/adminCreatetest/publish-test/publish-test.component';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'; // <-- en haut

import { TestGenerationRequest } from '../../models/TestGenerationRequest ';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generate-test',
  imports: [CommonModule, FormsModule, NgbModalModule
  ],
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

  techOptions = ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 
  'PHP', 'SQL',  'Kotlin','React.js', 'Vue.js', 'Angular','HTML','CSS'];
  questionsPreview: any[] = [];
  selectedTech: string[] = [];

  toggleTech(tech: string, event: any) {
    if (event.target.checked) this.request.technologies.push(tech);
    else this.request.technologies = this.request.technologies.filter(t => t !== tech);
  }
  token = localStorage.getItem('accessToken') ?? '';
  testId: number | null = null;
  constructor(private testService: TestService, private questionService: QuestionService, private modalService: NgbModal, private router: Router 
  ) { }
  // openPublishTestModal() {
  //   const modalRef = this.modalService.open(PublishTestComponent); // Ouvre la modal
  //   modalRef.componentInstance.testId = this.testId;  // Passe l'ID du test à la modal si nécessaire
  //   modalRef.componentInstance.testPublished.subscribe(() => this.onTestPublished()); // Abonnement à l'événement de publication
  // }
  openPublishTestModal() {
    const modalRef = this.modalService.open(PublishTestComponent); // Open the modal
    modalRef.componentInstance.testId = this.testId;  // Pass the test ID to the modal if necessary
    modalRef.componentInstance.testPublished.subscribe(() => {
      this.onTestPublished();  // Handle test publication logic
      modalRef.close();        // Close the modal after the test is published
    });
  }


  // Ajout de logs dans la fonction generateTest
  validateForm() {
    // Vérification du titre
    if (!this.request.titre.trim()) {
      alert('Titre est obligatoire.');
      return false;
    }

    // Vérification de la durée (doit être supérieur à 0)
    if (this.request.duree <= 0) {
      alert('La durée doit être supérieure à 0.');
      return false;
    }

    // Vérification du nombre total de questions (doit être supérieur à 0)
    if (this.request.nbQuestions <= 0) {
      alert('Le nombre total de questions doit être supérieur à 0.');
      return false;
    }

    // Vérification de la sélection du type de test
    if (!this.request.type) {
      alert('Veuillez sélectionner un type de test.');
      return false;
    }
    this.request.technologies = [...this.selectedTech];

    // Vérification des technologies sélectionnées
    if (this.request.technologies.length === 0) {
      alert('Veuillez sélectionner au moins une technologie.');
      return false;
    }

    // Validation spécifique aux types de test pour les questions
    if (this.request.type === 'QCM' || this.request.type === 'Mixte') {
      if (this.request.nbQcmFacile <= 0 && this.request.nbQcmMoyen <= 0 && this.request.nbQcmDifficile <= 0) {
        alert('Vous devez définir au moins une question QCM.');
        return false;
      }
    }

    if (this.request.type === 'Code' || this.request.type === 'Mixte') {
      if (this.request.nbCodeFacile <= 0 && this.request.nbCodeMoyen <= 0 && this.request.nbCodeDifficile <= 0) {
        alert('Vous devez définir au moins une question de code.');
        return false;
      }
    }

    if (this.request.type === 'text' || this.request.type === 'Mixte') {
      if (this.request.nbTexteFacile <= 0 && this.request.nbTexteMoyen <= 0 && this.request.nbTexteDifficile <= 0) {
        alert('Vous devez définir au moins une question texte.');
        return false;
      }
    }

    return true; // Si tout est valide
  }


generateQuestionsPreview() {
  if (!this.validateForm()) {
    return;
  }

  const token = localStorage.getItem('accessToken');
  if (!token) return alert('🚫 Token manquant');

  this.request.technologies = [...this.selectedTech];

  console.log('📤 Données envoyées pour générer les questions:', this.request);

  const requestData = this.request;

  // 1. Générer les questions en premier
  this.testService.generateQuestions(requestData, token).subscribe({
    next: (response) => {
      this.questionsPreview = response.questions;
      console.log('✅ Questions générées:', response.questions);
      console.log('ℹ️ Message:', response.message);

      // 2. Une fois les questions générées, créer le test
      const testToSend = {
        titre: requestData.titre,
        description: requestData.description,
        duree: requestData.duree,
        nbQuestions: requestData.nbQuestions,
        niveauDifficulte: requestData.niveauDifficulte,
        type: requestData.type,
        technologies: requestData.technologies,
      };

      this.testService.createTest(testToSend, token).subscribe({
        next: (response) => {
          this.testId = response.id;
          console.log('📝 Test créé avec succès:', response);
          alert('✅ Test créé avec succès après génération des questions !');
        },
        error: (err) => {
          console.error('❌ Erreur lors de la création du test:', err);
          alert('❌ Erreur lors de la création du test');
        }
      });
    },
    error: (err) => {
      console.error('❌ Erreur lors de la génération des questions:', err);
      const errorMessage = err.error?.error || 'Erreur inconnue lors de la génération';
      alert('❌ ' + errorMessage);
    }
  });
}


  // Ajout de logs dans la fonction generateQuestionsPreview
  // generateQuestionsPreview() {
  //   if (!this.validateForm()) {
  //     return;
  //   }
  //   const token = localStorage.getItem('accessToken');
  //   if (!token) return alert('🚫 Token manquant');
  //   this.request.technologies = [...this.selectedTech];

  //   // Affiche la valeur de la durée avant l'envoi
  //   console.log('Durée avant envoi pour preview des questions:', this.request.duree);
  //   console.log('technologie avant envoi pour preview des questions:', this.request.technologies);

  //   const requestData = this.request;

  //   // Affiche l'ensemble de la requête avant l'envoi
  //   console.log('Données envoyées pour générer les questions:', requestData);
  //   const testToSend = {
  //     titre: requestData.titre,
  //     description: requestData.description,
  //     duree: requestData.duree,
  //     nbQuestions: requestData.nbQuestions,
  //     niveauDifficulte: requestData.niveauDifficulte,
  //     type: requestData.type,
  //     technologies: requestData.technologies,
  //   }
  //   // Affiche l'ensemble de la requête avant l'envoi
  //   console.log('Données envoyées à l\'API:', requestData);
  //   this.testService.createTest(testToSend, this.token).subscribe({
  //     next: (response) => {
  //       this.testId = response.id;
  //       console.log('Test créé avec succès:', response);
  //       alert('Test créé avec succès!');
  //     },
  //     error: (err) => {
  //       console.error('Erreur lors de la création du test:', err);
  //       alert('Erreur lors de la création du test');
  //     }
  //   });
  //   this.testService.generateQuestions(requestData, token).subscribe({
  //     next: (questions) => {
  //       this.questionsPreview = questions;
  //       console.log('Questions générées:', questions);
  //     },
  //     error: (err) => {
  //       console.error('Erreur lors de la génération des questions:', err);
  //       alert('❌ Erreur lors de la génération des questions');
  //     }
  //   });

  // }

  onTestPublished() {
    console.log('Publication du test...');

    setTimeout(() => {
      console.log('Test publié et emails envoyés!');

      // Maintenant, passer à la dernière étape
    }, 2500); // Temps de chargement simulé
  }
regenerateQuestions() {
  const token = localStorage.getItem('accessToken');
  if (!token) return alert('🚫 Token manquant');

  this.request.technologies = [...this.selectedTech];

  console.log('🔁 Régénération des questions avec :', this.request);

  this.testService.generateQuestions(this.request, token).subscribe({
    next: (response) => {
      this.questionsPreview = response.questions;
      console.log('✅ Questions régénérées:', response.questions);
      console.log('ℹ️ Message:', response.message);
      alert('✔️ Les questions ont été régénérées avec succès.');
    },
    error: (err) => {
      console.error('❌ Erreur lors de la régénération des questions:', err);
      const errorMessage = err.error?.error || 'Erreur inconnue lors de la régénération';
      alert('❌ ' + errorMessage);
    }
  });
}

  supprimerQuestion(index: number): void {
    this.questionsPreview.splice(index, 1);
  }

  remplacerQuestion(index: number): void {
    const questionARemplacer = this.questionsPreview[index];

    const request = {
      id: questionARemplacer.id,
      type: questionARemplacer.type,
      niveau: questionARemplacer.niveau,
      technologie: questionARemplacer.technologie
    };

    this.questionService.remplacerQuestion(request).subscribe({
      next: (nouvelleQuestion) => {
        this.questionsPreview[index] = nouvelleQuestion;
      },
      error: (err) => {
        alert("Impossible de remplacer la question : " + err.error.message);
      }
    });
  }
  validerTest(): void {
    const token = localStorage.getItem('accessToken');
    if (!token) return alert('🚫 Token manquant');

    if (!this.testId) {
      return alert('❌ Test non encore créé');
    }

    const questionsToAssign = this.questionsPreview.map((q, index) => ({
      question: { id: q.id },
      points: q.selectedPoints ?? this.request.pointsParQuestion,
      ordre: q.selectedOrdre ?? index + 1
    }));

    console.log('🔒 Validation du test - Questions à assigner:', questionsToAssign);

    this.testService.addQuestionsToTest(this.testId, questionsToAssign, token).subscribe({
      next: (response) => {
        console.log('✅ Questions ajoutées avec succès :', response);
        alert('🎉 Test validé et questions assignées avec succès!');
      },
      error: (error) => {
        console.error('❌ Erreur lors de l\'assignation des questions :', error);
        alert('Erreur lors de l\'assignation des questions au test.');
      }
    });
    this.openPublishTestModal();

  }
  annuler(): void {
    if (confirm('Êtes-vous sûr de vouloir annuler ? Le test en cours sera supprimé.')) {
      this.testService.deleteTest(this.testId!, this.token).subscribe({
        next: () => {
          console.log('✅ Test brouillon supprimé avec succès');
          alert('Test annulé et supprimé avec succès.');
          this.router.navigate(['/admin/test-management']); // <-- ajuste si besoin
        }
      });
    }
  }
}
