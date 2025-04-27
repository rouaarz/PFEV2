

// <<<<<<< Updated upstream
// =======
// // import { Routes } from '@angular/router';
// // import { HomeComponent } from './home/home.component';
// // import { SignupComponent } from './signup/signup.component';
// // import { SigninComponent } from './signin/signin.component';
// // import { QuestionComponent } from './question/question.component';
// // import { ListQuestionsComponent } from './list-questions/list-questions.component';
// // import { EditQuestionComponent } from './edit-question/edit-question.component';
// // import { ActivationCompteComponent } from './activation-compte/activation-compte.component';
// // import { ComptesActifsComponent } from './comptes-actifs/comptes-actifs.component';
// // <<<<<<< Updated upstream
// // =======
// // import { InvitationComponent } from './components/invitation/invitation.component';
// // >>>>>>> Stashed changes
// // import { TestDetailComponent } from './components/test-detail/test-detail.component';
// // import { TestListComponent } from './components/test-list/test-list.component';
// // import { TestQuestionsComponent } from './components/test-questions/test-questions.component';
// // import { ScoreComponent } from './components/score/score.component';
// // <<<<<<< Updated upstream
// // import { DashboardComponent } from './dashboard/dashboard.component';
// // import { AjoutChefsComponent } from './ajout-chefs/ajout-chefs.component';
// // import { EditChefsComponent } from './edit-chefs/edit-chefs.component';
// // import { ListChefsComponent } from './list-chefs/list-chefs.component';
// // import { AssignDeveloppeurComponent } from './assign-developpeur/assign-developpeur.component';
// // import { ChefDeveloppeurComponent } from './chef-developpeur/chef-developpeur.component';
// // import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
// // =======
// // import {TestManagementComponent} from './components/test-management/test-management/test-management.component';

// // import { TestDetailsComponent } from './components/test-management/test-details/test-details.component';
// // import {BasicInfoComponent} from './components/adminCreatetest/basic-info/basic-info.component';

// // import { CreateTestComponent } from './components/adminCreatetest/create-test/create-test.component';
// // >>>>>>> Stashed changes

// // export const routes: Routes = [
// //   { path: '', component: HomeComponent },
// //   { path: 'signup', component: SignupComponent },
// //   { path: 'signin', component: SigninComponent},
// // <<<<<<< Updated upstream
// //   { path: 'dash', component: DashboardComponent},
// //   {
// //     path: 'admin',
// //     component: AdminLayoutComponent,
// //     children: [
// //       { path: 'ajout-Chef', component: AjoutChefsComponent},
// //       { path: 'edit-Chef/:id', component: EditChefsComponent},
// //       { path: 'list-Chefs', component: ListChefsComponent},
// //       { path: 'Question', component: QuestionComponent},
// //       { path: 'List-Question', component: ListQuestionsComponent},
// //       { path: 'edit-question/:id', component: EditQuestionComponent },
// //       { path: 'assign-developpeur/:id', component: AssignDeveloppeurComponent },
// //       { path: 'developpeurs-assignes/:id', component: ChefDeveloppeurComponent },
// //       { path: 'activation-Compte', component: ActivationCompteComponent},
// //       { path: 'comptes-actifs', component: ComptesActifsComponent },
// //       { path: 'test/:testId', component: TestDetailComponent },
// //       { path: 'tests', component: TestListComponent },
// //       { path: 'test/:testId/questions', component: TestQuestionsComponent },
// //       { path: 'test/:testId/score/:developpeurId', component: ScoreComponent }
// //     ]
// //   },



// // ];
// // =======
// //   { path: 'Question', component: QuestionComponent},
// //   { path: 'List-Question', component: ListQuestionsComponent},
// //   { path: 'activation-Compte', component: ActivationCompteComponent},
// //   { path: 'comptes-actifs', component: ComptesActifsComponent },
// //   { path: 'edit-question/:id', component: EditQuestionComponent },
// //   { path: 'test/:testId', component: TestDetailComponent }, // Route pour afficher un test spécifique
// //   { path: 'tests', component: TestListComponent }, // Route pour afficher un test spécifique
// //   { path: 'test/:testId/questions', component: TestQuestionsComponent },
// //   { path: 'test/:testId/score/:developpeurId', component: ScoreComponent },
// //   { path: 'admin/TestManagement', component: TestManagementComponent },
// //   { path: 'admin/test-details/:id', component: TestDetailsComponent },
// //   { path: 'invitations/:invitationId', component: InvitationComponent },

// //   { path: 'admin/edit-test/:id', component: CreateTestComponent },

// //   {
// //     path: 'admin/tests-create',
// //     component: CreateTestComponent
// //   }


// // ];
// // >>>>>>> Stashed changes
// >>>>>>> Stashed changes
// import { Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { AdminGuard } from './guards/admin.guard'; // Assure-toi du bon chemin !
// import { ChefGuard } from './guards/chef.guard'; // Import du nouveau garde

// import { SignupComponent } from './signup/signup.component';
// import { SigninComponent } from './signin/signin.component';
// import { QuestionComponent } from './question/question.component';
// import { ListQuestionsComponent } from './list-questions/list-questions.component';
// import { EditQuestionComponent } from './edit-question/edit-question.component';
// import { ActivationCompteComponent } from './activation-compte/activation-compte.component';
// import { ComptesActifsComponent } from './comptes-actifs/comptes-actifs.component';
// import { TestDetailComponent } from './components/test-detail/test-detail.component';
// import { TestListComponent } from './components/test-list/test-list.component';
// import { TestQuestionsComponent } from './components/test-questions/test-questions.component';
// import { ScoreComponent } from './components/score/score.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { AjoutChefsComponent } from './ajout-chefs/ajout-chefs.component';
// import { EditChefsComponent } from './edit-chefs/edit-chefs.component';
// import { ListChefsComponent } from './list-chefs/list-chefs.component';
// import { AssignDeveloppeurComponent } from './assign-developpeur/assign-developpeur.component';
// import { ChefDeveloppeurComponent } from './chef-developpeur/chef-developpeur.component';
// import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
// import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
// import { ConfigurableFocusTrapFactory } from '@angular/cdk/a11y';
// import { ConfirmationEmailComponent } from './confirmation-email/confirmation-email.component';

// export const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'signup', component: SignupComponent },
// <<<<<<< Updated upstream
//   { path: 'signin', component: SigninComponent},
//   { path: 'dash', component: DashboardComponent},
//   { path: 'forgot-password', component: ForgotPasswordComponent },
//   { path: 'Confirmationemail', component: ConfirmationEmailComponent },
//   { path: 'reset-password', component: ResetPasswordComponent },
 
// =======
//   { path: 'signin', component: SigninComponent },
//   { path: 'dash', component: DashboardComponent },
//   { path: 'edit-question/:id', component: EditQuestionComponent },
//   { path: 'test/:testId', component: TestDetailComponent },
//   { path: 'tests', component: TestListComponent },
//   { path: 'test/:testId/questions', component: TestQuestionsComponent },
//   { path: 'test/:testId/score/:developpeurId', component: ScoreComponent },
//   { path: 'invitations/:invitationId', component: InvitationComponent },

// >>>>>>> Stashed changes
//   {
//     path: 'admin',
//     component: AdminLayoutComponent,
//     canActivate: [AdminGuard], // 🔒 Protection admin

//     children: [
// <<<<<<< Updated upstream
//       { path: 'ajout-Chef', component: AjoutChefsComponent},
//       { path: 'edit-Chef/:id', component: EditChefsComponent},
//       { path: 'list-Chefs', component: ListChefsComponent},
//       { path: 'Question', component: QuestionComponent},
//       { path: 'List-Question', component: ListQuestionsComponent},
//       { path: 'edit-question/:id', component: EditQuestionComponent },
//       { path: 'assign-developpeur/:id', component: AssignDeveloppeurComponent },
//       { path: 'developpeurs-assignes/:id', component: ChefDeveloppeurComponent },
//       { path: 'activation-Compte', component: ActivationCompteComponent},
//       { path: 'comptes-actifs', component: ComptesActifsComponent },
//       { path: 'test/:testId', component: TestDetailComponent },
//       { path: 'tests', component: TestListComponent },
//       { path: 'test/:testId/questions', component: TestQuestionsComponent },
//       { path: 'test/:testId/score/:developpeurId', component: ScoreComponent }
//     ]
//   },

  
  
// =======
//       { path: 'List-Question', component: ListQuestionsComponent },
//       { path: 'Question', component: QuestionComponent },
//       { path: 'TestManagement', component: TestManagementComponent },
//       { path: 'edit-test/:id', component: CreateTestComponent },
//       { path: 'tests-create', component: CreateTestComponent },
//       { path: 'test-details/:id', component: TestDetailsComponent },

//       // ⚠️ Ces routes sont interdites aux chefs
//       { path: 'ajout-Chef', component: AjoutChefsComponent, canActivate: [ChefGuard] },
//       { path: 'edit-Chef/:id', component: EditChefsComponent, canActivate: [ChefGuard] },
//       { path: 'list-Chefs', component: ListChefsComponent, canActivate: [ChefGuard] },
//       { path: 'assign-developpeur/:id', component: AssignDeveloppeurComponent, canActivate: [ChefGuard] },
//       { path: 'developpeurs-assignes/:id', component: ChefDeveloppeurComponent, canActivate: [ChefGuard] },
//       { path: 'activation-Compte', component: ActivationCompteComponent, canActivate: [ChefGuard] },
//       { path: 'comptes-actifs', component: ComptesActifsComponent, canActivate: [ChefGuard] },
//     ]
//   }
//   // {
//   //   path: 'admin',
//   //   component: AdminLayoutComponent,
//   //   canActivate: [AdminGuard], // 🔒 Protection totale des routes admin

//   //   children: [
//   //     { path: 'ajout-Chef', component: AjoutChefsComponent },
//   //     { path: 'edit-Chef/:id', component: EditChefsComponent },
//   //     { path: 'list-Chefs', component: ListChefsComponent },
//   //     { path: 'assign-developpeur/:id', component: AssignDeveloppeurComponent },
//   //     { path: 'developpeurs-assignes/:id', component: ChefDeveloppeurComponent },
//   //     { path: 'List-Question', component: ListQuestionsComponent },
//   //     { path: 'Question', component: QuestionComponent },
//   //     { path: 'activation-Compte', component: ActivationCompteComponent },
//   //     { path: 'comptes-actifs', component: ComptesActifsComponent },
//   //     { path: 'TestManagement', component: TestManagementComponent },
//   //     { path: 'edit-test/:id', component: CreateTestComponent },
//   //     { path: 'tests-create', component: CreateTestComponent },

//   //   ]
//   // }
// >>>>>>> Stashed changes
// ];
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmationEmailComponent } from './confirmation-email/confirmation-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { QuestionComponent } from './question/question.component';
import { ListQuestionsComponent } from './list-questions/list-questions.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { ActivationCompteComponent } from './activation-compte/activation-compte.component';
import { ComptesActifsComponent } from './comptes-actifs/comptes-actifs.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AjoutChefsComponent } from './ajout-chefs/ajout-chefs.component';
import { EditChefsComponent } from './edit-chefs/edit-chefs.component';
import { ListChefsComponent } from './list-chefs/list-chefs.component';
import { AssignDeveloppeurComponent } from './assign-developpeur/assign-developpeur.component';
import { ChefDeveloppeurComponent } from './chef-developpeur/chef-developpeur.component';

import { TestDetailComponent } from './components/test-detail/test-detail.component';
import { TestListComponent } from './components/test-list/test-list.component';
import { TestQuestionsComponent } from './components/test-questions/test-questions.component';
import { ScoreComponent } from './components/score/score.component';
import { InvitationComponent } from './components/invitation/invitation.component';

import { TestManagementComponent } from './components/test-management/test-management/test-management.component';
import { TestDetailsComponent } from './components/test-management/test-details/test-details.component';
import { CreateTestComponent } from './components/adminCreatetest/create-test/create-test.component';
import { GenerateTestComponent } from './components/generate-test/generate-test.component';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { TestBYAdminComponent} from './components/test-byadmin/test-byadmin.component';
import { AdminGuard } from './guards/admin.guard';
import { ChefGuard } from './guards/chef.guard';
import { AnalyseReponsesComponent}from './components/analyse-reponses/analyse-reponses.component'
import {ReviewTestComponent} from './components/review/review-test-component/review-test-component.component'
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'Confirmationemail', component: ConfirmationEmailComponent },
  { path: 'dash', component: DashboardComponent },

  { path: 'edit-question/:id', component: EditQuestionComponent },
  { path: 'test/:testId', component: TestDetailComponent },
  { path: 'tests', component: TestListComponent },
  { path: 'testsbyadmin', component:TestBYAdminComponent},
  { path: 'test/:testId/questions', component: TestQuestionsComponent },
  { path: 'test/:testId/score/:developpeurId', component: ScoreComponent },
  { path: 'invitations/:invitationId', component: InvitationComponent },
  { path: 'analyse-test/:testId', component: AnalyseReponsesComponent},
  {
    path: 'review-test/:testId',
    component: ReviewTestComponent,
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard], // 🔒 Protection admin
    children: [
      { path: 'List-Question', component: ListQuestionsComponent },
      { path: 'Question', component: QuestionComponent },
      { path: 'TestManagement', component: TestManagementComponent },
      { path: 'edit-test/:id', component: CreateTestComponent },
      { path: 'tests-create', component: CreateTestComponent },
      { path: 'test-details/:id', component: TestDetailsComponent },

      // Routes réservées uniquement aux Admins (avec protection ChefGuard)
      { path: 'ajout-Chef', component: AjoutChefsComponent, canActivate: [ChefGuard] },
      { path: 'edit-Chef/:id', component: EditChefsComponent, canActivate: [ChefGuard] },
      { path: 'list-Chefs', component: ListChefsComponent, canActivate: [ChefGuard] },
      { path: 'assign-developpeur/:id', component: AssignDeveloppeurComponent, canActivate: [ChefGuard] },
      { path: 'developpeurs-assignes/:id', component: ChefDeveloppeurComponent, canActivate: [ChefGuard] },
      { path: 'activation-Compte', component: ActivationCompteComponent, canActivate: [ChefGuard] },
      { path: 'comptes-actifs', component: ComptesActifsComponent, canActivate: [ChefGuard] },
      { path: 'generate-test', component: GenerateTestComponent },

    ]
  }
];
