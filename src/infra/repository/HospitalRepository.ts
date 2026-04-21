import { IHospitalRepository } from '@/domain/contracts/IHospitalRepository';
import { Hospital } from '@/domain/entities/Hospital';
import { prisma } from '@/infra/db/connect';


export class HospitalRepository implements IHospitalRepository {
  async create(data: Hospital): Promise<Hospital> {
    const created = await prisma.hospital.create({
      data: {
        nome: data.nome,
        nif: data.nif,
        id_municipio: data.id_municipio,
        endereco: data.endereco,
        telefone: data.telefone,
        email: data.email,
        senha_hash: data.senha_hash,
        status: data.status as any
      }
    });
    return created as unknown as Hospital;
  }

  async findById(id_hospital: number): Promise<Hospital | null> {
    const h = await prisma.hospital.findUnique({ where: { id_hospital } });
    return h as unknown as Hospital | null;
  }

  async findByEmail(email: string): Promise<Hospital | null> {
    const h = await prisma.hospital.findUnique({ where: { email } });
    return h as unknown as Hospital | null;
  }

  async findByNif(nif: string): Promise<Hospital | null> {
    const h = await prisma.hospital.findUnique({ where: { nif } });
    return h as unknown as Hospital | null;
  }

  async findAll(): Promise<Hospital[]> {
    const hs = await prisma.hospital.findMany();
    return hs as unknown as Hospital[];
  }

  async update(id_hospital: number, data: Partial<Hospital>): Promise<Hospital> {
    const updated = await prisma.hospital.update({
      where: { id_hospital },
      data: data as any
    });
    return updated as unknown as Hospital;
  }

  async delete(id_hospital: number): Promise<boolean> {
    await prisma.hospital.delete({ where: { id_hospital } });
    return true;
  }
}
