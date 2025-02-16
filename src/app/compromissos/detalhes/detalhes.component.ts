import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompromissoService } from '../../services/compromisso.service';

@Component({
  standalone: true,
  selector: 'app-editar',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit {
  compromissoForm: FormGroup;
  compromissoId: number = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private compromissoService: CompromissoService
  ) {
    this.compromissoForm = this.fb.group({
      titulo: [''],
      data: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.compromissoId = +params['id'];
      this.carregarCompromisso();
    });
  }

  carregarCompromisso(): void {
    this.compromissoService.buscarPorId(this.compromissoId).subscribe(compromisso => {
      this.compromissoForm.patchValue(compromisso);
    });
  }

  salvar(): void {
    this.compromissoService.atualizar(this.compromissoId, this.compromissoForm.value).subscribe(() => {
      this.router.navigate(['/compromissos']);
    });
  }

  voltar(): void {
    this.router.navigate(['/compromissos']);
  }
}
