import { PedidoEntreHospitais } from '../entities/PedidoEntreHospitais';

export interface IPedidoEntreHospitaisRepository {
  create(data: PedidoEntreHospitais): Promise<PedidoEntreHospitais>;
  findById(id_pedido_entre: number): Promise<PedidoEntreHospitais | null>;
  findAllBySolicitante(id_solicitante: number): Promise<PedidoEntreHospitais[]>;
  findAllByFornecedor(id_fornecedor: number): Promise<PedidoEntreHospitais[]>;
  findAll(): Promise<PedidoEntreHospitais[]>;
  update(id_pedido_entre: number, data: Partial<PedidoEntreHospitais>): Promise<PedidoEntreHospitais>;
  delete(id_pedido_entre: number): Promise<boolean>;
}
