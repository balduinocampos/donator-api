export class LogAcesso {
  id_log?: number;
  id_hospital?: number | null;
  id_doador?: number | null;
  acao: string;
  descricao: string;
  ip_origem: string;
  data_hora?: Date;

  constructor(props: Omit<LogAcesso, 'id_log'>, id_log?: number) {
    Object.assign(this, props);
    if (id_log) this.id_log = id_log;
  }
}
