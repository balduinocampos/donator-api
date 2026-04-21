import { IMunicipioRepository } from '@/domain/contracts/IMunicipioRepository';
import { Municipio } from '@/domain/entities/Municipio';
import { prisma } from '@/infra/db/connect';

export class MunicipioRepository implements IMunicipioRepository {
  async create(data: Municipio): Promise<Municipio> {
    const created = await prisma.municipio.create({
      data: {
        id_provincia: data.id_provincia,
        nome: data.nome
      }
    });
    return created as Municipio;
  }

  async findById(id_municipio: number): Promise<Municipio | null> {
    const m = await prisma.municipio.findUnique({ where: { id_municipio } });
    return m as Municipio | null;
  }

  async findAll(): Promise<Municipio[]> {
    const md = await prisma.municipio.findMany();
    return md as Municipio[];
  }

  async update(id_municipio: number, data: Partial<Municipio>): Promise<Municipio> {
    const updated = await prisma.municipio.update({
      where: { id_municipio },
      data
    });
    return updated as Municipio;
  }

  async delete(id_municipio: number): Promise<boolean> {
    await prisma.municipio.delete({ where: { id_municipio } });
    return true;
  }
}
