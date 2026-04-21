import { INotificacaoRepository } from '@/domain/contracts/INotificacaoRepository';
import { Notificacao } from '@/domain/entities/Notificacao';
import { prisma } from '@/infra/db/connect';


export class NotificacaoRepository implements INotificacaoRepository {
  async create(data: Notificacao): Promise<Notificacao> {
    const created = await prisma.notificacao.create({
      data: {
        id_pedido: data.id_pedido,
        id_doador: data.id_doador,
        mensagem_enviada: data.mensagem_enviada,
        status_envio: data.status_envio as any,
        codigo_erro: data.codigo_erro
      }
    });
    return created as unknown as Notificacao;
  }

  async findById(id_notificacao: number): Promise<Notificacao | null> {
    const n = await prisma.notificacao.findUnique({ where: { id_notificacao } });
    return n as unknown as Notificacao | null;
  }

  async findAllByDoador(id_doador: number): Promise<Notificacao[]> {
    const n = await prisma.notificacao.findMany({ where: { id_doador } });
    return n as unknown as Notificacao[];
  }

  async findAllByPedido(id_pedido: number): Promise<Notificacao[]> {
    const n = await prisma.notificacao.findMany({ where: { id_pedido } });
    return n as unknown as Notificacao[];
  }

  async findAll(): Promise<Notificacao[]> {
    const n = await prisma.notificacao.findMany();
    return n as unknown as Notificacao[];
  }

  async update(id_notificacao: number, data: Partial<Notificacao>): Promise<Notificacao> {
    const updated = await prisma.notificacao.update({
      where: { id_notificacao },
      data: data as any
    });
    return updated as unknown as Notificacao;
  }

  async delete(id_notificacao: number): Promise<boolean> {
    await prisma.notificacao.delete({ where: { id_notificacao } });
    return true;
  }
}
