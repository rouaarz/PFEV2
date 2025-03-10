import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from '../../services/test.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.css'],
  imports: [CommonModule], // Ajoute CommonModule

  standalone: true, // ❌ Supprimer cette ligne

})
export class TestDetailComponent implements OnInit {
  testDetails: any;
  testId: number | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private testService: TestService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID depuis l'URL
    this.route.paramMap.subscribe(params => {
      this.testId = Number(params.get('testId'));

      if (this.testId) {
        this.fetchTestDetails();
      }
    });
  }

  fetchTestDetails(): void {
    this.testService.getTestDetails(this.testId!).subscribe({
      next: (data) => {
        this.testDetails = data;
        this.loading = false;
      },
      error: () => {
        this.error = "Test not found or API error";
        this.loading = false;
      }
    });
  }
}
