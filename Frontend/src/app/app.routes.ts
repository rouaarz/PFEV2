import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { QuestionComponent } from './question/question.component';

import { TestDetailComponent } from './components/test-detail/test-detail.component';

import { TestListComponent } from './components/test-list/test-list.component';
import { TestQuestionsComponent } from './components/test-questions/test-questions.component';
import { ScoreComponent } from './components/score/score.component';


export const routes: Routes = [

  { path: '', component: HomeComponent },
    
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent},
  { path: 'Question', component: QuestionComponent},
  { path: 'test/:testId', component: TestDetailComponent }, // Route pour afficher un test spécifique
  { path: 'tests', component: TestListComponent }, // Route pour afficher un test spécifique
  { path: 'test/:testId/questions', component: TestQuestionsComponent },
  { path: 'test/:testId/score/:developpeurId', component: ScoreComponent }


];