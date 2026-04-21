import { SessaoDoador } from '@/domain/entities/SessaoDoador';

export interface ISessaoDoadorRepository {
  create(data: SessaoDoador): Promise<SessaoDoador>;
  findById(id_sessao: string): Promise<SessaoDoador | null>;
  findAllByDoador(id_doador: number): Promise<SessaoDoador[]>;
  findAll(): Promise<SessaoDoador[]>;
  update(id_sessao: string, data: Partial<SessaoDoador>): Promise<SessaoDoador>;
  delete(id_sessao: string): Promise<boolean>;
}
