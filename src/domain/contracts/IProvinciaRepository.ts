import { Provincia } from '../entities/Provincia';

export interface IProvinciaRepository {
  create(data: Provincia): Promise<Provincia>;
  findById(id_provincia: number): Promise<Provincia | null>;
  findAll(): Promise<Provincia[]>;
  update(id_provincia: number, data: Partial<Provincia>): Promise<Provincia>;
  delete(id_provincia: number): Promise<boolean>;
}
