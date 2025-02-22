import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {Router, RouterModule} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-layout-principal',
  templateUrl: './layout-principal.component.html',
  styleUrls: ['./layout-principal.component.scss'],
  imports: [RouterModule]
})
export class LayoutPrincipalComponent implements OnInit {
  usuario: any = null; // Armazena os dados do usuário logado

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuarioLogado();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
