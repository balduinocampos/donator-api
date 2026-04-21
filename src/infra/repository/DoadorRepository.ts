import { IDoadorRepository } from '@/domain/contracts/IDoadorRepository';
import { Doador } from '@/domain/entities/Doador';
import { prisma } from '@/infra/db/connect';
import { TipoSanguineo, StatusDoador } from '@prisma/client';

export class DoadorRepository implements IDoadorRepository {
  async create(data: Doador): Promise<Doador> {
    const created = await prisma.doador.create({
      data: {
        nome_completo: data.nome_completo,
        telefone: data.telefone,
        email: data.email,
        senha_hash: data.senha_hash,
        tipo_sanguineo: data.tipo_sanguineo as unknown as TipoSanguineo,
        id_municipio: data.id_municipio,
        data_nascimento: data.data_nascimento,
        consentimento_sms: data.consentimento_sms,
        status: data.status as unknown as StatusDoador
      }
    });
    return created as unknown as Doador;
  }

  async findById(id_doador: number): Promise<Doador | null> {
    const d = await prisma.doador.findUnique({ where: { id_doador } });
    return d as unknown as Doador | null;
  }

  async findByEmail(email: string): Promise<Doador | null> {
    const d = await prisma.doador.findUnique({ where: { email } });
    return d as unknown as Doador | null;
  }

  async findByTelefone(telefone: string): Promise<Doador | null> {
    const d = await prisma.doador.findUnique({ where: { telefone } });
    return d as unknown as Doador | null;
  }

  async findAll(): Promise<Doador[]> {
    const ds = await prisma.doador.findMany();
    return ds as unknown as Doador[];
  }

  async update(id_doador: number, data: Partial<Doador>): Promise<Doador> {
    const updated = await prisma.doador.update({
      where: { id_doador },
      data: data as any
    });
    return updated as unknown as Doador;
  }

  async delete(id_doador: number): Promise<boolean> {
    await prisma.doador.delete({ where: { id_doador } });
    return true;
  }
}
