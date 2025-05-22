
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TestService } from '../../../services/test.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-test-management',
  templateUrl: './test-management.component.html',
  styleUrls: ['./test-management.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule]
})

export class TestManagementComponent implements OnInit {
  tests: any[] = [];
  page: number = 1;
  itemsPerPage = 3;

  // 🔍 Recherche & Filtres
  searchQuery: string = '';
  selectedStatus: string = '';
  selectedType: string = '';
  token = localStorage.getItem('accessToken') ?? '';

  constructor(private testService: TestService, private router: Router) {}

  ngOnInit(): void {
    this.loadTests();
  }

  loadTests() {
    this.testService.getTestsForCurrentUser(this.token).subscribe({
      next: (data) => (this.tests = data),
      error: (err) => console.error('❌ Erreur :', err),
    });
  }

  addTest() {
    this.router.navigate(['/admin/tests-create']);
  }
  addTestAlea() {
    this.router.navigate(['admin/generate-test']);
  }
  editTest(testId: number) {
    this.router.navigate(['/admin/edit-test', testId]);
  }

  onPageChange(page: number) {
    this.page = page;
  }

  publishTest(testId: number, accesPublic: boolean) {
    const token = localStorage.getItem('accessToken') ?? '';
    this.testService.publishTest(testId, accesPublic, token).subscribe({
      next: () => this.loadTests(),
      error: (err) => console.error('❌ Erreur :', err),
    });
  }

  viewTestDetails(testId: number) {
    this.router.navigate(['/admin/test-details', testId]);
  }

  deleteTest(testId: number) {
    // À implémenter plus tard
  }

  // ✅ Méthode pour filtrer les tests dynamiquement
  filteredTests() {
    return this.tests.filter((test) => {
      const matchesSearch =
        this.searchQuery === '' ||
        test.titre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        test.description.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesStatus =
        this.selectedStatus === '' || test.statut === this.selectedStatus;

      const matchesType =
        this.selectedType === '' || test.type === this.selectedType;

      return matchesSearch && matchesStatus && matchesType;
    });
  }
}
