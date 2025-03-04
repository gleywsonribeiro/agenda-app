import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ListagemComponent } from './compromissos/listagem/listagem.component';
import { AuthGuard } from './auth/auth.guard';
import {LayoutPrincipalComponent} from "./layout-principal/layout-principal.component";
import {FormularioCompromissoComponent} from "./compromissos/criar/formulario-compromisso.component";
import {CalendarioComponent} from "./compromissos/calendario/calendario.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutPrincipalComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'compromissos', component: ListagemComponent },
      { path: 'compromissos/criar', component: FormularioCompromissoComponent },
      { path: 'compromissos/editar/:id', component: FormularioCompromissoComponent },
      { path: 'compromissos/calendario', component: CalendarioComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'login' }
];

