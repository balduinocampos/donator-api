export class RegraClassificacao {
  id_regra?: number;
  nome_nivel: string;
  pontuacao_minima: number;
  pontuacao_maxima?: number | null;

  constructor(props: Omit<RegraClassificacao, 'id_regra'>, id_regra?: number) {
    Object.assign(this, props);
    if (id_regra) this.id_regra = id_regra;
  }
}
