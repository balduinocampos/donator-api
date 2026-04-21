import { Agenda } from '@/domain/entities/Agenda';

export interface IAgendaRepository {
  create(data: Agenda): Promise<Agenda>;
  findById(id_agenda: number): Promise<Agenda | null>;
  findAllByDoador(id_doador: number): Promise<Agenda[]>;
  findAllByHospital(id_hospital: number): Promise<Agenda[]>;
  findAll(): Promise<Agenda[]>;
  update(id_agenda: number, data: Partial<Agenda>): Promise<Agenda>;
  delete(id_agenda: number): Promise<boolean>;
}
