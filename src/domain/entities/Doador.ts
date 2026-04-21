import { TipoSanguineo, StatusDoador } from '@/domain/enums';

export class Doador {
  id_doador?: number;
  nome_completo: string;
  telefone: string;
  email?: string | null;
  senha_hash: string;
  tipo_sanguineo: TipoSanguineo;
  id_municipio: number;
  data_nascimento?: Date | null;
  data_cadastro?: Date;
  status?: StatusDoador;
  consentimento_sms?: boolean;

  constructor(props: Omit<Doador, 'id_doador'>, id_doador?: number) {
    Object.assign(this, props);
    if (id_doador) this.id_doador = id_doador;
  }
}
