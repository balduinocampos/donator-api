import { StatusMensagem } from '@/domain/enums';

export class Mensagem {
  id_mensagem?: number;
  id_remetente: number;
  id_destinatario: number;
  id_pedido_entre?: number | null;
  assunto?: string | null;
  conteudo: string;
  status?: StatusMensagem;
  data_envio?: Date;
  data_leitura?: Date | null;

  constructor(props: Omit<Mensagem, 'id_mensagem'>, id_mensagem?: number) {
    Object.assign(this, props);
    if (id_mensagem) this.id_mensagem = id_mensagem;
  }
}
