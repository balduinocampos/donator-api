import { SessaoAdmin } from '@/domain/entities/SessaoAdmin';

export interface ISessaoAdminRepository {
  create(data: SessaoAdmin): Promise<SessaoAdmin>;
  findById(id_sessao: string): Promise<SessaoAdmin | null>;
  findAllByHospital(id_hospital: number): Promise<SessaoAdmin[]>;
  findAll(): Promise<SessaoAdmin[]>;
  update(id_sessao: string, data: Partial<SessaoAdmin>): Promise<SessaoAdmin>;
  delete(id_sessao: string): Promise<boolean>;
}
