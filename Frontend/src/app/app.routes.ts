
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
import { TestBYAdminComponent } from './components/test-byadmin/test-byadmin.component';
import { AdminGuard } from './guards/admin.guard';
import { ChefGuard } from './guards/chef.guard';


import { EditProfileDeveloppeurComponent } from './edit-profile-developpeur/edit-profile-developpeur.component';
import { EditProfileAdminComponent } from './edit-profile-admin/edit-profile-admin.component';
import { EditProfileChefComponent } from './edit-profile-chef/edit-profile-chef.component';
import { DashboardDeveloppeurComponent } from './dashboard-developpeur/dashboard-developpeur.component';


import { AnalyseReponsesComponent } from './components/analyse-reponses/analyse-reponses.component'
import { ReviewTestComponent } from './components/review/review-test-component/review-test-component.component'
import { TestStatistiquesComponent } from './test-statistiques/test-statistiques.component'


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'Confirmationemail', component: ConfirmationEmailComponent },
  { path: 'dash', component: DashboardComponent },

  { path: 'test/:testId', component: TestDetailComponent },
  { path: 'tests', component: TestListComponent },
  { path: 'testsbyadmin', component: TestBYAdminComponent },
  { path: 'test/:testId/questions', component: TestQuestionsComponent },
  { path: 'test/:testId/score/:developpeurId', component: ScoreComponent },
  { path: 'invitations/:invitationId', component: InvitationComponent },

  { path: 'dashboard-developpeur', component: DashboardDeveloppeurComponent },
  {
    path: 'editDev/:id', 
    component: EditProfileDeveloppeurComponent 
  },
 
  { path: 'analyse-test/:testId', component: AnalyseReponsesComponent},

 

  {
    path: 'review-test/:testId',
    component: ReviewTestComponent,
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard], 
    children: [
      { path: 'List-Question', component: ListQuestionsComponent },
      { path: 'Question', component: QuestionComponent },
      { path: 'TestManagement', component: TestManagementComponent },
      { path: 'edit-test/:id', component: CreateTestComponent },
      { path: 'tests-create', component: CreateTestComponent },
      { path: 'test-details/:id', component: TestDetailsComponent },
      { path: 'edit-question/:id', component: EditQuestionComponent },

      
      {
        path: 'edit/:id', 
        component: EditProfileAdminComponent
      },

     { path: 'tests/:id/stats', component: TestStatistiquesComponent },


      {
        path: 'editchef/:id', 
        component: EditProfileChefComponent 
      },
    
      
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
