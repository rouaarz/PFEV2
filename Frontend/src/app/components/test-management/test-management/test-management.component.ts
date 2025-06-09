
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TestService } from '../../../services/test.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PublishTestComponent } from '../../../components/adminCreatetest/publish-test/publish-test.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-test-management',
  templateUrl: './test-management.component.html',
  styleUrls: ['./test-management.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule, NgbModalModule]
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

  constructor(private testService: TestService, private modalService: NgbModal, private router: Router) { }

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
  result(testId: number) {
    this.router.navigate( ['admin/tests', testId, 'stats']);

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
  onTestPublished() {
    console.log('Publication du test...');

    setTimeout(() => {
      console.log('Test publié et emails envoyés!');

      // Maintenant, passer à la dernière étape
    }, 2500); // Temps de chargement simulé
  }
  openPublishTestModal(testId: number) {
    const modalRef = this.modalService.open(PublishTestComponent); // Open the modal
    modalRef.componentInstance.testId = testId;  // Pass the test ID to the modal if necessary
    modalRef.componentInstance.testPublished.subscribe(() => {
      this.onTestPublished();  // Handle test publication logic
      modalRef.close();        // Close the modal after the test is published
    });
  }
  // publishTest(testId: number, accesPublic: boolean) {
  //   const token = localStorage.getItem('accessToken') ?? '';
  //   this.testService.publishTest(testId, accesPublic, token).subscribe({
  //     next: () => this.loadTests(),
  //     error: (err) => console.error('❌ Erreur :', err),
  //   });
  // }

  viewTestDetails(testId: number) {
    this.router.navigate(['/admin/test-details', testId]);
  }

 deleteTest(testId: number) {
  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: 'Cette action est irréversible ! Le test sera définitivement supprimé.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.testService.deleteTest(testId, this.token).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Test supprimé avec succès !',
          showConfirmButton: false,
          timer: 1500
        });

        // Tu peux aussi actualiser la liste après suppression
        this.loadTests?.();
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la suppression du test.'
        });
      });
    }
  });
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
