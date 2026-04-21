import { StatusHospital } from '@/domain/enums';

export interface CreateHospitalDTO {
  nome: string;
  nif: string;
  id_municipio: number;
  endereco: string;
  telefone: string;
  email: string;
  senha?: string; // hashed later
}

export interface UpdateHospitalDTO {
  nome?: string;
  nif?: string;
  id_municipio?: number;
  endereco?: string;
  telefone?: string;
  email?: string;
  status?: StatusHospital;
}

export interface HospitalResponseDTO {
  id_hospital: number;
  nome: string;
  nif: string;
  id_municipio: number;
  endereco: string;
  telefone: string;
  email: string;
  data_cadastro?: Date;
  status?: StatusHospital;
}
