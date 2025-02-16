import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  nome = '';
  email = '';
  senha = '';
  erro = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  register() {
    this.authService.register(this.nome, this.email, this.senha).subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: () => this.erro = 'Falha no registro. Tente novamente.'
    });
  }
}
