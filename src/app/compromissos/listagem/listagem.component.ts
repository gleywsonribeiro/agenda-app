import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CompromissoService} from "../../services/compromisso.service";
import {Router} from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';


@Component({
  standalone: true,
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'],
  imports: [CommonModule, MatButtonModule, MatTableModule, MatIconModule],
  providers: [CompromissoService]
})
export class ListagemComponent implements OnInit {
  displayedColumns: string[] = ['titulo', 'data', 'acoes']; // Define as colunas
  compromissos: any[] = [];

  constructor(private compromissoService: CompromissoService, private router:Router) {}

  ngOnInit(): void {
    this.carregarCompromissos();
  }

  carregarCompromissos(): void {
    this.compromissoService.listar().subscribe((dados) => {
      this.compromissos = dados;
    });
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir este compromisso?')) {
      this.compromissoService.excluir(id).subscribe(() => {
        this.carregarCompromissos();
      });
    }
  }

  editar(compromisso: any): void {
    this.router.navigate(['/compromissos/editar', compromisso.id]);
  }
}
