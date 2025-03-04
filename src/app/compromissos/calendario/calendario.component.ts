import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CompromissoService } from '../../services/compromisso.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
  imports: [CommonModule, FullCalendarModule],
})
export class CalendarioComponent implements OnInit {
  calendarOptions: any = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    editable: true,
    selectable: true,
    events: [],
    dateClick: this.abrirFormularioCriacao.bind(this), // Permite clicar em uma data para criar evento
    eventClick: this.editarCompromisso.bind(this) // Permite clicar no evento para editar
  };

  constructor(
    private compromissoService: CompromissoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarCompromissos();
  }

  carregarCompromissos(): void {
    this.compromissoService.listar().subscribe(compromissos => {
      this.calendarOptions.events = compromissos.map(c => ({
        id: c.id,
        title: c.titulo,
        start: c.dataHoraInicio,
        end: c.dataHoraFim
      }));
    });
  }

  abrirFormularioCriacao(info: any): void {
    this.router.navigate(['/compromissos/criar'], { queryParams: { dataInicio: info.dateStr } });
  }

  editarCompromisso(info: any): void {
    this.router.navigate(['/compromissos/editar', info.event.id]);
  }
}
