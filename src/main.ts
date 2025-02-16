/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import {HttpClientModule, provideHttpClient, withInterceptors} from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import 'zone.js';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule), // 🔹 Adiciona suporte ao BrowserAnimationsModule
    provideHttpClient(withInterceptors([])), // Aqui está a solução!
    importProvidersFrom(HttpClientModule) // 🔹 Adiciona suporte ao HttpClient
  ]
}).catch(err => console.error(err));
