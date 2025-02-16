import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ListagemComponent } from './compromissos/listagem/listagem.component';
import { AuthGuard } from './auth/auth.guard';
import {LayoutPrincipalComponent} from "./layout-principal/layout-principal.component";
import {CriarCompromissoComponent} from "./compromissos/criar/criar.component";


export const routes: Routes = [
  {
    path: '',
    component: LayoutPrincipalComponent, // Aplica o layout com menu lateral
    canActivate: [AuthGuard], // Protege a rota
    children: [
      { path: 'compromissos', component: ListagemComponent }
    ]
  },
  { path: 'compromissos/criar', component: CriarCompromissoComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }, // Login sem menu
  { path: 'register', component: RegisterComponent }, // Registro sem menu
  { path: '**', redirectTo: 'login' } // Redireciona para login se rota inválida
];
