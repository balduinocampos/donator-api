import { Stock } from '@/domain/entities/Stock';
import { TipoSanguineo } from '../enums';

export interface IStockRepository {
  create(data: Stock): Promise<Stock>;
  findById(id_stock: number): Promise<Stock | null>;
  findByHospitalAndTipoSanguineo(id_hospital: number, tipo_sanguineo: TipoSanguineo): Promise<Stock | null>;
  findAllByHospital(id_hospital: number): Promise<Stock[]>;
  findAll(): Promise<Stock[]>;
  update(id_stock: number, data: Partial<Stock>): Promise<Stock>;
  delete(id_stock: number): Promise<boolean>;
}
