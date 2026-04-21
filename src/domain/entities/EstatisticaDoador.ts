export class EstatisticaDoador {
  id_estatistica?: number;
  id_doador: number;
  total_doacoes?: number;
  vidas_salvas?: number;
  total_centros?: number;
  pontuacao?: number;
  ultima_atualizacao?: Date;

  constructor(props: Omit<EstatisticaDoador, 'id_estatistica'>, id_estatistica?: number) {
    Object.assign(this, props);
    if (id_estatistica) this.id_estatistica = id_estatistica;
  }
}
