import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    FormsModule, CommonModule
  ]
})
export class LoginComponent {
  email = '';
  senha = '';
  erro = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    this.authService.login(this.email, this.senha).subscribe({
      next: () => this.router.navigate(['/compromissos']),
      error: (err) => this.erro = 'Login falhou. Verifique suas credenciais.'
    });
  }
}
