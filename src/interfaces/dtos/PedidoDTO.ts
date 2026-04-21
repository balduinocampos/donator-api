import { TipoSanguineo, NivelUrgencia, StatusPedido, StatusPedidoDoacao, StatusPedidoEntreHospitais } from '@/domain/enums';

// Pedido (Hospital para SMS)
export interface CreatePedidoDTO {
  id_hospital: number;
  tipo_sanguineo_necessario: TipoSanguineo;
  quantidade_necessaria?: number;
  id_municipio_pedido: number;
  contacto_referencia: string;
  nivel_urgencia: NivelUrgencia;
  mensagem_adicional?: string | null;
}

export interface UpdatePedidoDTO {
  status_pedido?: StatusPedido;
  data_fechamento?: Date | null;
  total_notificados?: number;
}

export interface PedidoResponseDTO {
  id_pedido: number;
  id_hospital: number;
  tipo_sanguineo_necessario: TipoSanguineo;
  quantidade_necessaria: number;
  id_municipio_pedido: number;
  contacto_referencia: string;
  nivel_urgencia: NivelUrgencia;
  mensagem_adicional?: string | null;
  data_pedido: Date;
  data_fechamento?: Date | null;
  status_pedido: StatusPedido;
  total_notificados: number;
}

// Pedido Doacao (Doador para Hospital)
export interface CreatePedidoDoacaoDTO {
  id_doador: number;
  id_hospital: number;
  mensagem?: string | null;
}

export interface UpdatePedidoDoacaoDTO {
  status?: StatusPedidoDoacao;
  motivo_rejeicao?: string | null;
  data_resposta?: Date | null;
}

export interface PedidoDoacaoResponseDTO {
  id_pedido_doacao: number;
  id_doador: number;
  id_hospital: number;
  mensagem?: string | null;
  status: StatusPedidoDoacao;
  motivo_rejeicao?: string | null;
  data_solicitacao: Date;
  data_resposta?: Date | null;
}

// Pedido Entre Hospitais
export interface CreatePedidoEntreHospitaisDTO {
  id_solicitante: number;
  id_fornecedor: number;
  tipo_sanguineo: TipoSanguineo;
  quantidade_bolsas: number;
}

export interface UpdatePedidoEntreHospitaisDTO {
  status?: StatusPedidoEntreHospitais;
  motivo_rejeicao?: string | null;
  data_resposta?: Date | null;
}

export interface PedidoEntreHospitaisResponseDTO {
  id_pedido_entre: number;
  id_solicitante: number;
  id_fornecedor: number;
  tipo_sanguineo: TipoSanguineo;
  quantidade_bolsas: number;
  status: StatusPedidoEntreHospitais;
  motivo_rejeicao?: string | null;
  data_solicitacao: Date;
  data_resposta?: Date | null;
}
