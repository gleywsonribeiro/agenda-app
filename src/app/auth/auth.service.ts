import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // URL do backend

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, senha }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  register(nome: string, email: string, senha: string): Observable<any> {
    // Por enquanto passamos a role fixo, mas em um sistema real você deve ter um controle de roles
    return this.http.post<any>(`${this.apiUrl}/register`, { nome, email, senha, role: 'USER' });
  }

  setAuthenticatedUser(token: string): void {
    localStorage.setItem('token', token);
  }


  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsuarioLogado(): any {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o JWT
    return { nome: payload.nome, email: payload.sub }; // Ajuste conforme seu payload
  }

}
