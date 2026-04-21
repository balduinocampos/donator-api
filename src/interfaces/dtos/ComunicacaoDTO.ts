import { StatusMensagem, StatusNotificacao } from '../../domain/enums';

// Mensagem
export interface CreateMensagemDTO {
  id_remetente: number;
  id_destinatario: number;
  id_pedido_entre?: number | null;
  assunto?: string | null;
  conteudo: string;
}

export interface UpdateMensagemDTO {
  status?: StatusMensagem;
  data_leitura?: Date | null;
}

export interface MensagemResponseDTO {
  id_mensagem: number;
  id_remetente: number;
  id_destinatario: number;
  id_pedido_entre?: number | null;
  assunto?: string | null;
  conteudo: string;
  status: StatusMensagem;
  data_envio: Date;
  data_leitura?: Date | null;
}

// Notificacao
export interface CreateNotificacaoDTO {
  id_pedido: number;
  id_doador: number;
  mensagem_enviada: string;
  status_envio: StatusNotificacao;
  codigo_erro?: string | null;
}

export interface NotificacaoResponseDTO {
  id_notificacao: number;
  id_pedido: number;
  id_doador: number;
  mensagem_enviada: string;
  data_envio: Date;
  status_envio: StatusNotificacao;
  codigo_erro?: string | null;
}
