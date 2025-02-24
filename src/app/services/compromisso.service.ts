import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Compromisso} from "../models/compromisso.model";

@Injectable({
  providedIn: 'root'
})
export class CompromissoService {
  private apiUrl = 'http://localhost:8080/compromissos'; // Ajuste conforme necessário

  constructor(private http: HttpClient) {}

  // Método para obter o token do localStorage e criar os headers da requisição
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage
    if (!token) {
      console.error("Token JWT não encontrado! Usuário não autenticado.");
      return new HttpHeaders(); // Retorna headers vazios para evitar erros
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  listar(): Observable<Compromisso[]> {
    return this.http.get<Compromisso[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  buscarPorId(id: number): Observable<Compromisso> {
    return this.http.get<Compromisso>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  criar(compromisso: Compromisso): Observable<Compromisso> {
    return this.http.post<Compromisso>(this.apiUrl, compromisso, { headers: this.getAuthHeaders() });
  }

  atualizar(id: number, compromisso: Compromisso): Observable<Compromisso> {
    return this.http.put<Compromisso>(`${this.apiUrl}/${id}`, compromisso, { headers: this.getAuthHeaders() });
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
