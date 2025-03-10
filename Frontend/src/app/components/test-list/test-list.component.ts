import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Ajout de Router
import { TestService } from '../../services/test.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css'],
  imports: [CommonModule],

  standalone: true, 
})
export class TestListComponent implements OnInit {
  tests: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private testService: TestService, private router: Router) {}

  ngOnInit(): void {
    this.fetchTests();
  }

  fetchTests(): void {
    this.testService.getAvailableTests().subscribe({
      next: (data) => {
        this.tests = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading tests';
        this.loading = false;
      }
    });
  }
  goToQuestions(testId: number) {
    this.router.navigateByUrl(`/test/${testId}/questions`);
  }
}
