import { StatusNotificacao } from '../enums';

export class Notificacao {
  id_notificacao?: number;
  id_pedido: number;
  id_doador: number;
  mensagem_enviada: string;
  data_envio?: Date;
  status_envio: StatusNotificacao;
  codigo_erro?: string | null;

  constructor(props: Omit<Notificacao, 'id_notificacao'>, id_notificacao?: number) {
    Object.assign(this, props);
    if (id_notificacao) this.id_notificacao = id_notificacao;
  }
}
