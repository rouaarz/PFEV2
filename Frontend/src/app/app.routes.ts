

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { QuestionComponent } from './question/question.component';
import { ListQuestionsComponent } from './list-questions/list-questions.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { ActivationCompteComponent } from './activation-compte/activation-compte.component';
import { ComptesActifsComponent } from './comptes-actifs/comptes-actifs.component';
import { TestDetailComponent } from './components/test-detail/test-detail.component';
import { TestListComponent } from './components/test-list/test-list.component';
import { TestQuestionsComponent } from './components/test-questions/test-questions.component';
import { ScoreComponent } from './components/score/score.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AjoutChefsComponent } from './ajout-chefs/ajout-chefs.component';
import { EditChefsComponent } from './edit-chefs/edit-chefs.component';
import { ListChefsComponent } from './list-chefs/list-chefs.component';
import { AssignDeveloppeurComponent } from './assign-developpeur/assign-developpeur.component';
import { ChefDeveloppeurComponent } from './chef-developpeur/chef-developpeur.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent},
  { path: 'dash', component: DashboardComponent},
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'ajout-Chef', component: AjoutChefsComponent},
      { path: 'edit-Chef/:id', component: EditChefsComponent},
      { path: 'list-Chefs', component: ListChefsComponent},
      { path: 'Question', component: QuestionComponent},
      { path: 'List-Question', component: ListQuestionsComponent},
      { path: 'edit-question/:id', component: EditQuestionComponent },
      { path: 'assign-developpeur/:id', component: AssignDeveloppeurComponent },
      { path: 'developpeurs-assignes/:id', component: ChefDeveloppeurComponent },
      { path: 'activation-Compte', component: ActivationCompteComponent},
      { path: 'comptes-actifs', component: ComptesActifsComponent },
      { path: 'test/:testId', component: TestDetailComponent },
      { path: 'tests', component: TestListComponent },
      { path: 'test/:testId/questions', component: TestQuestionsComponent },
      { path: 'test/:testId/score/:developpeurId', component: ScoreComponent }
    ]
  },

  
  
];
