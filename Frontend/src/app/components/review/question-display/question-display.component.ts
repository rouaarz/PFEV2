import { Component, Input } from '@angular/core';
import { DeveloppeurResponse } from '../../../models/DeveloppeurResponse ';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.css'],
    imports: [CommonModule, FormsModule],
  standalone: true,

})
export class QuestionDisplayComponent {
  @Input() reponse: DeveloppeurResponse | null = null;
  @Input() isCurrent: boolean = false;
  @Input() currentQuestionIndex: number = 0; // Ajoutez cette ligne pour recevoir l'index de la question
  ngOnInit(): void {
    
  }
  // Vérifie si l'option est sélectionnée par le développeur
  isOptionSelected(option: any): boolean {
    return this.reponse?.selectedAnswerOptions.some(selectedOption => selectedOption.id === option.id) ?? false;
  }

  // Récupère la classe CSS pour chaque option selon sa validité
  getOptionClass(option: any): string {
    if (this.isOptionSelected(option)) {
      return option.isCorrect ? 'correct' : 'incorrect';
    }
    return 'unselected';
  }
  getOptionClassIcon(): string {
    // Vérifie si la réponse est correcte ou incorrecte en fonction de la première option sélectionnée
    if (this.reponse && this.reponse.selectedAnswerOptions.length > 0) {
      return this.reponse.selectedAnswerOptions[0].isCorrect ? 'correct' : 'incorrect';
    }
    return '';
  }
  
}
