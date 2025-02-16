import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });

  erro: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  login(): void {
    if (this.loginForm.valid) {
      const email: string = this.loginForm.value.email ?? ''; // Garante que não seja undefined
      const senha: string = this.loginForm.value.senha ?? '';

      this.authService.login(email, senha).subscribe({
        next: (response) => {
          this.router.navigate(['/compromissos']); // Redireciona após login
        },
        error: (err) => {
          this.erro = 'Credenciais inválidas. Tente novamente!';
        }
      });
    }
  }
}
