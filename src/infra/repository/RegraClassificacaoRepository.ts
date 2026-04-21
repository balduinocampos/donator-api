import { IRegraClassificacaoRepository } from '@/domain/contracts/IRegraClassificacaoRepository';
import { RegraClassificacao } from '@/domain/entities/RegraClassificacao';
import { prisma } from '@/infra/db/connect';

export class RegraClassificacaoRepository implements IRegraClassificacaoRepository {
  async create(data: RegraClassificacao): Promise<RegraClassificacao> {
    const created = await prisma.regraClassificacao.create({
      data: {
        nome_nivel: data.nome_nivel,
        pontuacao_minima: data.pontuacao_minima,
        pontuacao_maxima: data.pontuacao_maxima
      }
    });
    return created as RegraClassificacao;
  }

  async findById(id_regra: number): Promise<RegraClassificacao | null> {
    const r = await prisma.regraClassificacao.findUnique({ where: { id_regra } });
    return r as RegraClassificacao | null;
  }

  async findAll(): Promise<RegraClassificacao[]> {
    const r = await prisma.regraClassificacao.findMany();
    return r as RegraClassificacao[];
  }

  async update(id_regra: number, data: Partial<RegraClassificacao>): Promise<RegraClassificacao> {
    const updated = await prisma.regraClassificacao.update({
      where: { id_regra },
      data
    });
    return updated as RegraClassificacao;
  }

  async delete(id_regra: number): Promise<boolean> {
    await prisma.regraClassificacao.delete({ where: { id_regra } });
    return true;
  }
}
