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
