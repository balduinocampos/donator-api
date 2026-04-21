import { MovimentoStock } from '@/domain/entities/MovimentoStock';

export interface IMovimentoStockRepository {
  create(data: MovimentoStock): Promise<MovimentoStock>;
  findById(id_movimento: number): Promise<MovimentoStock | null>;
  findAllByStock(id_stock: number): Promise<MovimentoStock[]>;
  findAll(): Promise<MovimentoStock[]>;
  update(id_movimento: number, data: Partial<MovimentoStock>): Promise<MovimentoStock>;
  delete(id_movimento: number): Promise<boolean>;
}
