import { TipoSanguineo, StatusDoador } from '@/domain/enums';

export interface CreateDoadorDTO {
  nome_completo: string;
  telefone: string;
  email?: string | null;
  senha?: string; // used for creation, will be hashed in the service
  tipo_sanguineo: TipoSanguineo;
  id_municipio: number;
  data_nascimento?: Date | null;
  consentimento_sms?: boolean;
}

export interface UpdateDoadorDTO {
  nome_completo?: string;
  telefone?: string;
  email?: string | null;
  tipo_sanguineo?: TipoSanguineo;
  id_municipio?: number;
  data_nascimento?: Date | null;
  status?: StatusDoador;
  consentimento_sms?: boolean;
}

export interface DoadorResponseDTO {
  id_doador: number;
  nome_completo: string;
  telefone: string;
  email?: string | null;
  tipo_sanguineo: TipoSanguineo;
  id_municipio: number;
  data_nascimento?: Date | null;
  data_cadastro: Date;
  status: StatusDoador;
  consentimento_sms: boolean;
}
