import { Doador } from '@/domain/entities/Doador';

export interface IDoadorRepository {
  create(data: Doador): Promise<Doador>;
  findById(id_doador: number): Promise<Doador | null>;
  findByEmail(email: string): Promise<Doador | null>;
  findByTelefone(telefone: string): Promise<Doador | null>;
  findAll(): Promise<Doador[]>;
  update(id_doador: number, data: Partial<Doador>): Promise<Doador>;
  delete(id_doador: number): Promise<boolean>;
}
