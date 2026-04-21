import { IMensagemRepository } from '../../domain/contracts/IMensagemRepository';
import { INotificacaoRepository } from '../../domain/contracts/INotificacaoRepository';
import { Mensagem } from '../../domain/entities/Mensagem';
import { Notificacao } from '../../domain/entities/Notificacao';
import {
  CreateMensagemDTO, UpdateMensagemDTO, MensagemResponseDTO,
  CreateNotificacaoDTO, NotificacaoResponseDTO
} from '../../interfaces/dtos/ComunicacaoDTO';

export class ComunicacaoService {
  constructor(
    private mensagemRepository: IMensagemRepository,
    private notificacaoRepository: INotificacaoRepository
  ) {}

  // === MENSAGENS (Entre Hospitais) ===
  async sendMensagem(data: CreateMensagemDTO): Promise<MensagemResponseDTO> {
    const msg = new Mensagem(data);
    const created = await this.mensagemRepository.create(msg);
    return created as MensagemResponseDTO;
  }

  async readMensagem(id: number): Promise<MensagemResponseDTO> {
    // simplified
    const updated = await this.mensagemRepository.update(id, { 
       data_leitura: new Date()
    });
    return updated as MensagemResponseDTO;
  }

  async getInbox(id_hospital: number): Promise<MensagemResponseDTO[]> {
    const msgs = await this.mensagemRepository.findAllByDestinatario(id_hospital);
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
    return result as NotificacaoResponseDTO[];
  }
}
