export class HistoricoDoacao {
  id_historico?: number;
  id_doador: number;
  id_hospital: number;
  data_doacao: Date;
  observacao?: string | null;

  constructor(props: Omit<HistoricoDoacao, 'id_historico'>, id_historico?: number) {
    Object.assign(this, props);
    if (id_historico) this.id_historico = id_historico;
  }
}
