import { HistoricoDoacao } from '../entities/HistoricoDoacao';

export interface IHistoricoDoacaoRepository {
  create(data: HistoricoDoacao): Promise<HistoricoDoacao>;
  findById(id_historico: number): Promise<HistoricoDoacao | null>;
  findAllByDoador(id_doador: number): Promise<HistoricoDoacao[]>;
  findAll(): Promise<HistoricoDoacao[]>;
  update(id_historico: number, data: Partial<HistoricoDoacao>): Promise<HistoricoDoacao>;
  delete(id_historico: number): Promise<boolean>;
}
