import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-layout-principal',
  templateUrl: './layout-principal.component.html',
  styleUrls: ['./layout-principal.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class LayoutPrincipalComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
