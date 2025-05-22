
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor'; // Importer l'intercepteur
import { ChartdemandeComponent } from './chartdemande/chartdemande/chartdemande.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ReviewTestComponent} from './components/review/review-test-component/review-test-component.component';
import{QuestionDisplayComponent}from './components/review/question-display/question-display.component'
import { BaseChartDirective } from 'ng2-charts';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


import{ResultGraphComponent} from './components/review/result-graph/result-graph.component'
@NgModule({
  
  imports: [
    BrowserModule,
    NgbModalModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ChartdemandeComponent,
    ReviewTestComponent,
    QuestionDisplayComponent,
    BaseChartDirective,
    ResultGraphComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, // Utilisation de l'intercepteur
      multi: true
    }
  ],
  bootstrap: [] // Démarrer avec AppComponent
})
export class AppModule { }
