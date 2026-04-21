import { StatusHospital } from '../enums';

export class Hospital {
  id_hospital?: number;
  nome: string;
  nif: string;
  id_municipio: number;
  endereco: string;
  telefone: string;
  email: string;
  senha_hash: string;
  data_cadastro?: Date;
  status?: StatusHospital;

  constructor(props: Omit<Hospital, 'id_hospital'>, id_hospital?: number) {
    Object.assign(this, props);
    if (id_hospital) this.id_hospital = id_hospital;
  }
}
