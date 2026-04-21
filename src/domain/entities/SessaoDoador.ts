export class SessaoDoador {
  id_sessao: string;
  id_doador: number;
  ip_origem: string;
  user_agent?: string | null;
  data_login?: Date;
  data_expiracao: Date;
  ativo?: boolean;

  constructor(props: Omit<SessaoDoador, 'id_sessao'>, id_sessao: string) {
    Object.assign(this, props);
    this.id_sessao = id_sessao;
  }
}
