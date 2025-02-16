import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompromissoService } from '../../services/compromisso.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-criar-compromisso',
  templateUrl: './criar.component.html',
  styleUrls: ['./criar.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class CriarCompromissoComponent {
  compromissoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private compromissoService: CompromissoService,
    private router: Router
  ) {
    this.compromissoForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      dataHoraInicio: ['', Validators.required],
      dataHoraFim: ['', Validators.required]
    });
  }

  criarCompromisso(): void {
    if (this.compromissoForm.valid) {
      this.compromissoService.criar(this.compromissoForm.value).subscribe(() => {
        alert('Compromisso criado com sucesso!');
        this.router.navigate(['/compromissos']);
      });
    }
  }

  /** Método público para permitir a navegação no template */
  navegarParaCompromissos(): void {
    this.router.navigate(['/compromissos']);
  }
}
