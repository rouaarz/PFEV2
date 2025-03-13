import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { QuestionComponent } from './question/question.component';
import { ListQuestionsComponent } from './list-questions/list-questions.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { ActivationCompteComponent } from './activation-compte/activation-compte.component';
import { ComptesActifsComponent } from './comptes-actifs/comptes-actifs.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },
    
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent},
  { path: 'Question', component: QuestionComponent},
  { path: 'List-Question', component: ListQuestionsComponent},
  { path: 'activation-Compte', component: ActivationCompteComponent},
  { path: 'comptes-actifs', component: ComptesActifsComponent },
  { path: 'edit-question/:id', component: EditQuestionComponent }



];