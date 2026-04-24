import { IMensagemRepository } from '@/domain/contracts/IMensagemRepository';
import { INotificacaoRepository } from '@/domain/contracts/INotificacaoRepository';
import { Mensagem } from '@/domain/entities/Mensagem';
import { Notificacao } from '@/domain/entities/Notificacao';
import {
  CreateMensagemDTO, UpdateMensagemDTO, MensagemResponseDTO,
  CreateNotificacaoDTO, NotificacaoResponseDTO
} from '@/interfaces/dtos/ComunicacaoDTO';
import { socketService } from "@/infra/services/socket/socket.io";
import { AppError } from '@/shared/error';

export class ComunicacaoService {
  constructor(
    private mensagemRepository: IMensagemRepository,
    private notificacaoRepository: INotificacaoRepository
  ) {}

  // === MENSAGENS (Entre Hospitais) ===
  async sendMensagem(data: CreateMensagemDTO): Promise<MensagemResponseDTO> {
    const msg = new Mensagem(data);

    const mensagemCriada = await this.mensagemRepository.create(msg);

    socketService.sendMessage(
      `user_${data.id_destinatario}`, 
      'nova_mensagem', 
      mensagemCriada
    );

    return mensagemCriada as MensagemResponseDTO;
  }

  async readMensagem(id: number): Promise<MensagemResponseDTO> {
    // simplified
    const updated = await this.mensagemRepository.update(id, { 
       data_leitura: new Date()
    });
    return updated as MensagemResponseDTO;
  }

  async getSentMessages(id_hospital: number): Promise<MensagemResponseDTO[]> {
    const msgs = await this.mensagemRepository.findAllByRemetente(id_hospital);
    if (!msgs.length) throw AppError.notFound('No sent messages found for this hospital');
    return msgs as MensagemResponseDTO[];
  }
  
  async getReceivedMessages(id_hospital: number): Promise<MensagemResponseDTO[]> {  

    const msgs = await this.mensagemRepository.findAllByDestinatario(id_hospital);
    if (!msgs.length) throw AppError.notFound('No received messages found for this hospital');
    return msgs as MensagemResponseDTO[];
  }

  async deleteMensagem(id: number): Promise<boolean> {
    return await this.mensagemRepository.delete(id);
  }

  async getAllMessages(): Promise<MensagemResponseDTO[]> {
    const msgs = await this.mensagemRepository.findAll();
    if (!msgs.length) throw AppError.notFound('No messages found');
    return msgs as MensagemResponseDTO[];
  }

  // === NOTIFICAÇÕES (Sistema/SMS -> Doador) ===
  async dispatchNotificacao(data: CreateNotificacaoDTO): Promise<NotificacaoResponseDTO> {
    const notif = new Notificacao(data);
    const created = await this.notificacaoRepository.create(notif);
    return created as NotificacaoResponseDTO;
  }

  async getNotificacoesDoador(id_doador: number): Promise<NotificacaoResponseDTO[]> {
    const result = await this.notificacaoRepository.findAllByDoador(id_doador);
    if (!result.length) throw AppError.notFound('No notifications found for this doador');
    return result as NotificacaoResponseDTO[];
  }

  async getNotificacoesPedido(id_pedido: number): Promise<NotificacaoResponseDTO[]> {
    const result = await this.notificacaoRepository.findAllByPedido(id_pedido);
    if (!result.length) throw AppError.notFound('No notifications found for this pedido');
    return result as NotificacaoResponseDTO[];
  }

  async deleteNotificacao(id: number): Promise<boolean> {
    return await this.notificacaoRepository.delete(id);
  }

  async getAllNotificacoes(): Promise<NotificacaoResponseDTO[]> {
    const result = await this.notificacaoRepository.findAll();
    if (!result.length) throw AppError.notFound('No notifications found');
    return result as NotificacaoResponseDTO[];
  }
}
