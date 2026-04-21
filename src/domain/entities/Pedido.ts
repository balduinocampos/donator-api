import { TipoSanguineo, NivelUrgencia, StatusPedido } from '../enums';

export class Pedido {
  id_pedido?: number;
  id_hospital: number;
  tipo_sanguineo_necessario: TipoSanguineo;
  quantidade_necessaria?: number;
  id_municipio_pedido: number;
  contacto_referencia: string;
  nivel_urgencia: NivelUrgencia;
  mensagem_adicional?: string | null;
  data_pedido?: Date;
  data_fechamento?: Date | null;
  status_pedido?: StatusPedido;
  total_notificados?: number;

  constructor(props: Omit<Pedido, 'id_pedido'>, id_pedido?: number) {
    Object.assign(this, props);
    if (id_pedido) this.id_pedido = id_pedido;
  }
}
