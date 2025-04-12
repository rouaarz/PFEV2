import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../../services/test.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TestDetailsComponent implements OnInit {
  test: any;
  questions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const testId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTestDetails(testId);
    this.loadTestQuestions(testId);
  }

  loadTestDetails(testId: number) {
    this.testService.getTestDetails(testId).subscribe({
      next: (data) => (this.test = data),
      error: (err) => console.error('❌ Erreur chargement détails test :', err),
    });
  }

  loadTestQuestions(testId: number) {
    this.testService.getQuestionsForTest(testId).subscribe({
      next: (data) => (this.questions = data),
      error: (err) => console.error('❌ Erreur chargement questions :', err),
    });
  }

  goBack() {
    this.router.navigate(['/admin/TestManagement']); // Retour vers la liste des tests
  }
}
