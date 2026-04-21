import { EstatisticaDoador } from '../entities/EstatisticaDoador';

export interface IEstatisticaDoadorRepository {
  create(data: EstatisticaDoador): Promise<EstatisticaDoador>;
  findById(id_estatistica: number): Promise<EstatisticaDoador | null>;
  findByDoador(id_doador: number): Promise<EstatisticaDoador | null>;
  findAll(): Promise<EstatisticaDoador[]>;
  update(id_estatistica: number, data: Partial<EstatisticaDoador>): Promise<EstatisticaDoador>;
  delete(id_estatistica: number): Promise<boolean>;
}
