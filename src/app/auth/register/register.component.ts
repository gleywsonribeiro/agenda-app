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
        next: () => {
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['/login']);
        },
        error: err => {
          this.erro = err.error.message || 'Erro ao registrar. Tente novamente.';
        }
      });
    }
  }

  get f(): { [key: string]: any } {
    return this.registerForm.controls;
  }
}
