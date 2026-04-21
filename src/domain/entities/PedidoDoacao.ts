import { StatusPedidoDoacao } from '../enums';

export class PedidoDoacao {
  id_pedido_doacao?: number;
  id_doador: number;
  id_hospital: number;
  mensagem?: string | null;
  status?: StatusPedidoDoacao;
  motivo_rejeicao?: string | null;
  data_solicitacao?: Date;
  data_resposta?: Date | null;

  constructor(props: Omit<PedidoDoacao, 'id_pedido_doacao'>, id_pedido_doacao?: number) {
    Object.assign(this, props);
    if (id_pedido_doacao) this.id_pedido_doacao = id_pedido_doacao;
  }
}
