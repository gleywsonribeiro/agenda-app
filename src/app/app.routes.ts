import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DetalhesComponent } from './compromissos/detalhes/detalhes.component';
import {ListagemComponent} from "./compromissos/listagem/listagem.component";

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'compromissos', component: ListagemComponent },
  { path: 'compromissos/:id', component: DetalhesComponent },
  { path: '**', redirectTo: 'auth/login' } // Redireciona para login se a rota não existir
];
