import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ListaComponent } from './compromissos/lista/lista.component';
import { DetalhesComponent } from './compromissos/detalhes/detalhes.component';

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'compromissos', component: ListaComponent },
  { path: 'compromissos/:id', component: DetalhesComponent },
  { path: '**', redirectTo: 'auth/login' } // Redireciona para login se a rota não existir
];
