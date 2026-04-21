import { LogAcesso } from '../entities/LogAcesso';

export interface ILogAcessoRepository {
  create(data: LogAcesso): Promise<LogAcesso>;
  findById(id_log: number): Promise<LogAcesso | null>;
  findAllByHospital(id_hospital: number): Promise<LogAcesso[]>;
  findAllByDoador(id_doador: number): Promise<LogAcesso[]>;
  findAll(): Promise<LogAcesso[]>;
  update(id_log: number, data: Partial<LogAcesso>): Promise<LogAcesso>;
  delete(id_log: number): Promise<boolean>;
}
