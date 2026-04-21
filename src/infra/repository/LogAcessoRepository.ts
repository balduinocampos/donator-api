import { ILogAcessoRepository } from '@/domain/contracts/ILogAcessoRepository';
import { LogAcesso } from '@/domain/entities/LogAcesso';
import { prisma } from '@/infra/db/connect';

export class LogAcessoRepository implements ILogAcessoRepository {
  async create(data: LogAcesso): Promise<LogAcesso> {
    const created = await prisma.logAcesso.create({
      data: {
        id_hospital: data.id_hospital,
        id_doador: data.id_doador,
        acao: data.acao,
        descricao: data.descricao,
        ip_origem: data.ip_origem
      }
    });
    return created as LogAcesso;
  }

  async findById(id_log: number): Promise<LogAcesso | null> {
    const l = await prisma.logAcesso.findUnique({ where: { id_log } });
    return l as LogAcesso | null;
  }

  async findAllByHospital(id_hospital: number): Promise<LogAcesso[]> {
    const l = await prisma.logAcesso.findMany({ where: { id_hospital } });
    return l as LogAcesso[];
  }

  async findAllByDoador(id_doador: number): Promise<LogAcesso[]> {
    const l = await prisma.logAcesso.findMany({ where: { id_doador } });
    return l as LogAcesso[];
  }

  async findAll(): Promise<LogAcesso[]> {
    const l = await prisma.logAcesso.findMany();
    return l as LogAcesso[];
  }

  async update(id_log: number, data: Partial<LogAcesso>): Promise<LogAcesso> {
    const updated = await prisma.logAcesso.update({
      where: { id_log },
      data
    });
    return updated as LogAcesso;
  }

  async delete(id_log: number): Promise<boolean> {
    await prisma.logAcesso.delete({ where: { id_log } });
    return true;
  }
}
