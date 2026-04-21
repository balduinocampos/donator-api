import { PedidoDoacao } from '@/domain/entities/PedidoDoacao';

export interface IPedidoDoacaoRepository {
  create(data: PedidoDoacao): Promise<PedidoDoacao>;
  findById(id_pedido_doacao: number): Promise<PedidoDoacao | null>;
  findAllByDoador(id_doador: number): Promise<PedidoDoacao[]>;
  findAllByHospital(id_hospital: number): Promise<PedidoDoacao[]>;
  findAll(): Promise<PedidoDoacao[]>;
  update(id_pedido_doacao: number, data: Partial<PedidoDoacao>): Promise<PedidoDoacao>;
  delete(id_pedido_doacao: number): Promise<boolean>;
}
