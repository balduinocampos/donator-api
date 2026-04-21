import { IPedidoDoacaoRepository } from '@/domain/contracts/IPedidoDoacaoRepository';
import { PedidoDoacao } from '@/domain/entities/PedidoDoacao';
import { prisma } from '@/infra/db/connect';

export class PedidoDoacaoRepository implements IPedidoDoacaoRepository {
  async create(data: PedidoDoacao): Promise<PedidoDoacao> {
    const created = await prisma.pedidoDoacao.create({
      data: {
        id_doador: data.id_doador,
        id_hospital: data.id_hospital,
        mensagem: data.mensagem
      }
    });
    return created as unknown as PedidoDoacao;
  }

  async findById(id_pedido_doacao: number): Promise<PedidoDoacao | null> {
    const p = await prisma.pedidoDoacao.findUnique({ where: { id_pedido_doacao } });
    return p as unknown as PedidoDoacao | null;
  }

  async findAllByDoador(id_doador: number): Promise<PedidoDoacao[]> {
    const p = await prisma.pedidoDoacao.findMany({ where: { id_doador } });
    return p as unknown as PedidoDoacao[];
  }

  async findAllByHospital(id_hospital: number): Promise<PedidoDoacao[]> {
    const p = await prisma.pedidoDoacao.findMany({ where: { id_hospital } });
    return p as unknown as PedidoDoacao[];
  }

  async findAll(): Promise<PedidoDoacao[]> {
    const p = await prisma.pedidoDoacao.findMany();
    return p as unknown as PedidoDoacao[];
  }

  async update(id_pedido_doacao: number, data: Partial<PedidoDoacao>): Promise<PedidoDoacao> {
    const updated = await prisma.pedidoDoacao.update({
      where: { id_pedido_doacao },
      data: data as any
    });
    return updated as unknown as PedidoDoacao;
  }

  async delete(id_pedido_doacao: number): Promise<boolean> {
    await prisma.pedidoDoacao.delete({ where: { id_pedido_doacao } });
    return true;
  }
}
