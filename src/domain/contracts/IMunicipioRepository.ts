import { Municipio } from '@/domain/entities/Municipio';

export interface IMunicipioRepository {
  create(data: Municipio): Promise<Municipio>;
  findById(id_municipio: number): Promise<Municipio | null>;
  findAll(): Promise<Municipio[]>;
  update(id_municipio: number, data: Partial<Municipio>): Promise<Municipio>;
  delete(id_municipio: number): Promise<boolean>;
}
