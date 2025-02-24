// src/app/models/compromisso.model.ts
export class Compromisso {
  constructor(
    public id: number,
    public titulo: string,
    public descricao: string,
    public dataHoraInicio: string,
    public dataHoraFim: string
  ) {}

  // Método para calcular a duração do compromisso
  getDuracao(): number {
    const inicio = new Date(this.dataHoraInicio).getTime();
    const fim = new Date(this.dataHoraFim).getTime();
    return (fim - inicio) / (1000 * 60); // Duração em minutos
  }
}
