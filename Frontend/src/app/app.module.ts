import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor'; // Importer l'intercepteur
import { ChartdemandeComponent } from './chartdemande/chartdemande/chartdemande.component';
import { ChartsubscribersComponent } from './chartsubscribers/chartsubscribers/chartsubscribers.component';

@NgModule({
 
  imports: [
    BrowserModule,
    HttpClientModule, 
    ChartdemandeComponent,
    ChartsubscribersComponent,

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
