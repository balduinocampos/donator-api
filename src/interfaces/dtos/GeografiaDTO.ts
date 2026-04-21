export interface CreateProvinciaDTO {
  nome: string;
}

export interface UpdateProvinciaDTO {
  nome?: string;
}

export interface ProvinciaResponseDTO {
  id_provincia: number;
  nome: string;
}

export interface CreateMunicipioDTO {
  id_provincia: number;
  nome: string;
}

export interface UpdateMunicipioDTO {
  nome?: string;
  id_provincia?: number;
}

export interface MunicipioResponseDTO {
  id_municipio: number;
  id_provincia: number;
  nome: string;
}
