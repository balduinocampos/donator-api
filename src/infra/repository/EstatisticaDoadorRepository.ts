import { IEstatisticaDoadorRepository } from '@/domain/contracts/IEstatisticaDoadorRepository';
import { EstatisticaDoador } from '@/domain/entities/EstatisticaDoador';
import { prisma } from '@/infra/db/connect';

export class EstatisticaDoadorRepository implements IEstatisticaDoadorRepository {
  async create(data: EstatisticaDoador): Promise<EstatisticaDoador> {
    const created = await prisma.estatisticaDoador.create({
      data: {
        id_doador: data.id_doador,
        total_doacoes: data.total_doacoes || 0,
        vidas_salvas: data.vidas_salvas || 0,
        total_centros: data.total_centros || 0,
        pontuacao: data.pontuacao || 0
      }
    });
    return created as EstatisticaDoador;
  }

  async findById(id_estatistica: number): Promise<EstatisticaDoador | null> {
    const e = await prisma.estatisticaDoador.findUnique({ where: { id_estatistica } });
    return e as EstatisticaDoador | null;
  }

  async findByDoador(id_doador: number): Promise<EstatisticaDoador | null> {
    const e = await prisma.estatisticaDoador.findUnique({ where: { id_doador } });
    return e as EstatisticaDoador | null;
  }

  async findAll(): Promise<EstatisticaDoador[]> {
    const e = await prisma.estatisticaDoador.findMany();
    return e as EstatisticaDoador[];
  }

  async update(id_estatistica: number, data: Partial<EstatisticaDoador>): Promise<EstatisticaDoador> {
    const updated = await prisma.estatisticaDoador.update({
      where: { id_estatistica },
      data
    });
    return updated as EstatisticaDoador;
  }

  async delete(id_estatistica: number): Promise<boolean> {
    await prisma.estatisticaDoador.delete({ where: { id_estatistica } });
    return true;
  }
}
