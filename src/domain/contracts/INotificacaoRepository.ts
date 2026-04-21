import { Notificacao } from '@/domain/entities/Notificacao';

export interface INotificacaoRepository {
  create(data: Notificacao): Promise<Notificacao>;
  findById(id_notificacao: number): Promise<Notificacao | null>;
  findAllByDoador(id_doador: number): Promise<Notificacao[]>;
  findAllByPedido(id_pedido: number): Promise<Notificacao[]>;
  findAll(): Promise<Notificacao[]>;
  update(id_notificacao: number, data: Partial<Notificacao>): Promise<Notificacao>;
  delete(id_notificacao: number): Promise<boolean>;
}
