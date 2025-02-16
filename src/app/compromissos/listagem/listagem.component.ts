import { Component, OnInit } from '@angular/core';
import { CompromissoService } from '../../services/compromisso.service';
import { Router } from '@angular/router';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule, DatePipe} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'],
  imports: [CommonModule, DatePipe],
})
export class ListagemComponent implements OnInit {
  compromissos: any[] = [];
  compromissoIdParaExcluir: number | null = null;

  constructor(
    private compromissoService: CompromissoService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.carregarCompromissos();
  }

  carregarCompromissos(): void {
    this.compromissoService.listar().subscribe((dados) => {
      this.compromissos = dados;
    });
  }

  editar(compromisso: any): void {
    this.router.navigate(['compromissos/editar', compromisso.id]);
  }

  abrirModal(content: any, compromissoId: number): void {
    this.compromissoIdParaExcluir = compromissoId;
    this.modalService.open(content, { centered: true });
  }

  confirmarExclusao(): void {
    if (this.compromissoIdParaExcluir !== null) {
      this.compromissoService.excluir(this.compromissoIdParaExcluir).subscribe(() => {
        this.carregarCompromissos();
      });
    }
  }

  /** Método público para navegação */
  navegarParaCriar(): void {
    this.router.navigate(['/compromissos/criar']);
  }
}
