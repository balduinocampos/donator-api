export class MovimentoStock {
  id_movimento?: number;
  id_stock: number;
  quantidade: number;
  observacao?: string | null;
  data_movimento?: Date;

  constructor(props: Omit<MovimentoStock, 'id_movimento'>, id_movimento?: number) {
    Object.assign(this, props);
    if (id_movimento) this.id_movimento = id_movimento;
  }
}
