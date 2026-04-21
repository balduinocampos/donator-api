import { ISessaoAdminRepository } from '@/domain/contracts/ISessaoAdminRepository';
import { SessaoAdmin } from '@/domain/entities/SessaoAdmin';
import { prisma } from '@/infra/db/connect';

export class SessaoAdminRepository implements ISessaoAdminRepository {
  async create(data: SessaoAdmin): Promise<SessaoAdmin> {
    const created = await prisma.sessaoAdmin.create({
      data: {
        id_sessao: data.id_sessao,
        id_hospital: data.id_hospital,
        ip_origem: data.ip_origem,
        user_agent: data.user_agent,
        data_expiracao: data.data_expiracao,
        ativo: data.ativo
      }
    });
    return created as SessaoAdmin;
  }

  async findById(id_sessao: string): Promise<SessaoAdmin | null> {
    const s = await prisma.sessaoAdmin.findUnique({ where: { id_sessao } });
    return s as SessaoAdmin | null;
  }

  async findAllByHospital(id_hospital: number): Promise<SessaoAdmin[]> {
    const s = await prisma.sessaoAdmin.findMany({ where: { id_hospital } });
    return s as SessaoAdmin[];
  }

  async findAll(): Promise<SessaoAdmin[]> {
    const s = await prisma.sessaoAdmin.findMany();
    return s as SessaoAdmin[];
  }

  async update(id_sessao: string, data: Partial<SessaoAdmin>): Promise<SessaoAdmin> {
    const updated = await prisma.sessaoAdmin.update({
      where: { id_sessao },
      data
    });
    return updated as SessaoAdmin;
  }

  async delete(id_sessao: string): Promise<boolean> {
    await prisma.sessaoAdmin.delete({ where: { id_sessao } });
    return true;
  }
}
