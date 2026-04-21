import { validations } from "@/lib/zod";
import { StatusMensagem, StatusNotificacao } from '@/domain/enums';

export const CreateMensagemSchema = validations.object({
  id_remetente: validations.number().int().positive(),
  id_destinatario: validations.number().int().positive(),
  id_pedido_entre: validations.number().int().positive().optional(),
  assunto: validations.string().optional(),
  conteudo: validations.string().min(2)
});

export const DispatchNotificacaoSchema = validations.object({
  id_pedido: validations.number().int().positive(),
  id_doador: validations.number().int().positive(),
  mensagem_enviada: validations.string().min(2),
  status_envio: validations.nativeEnum(StatusNotificacao),
  codigo_erro: validations.string().optional()
});
