import { IHistoricoDoacaoRepository } from '@/domain/contracts/IHistoricoDoacaoRepository';
import { HistoricoDoacao } from '@/domain/entities/HistoricoDoacao';
import { prisma } from '@/infra/db/connect';

export class HistoricoDoacaoRepository implements IHistoricoDoacaoRepository {
  async create(data: HistoricoDoacao): Promise<HistoricoDoacao> {
    const created = await prisma.historicoDoacao.create({
      data: {
        id_doador: data.id_doador,
        id_hospital: data.id_hospital,
        data_doacao: data.data_doacao,
        observacao: data.observacao
      }
    });
    return created as HistoricoDoacao;
  }

  async findById(id_historico: number): Promise<HistoricoDoacao | null> {
    const h = await prisma.historicoDoacao.findUnique({ where: { id_historico } });
    return h as HistoricoDoacao | null;
  }

  async findAllByDoador(id_doador: number): Promise<HistoricoDoacao[]> {
    const h = await prisma.historicoDoacao.findMany({ where: { id_doador } });
    return h as HistoricoDoacao[];
  }

  async findAll(): Promise<HistoricoDoacao[]> {
    const h = await prisma.historicoDoacao.findMany();
    return h as HistoricoDoacao[];
  }

  async update(id_historico: number, data: Partial<HistoricoDoacao>): Promise<HistoricoDoacao> {
    const updated = await prisma.historicoDoacao.update({
      where: { id_historico },
      data
    });
    return updated as HistoricoDoacao;
  }

  async delete(id_historico: number): Promise<boolean> {
    await prisma.historicoDoacao.delete({ where: { id_historico } });
    return true;
  }
}
