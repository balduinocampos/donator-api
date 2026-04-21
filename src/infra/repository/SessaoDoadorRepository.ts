import { ISessaoDoadorRepository } from '@/domain/contracts/ISessaoDoadorRepository';
import { SessaoDoador } from '@/domain/entities/SessaoDoador';
import { prisma } from '@/infra/db/connect';

export class SessaoDoadorRepository implements ISessaoDoadorRepository {
  async create(data: SessaoDoador): Promise<SessaoDoador> {
    const created = await prisma.sessaoDoador.create({
      data: {
        id_sessao: data.id_sessao,
        id_doador: data.id_doador,
        ip_origem: data.ip_origem,
        user_agent: data.user_agent,
        data_expiracao: data.data_expiracao,
        ativo: data.ativo
      }
    });
    return created as SessaoDoador;
  }

  async findById(id_sessao: string): Promise<SessaoDoador | null> {
    const s = await prisma.sessaoDoador.findUnique({ where: { id_sessao } });
    return s as SessaoDoador | null;
  }

  async findAllByDoador(id_doador: number): Promise<SessaoDoador[]> {
    const s = await prisma.sessaoDoador.findMany({ where: { id_doador } });
    return s as SessaoDoador[];
  }

  async findAll(): Promise<SessaoDoador[]> {
    const s = await prisma.sessaoDoador.findMany();
    return s as SessaoDoador[];
  }

  async update(id_sessao: string, data: Partial<SessaoDoador>): Promise<SessaoDoador> {
    const updated = await prisma.sessaoDoador.update({
      where: { id_sessao },
      data
    });
    return updated as SessaoDoador;
  }

  async delete(id_sessao: string): Promise<boolean> {
    await prisma.sessaoDoador.delete({ where: { id_sessao } });
    return true;
  }
}
