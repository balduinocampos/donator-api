import { Pedido } from '../entities/Pedido';

export interface IPedidoRepository {
  create(data: Pedido): Promise<Pedido>;
  findById(id_pedido: number): Promise<Pedido | null>;
  findAllByHospital(id_hospital: number): Promise<Pedido[]>;
  findAll(): Promise<Pedido[]>;
  update(id_pedido: number, data: Partial<Pedido>): Promise<Pedido>;
  delete(id_pedido: number): Promise<boolean>;
}
