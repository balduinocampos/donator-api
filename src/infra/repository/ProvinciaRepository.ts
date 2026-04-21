import { IProvinciaRepository } from '@/domain/contracts/IProvinciaRepository';
import { Provincia } from '@/domain/entities/Provincia';
import { prisma } from '@/infra/db/connect';

export class ProvinciaRepository implements IProvinciaRepository {
  async create(data: Provincia): Promise<Provincia> {
    const created = await prisma.provincia.create({
      data: { nome: data.nome }
    });
    return created as Provincia;
  }

  async findById(id_provincia: number): Promise<Provincia | null> {
    const p = await prisma.provincia.findUnique({ where: { id_provincia } });
    return p as Provincia | null;
  }

  async findAll(): Promise<Provincia[]> {
    const ps = await prisma.provincia.findMany();
    return ps as Provincia[];
  }

  async update(id_provincia: number, data: Partial<Provincia>): Promise<Provincia> {
    const updated = await prisma.provincia.update({
      where: { id_provincia },
      data
    });
    return updated as Provincia;
  }

  async delete(id_provincia: number): Promise<boolean> {
    await prisma.provincia.delete({ where: { id_provincia } });
    return true;
  }
}
