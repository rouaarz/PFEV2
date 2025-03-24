import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor'; // Importer l'intercepteur

@NgModule({
 
  imports: [
    BrowserModule,
    HttpClientModule, // Assurez-vous que HttpClientModule est importé
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, // Utilisation de l'intercepteur
      multi: true
    }
  ],
  bootstrap: []
})
export class AppModule { }
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatStepperModule } from '@angular/material/stepper';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { FormsModule } from '@angular/forms';
// import { AppComponent } from './app.component';
// import { AuthInterceptor } from './interceptors/auth.interceptor'; // Importer l'intercepteur
// import { ChartdemandeComponent } from './chartdemande/chartdemande/chartdemande.component';
// import { ChartsubscribersComponent } from './chartsubscribers/chartsubscribers.component';
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// @NgModule({
//   declarations: [ 
//     AppComponent,
//     ChartdemandeComponent,
//     ChartsubscribersComponent
//   ],
//   imports: [
//     BrowserModule,
//     HttpClientModule,
//     BrowserAnimationsModule,
//     MatStepperModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     FormsModule
//   ],
//   providers: [
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: AuthInterceptor, // Utilisation de l'intercepteur
//       multi: true
//     }
//   ],
//   bootstrap: [AppComponent] // Démarrer avec AppComponent
// })
// export class AppModule { }
