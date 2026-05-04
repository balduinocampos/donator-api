import { IPedidoRepository } from '@/domain/contracts/IPedidoRepository';
import { Pedido } from '@/domain/entities/Pedido';
import { prisma } from '@/infra/db/connect';

export class PedidoRepository implements IPedidoRepository {
  async create(data: Pedido): Promise<Pedido> {
    const created = await prisma.pedido.create({
      data: {
        id_hospital: data.id_hospital,
        tipo_sanguineo_necessario: data.tipo_sanguineo_necessario as any,
        quantidade_necessaria: data.quantidade_necessaria || 1,
        id_municipio_pedido: data.id_municipio_pedido,
        contacto_referencia: data.contacto_referencia,
        nivel_urgencia: data.nivel_urgencia as any,
        mensagem_adicional: data.mensagem_adicional
      }
    });
    return created as unknown as Pedido;
  }

  async findById(id_pedido: number): Promise<Pedido | null> {
    const p = await prisma.pedido.findUnique({ where: { id_pedido } });
    return p as unknown as Pedido | null;
  }

  async findAllByHospital(id_hospital: number): Promise<Pedido[]> {
    const p = await prisma.pedido.findMany({ where: { id_hospital } });
    return p as unknown as Pedido[];
  }

  async findAll(): Promise<Pedido[]> {
    const p = await prisma.pedido.findMany();
    return p as unknown as Pedido[];
  }

  async update(id_pedido: number, data: Partial<Pedido>): Promise<Pedido> {
    const updated = await prisma.pedido.update({
      where: { id_pedido },
      data: data as any
    });
    return updated as unknown as Pedido;
  }

  async delete(id_pedido: number): Promise<boolean> {
    await prisma.pedido.delete({ where: { id_pedido } });
    return true;
  }
}
