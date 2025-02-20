import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompromissoService } from '../../services/compromisso.service';
import {CommonModule} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-formulario-compromisso',
  templateUrl: './formulario-compromisso.component.html',
  styleUrls: ['./formulario-compromisso.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class FormularioCompromissoComponent implements OnInit {
  compromissoForm!: FormGroup;
  compromissoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private compromissoService: CompromissoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.compromissoForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: [''],
      dataHoraInicio: ['', Validators.required],
      dataHoraFim: ['', Validators.required]
    });

    // Verifica se há um ID na URL para carregar os dados
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.compromissoId = +id;
        this.carregarCompromisso(this.compromissoId);
      }
    });
  }

  carregarCompromisso(id: number): void {
    this.compromissoService.buscarPorId(id).subscribe({
      next: (compromisso) => {
        this.compromissoForm.patchValue(compromisso);
      },
      error: (error) => {
        console.error("Erro ao buscar compromisso:", error);
      }
    });
  }

  salvarCompromisso(): void {
    if (this.compromissoForm.valid) {
      if (this.compromissoId) {
        // Atualiza o compromisso existente
        this.compromissoService.atualizar(this.compromissoId, this.compromissoForm.value).subscribe(() => {
          alert('Compromisso atualizado com sucesso!');
          this.router.navigate(['/compromissos']);
        });
      } else {
        // Cria um novo compromisso
        this.compromissoService.criar(this.compromissoForm.value).subscribe(() => {
          alert('Compromisso criado com sucesso!');
          this.router.navigate(['/compromissos']);
        });
      }
    }
  }

  /** Método público para permitir a navegação no template */
  navegarParaCompromissos(): void {
    this.router.navigate(['/compromissos']);
  }
}
