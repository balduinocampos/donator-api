import { Hospital } from '../entities/Hospital';

export interface IHospitalRepository {
  create(data: Hospital): Promise<Hospital>;
  findById(id_hospital: number): Promise<Hospital | null>;
  findByEmail(email: string): Promise<Hospital | null>;
  findByNif(nif: string): Promise<Hospital | null>;
  findAll(): Promise<Hospital[]>;
  update(id_hospital: number, data: Partial<Hospital>): Promise<Hospital>;
  delete(id_hospital: number): Promise<boolean>;
}
