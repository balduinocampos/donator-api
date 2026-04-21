import { TipoSanguineo, StatusPedidoEntreHospitais } from '../enums';

export class PedidoEntreHospitais {
  id_pedido_entre?: number;
  id_solicitante: number;
  id_fornecedor: number;
  tipo_sanguineo: TipoSanguineo;
  quantidade_bolsas: number;
  status?: StatusPedidoEntreHospitais;
  motivo_rejeicao?: string | null;
  data_solicitacao?: Date;
  data_resposta?: Date | null;

  constructor(props: Omit<PedidoEntreHospitais, 'id_pedido_entre'>, id_pedido_entre?: number) {
    Object.assign(this, props);
    if (id_pedido_entre) this.id_pedido_entre = id_pedido_entre;
  }
}
