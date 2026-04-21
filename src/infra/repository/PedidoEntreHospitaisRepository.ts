import { IPedidoEntreHospitaisRepository } from '@/domain/contracts/IPedidoEntreHospitaisRepository';
import { PedidoEntreHospitais } from '@/domain/entities/PedidoEntreHospitais';
import { prisma } from '@/infra/db/connect';


export class PedidoEntreHospitaisRepository implements IPedidoEntreHospitaisRepository {
  async create(data: PedidoEntreHospitais): Promise<PedidoEntreHospitais> {
    const created = await prisma.pedidoEntreHospitais.create({
      data: {
        id_solicitante: data.id_solicitante,
        id_fornecedor: data.id_fornecedor,
        tipo_sanguineo: data.tipo_sanguineo as any,
        quantidade_bolsas: data.quantidade_bolsas
      }
    });
    return created as unknown as PedidoEntreHospitais;
  }

  async findById(id_pedido_entre: number): Promise<PedidoEntreHospitais | null> {
    const p = await prisma.pedidoEntreHospitais.findUnique({ where: { id_pedido_entre } });
    return p as unknown as PedidoEntreHospitais | null;
  }

  async findAllBySolicitante(id_solicitante: number): Promise<PedidoEntreHospitais[]> {
    const p = await prisma.pedidoEntreHospitais.findMany({ where: { id_solicitante } });
    return p as unknown as PedidoEntreHospitais[];
  }

  async findAllByFornecedor(id_fornecedor: number): Promise<PedidoEntreHospitais[]> {
    const p = await prisma.pedidoEntreHospitais.findMany({ where: { id_fornecedor } });
    return p as unknown as PedidoEntreHospitais[];
  }

  async findAll(): Promise<PedidoEntreHospitais[]> {
    const p = await prisma.pedidoEntreHospitais.findMany();
    return p as unknown as PedidoEntreHospitais[];
  }

  async update(id_pedido_entre: number, data: Partial<PedidoEntreHospitais>): Promise<PedidoEntreHospitais> {
    const updated = await prisma.pedidoEntreHospitais.update({
      where: { id_pedido_entre },
      data: data as any
    });
    return updated as unknown as PedidoEntreHospitais;
  }

  async delete(id_pedido_entre: number): Promise<boolean> {
    await prisma.pedidoEntreHospitais.delete({ where: { id_pedido_entre } });
    return true;
  }
}
