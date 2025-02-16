import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import {HttpClientModule, provideHttpClient, withInterceptors} from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import 'zone.js';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([])), // Aqui está a solução!
    importProvidersFrom(HttpClientModule) // 🔹 Adiciona suporte ao HttpClient
  ]
}).catch(err => console.error(err));
