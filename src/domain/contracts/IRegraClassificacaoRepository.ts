import { RegraClassificacao } from '../entities/RegraClassificacao';

export interface IRegraClassificacaoRepository {
  create(data: RegraClassificacao): Promise<RegraClassificacao>;
  findById(id_regra: number): Promise<RegraClassificacao | null>;
  findAll(): Promise<RegraClassificacao[]>;
  update(id_regra: number, data: Partial<RegraClassificacao>): Promise<RegraClassificacao>;
  delete(id_regra: number): Promise<boolean>;
}
