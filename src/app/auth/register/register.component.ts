import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {CommonModule} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  erro: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      const { nome, email, senha } = this.registerForm.value;
      this.authService.register(nome, email, senha).subscribe({
        next: (response) => {
          // Supondo que a API retorna um token no response
          //localStorage.setItem('token', response.token);
          this.authService.setAuthenticatedUser(response.token); // Atualiza estado da autenticação
          this.router.navigate(['/compromissos']); // Redireciona para a tela principal
        },
        error: (error) => {
          console.error('Erro ao registrar usuário', error);
        }
      });
    }
  }


  get f(): { [key: string]: any } {
    return this.registerForm.controls;
  }
}
