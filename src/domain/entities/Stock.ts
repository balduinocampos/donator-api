import { TipoSanguineo } from '@/domain/enums';

export class Stock {
  id_stock?: number;
  id_hospital: number;
  tipo_sanguineo: TipoSanguineo;
  quantidade_bolsas?: number;
  ultima_atualizacao?: Date;

  constructor(props: Omit<Stock, 'id_stock'>, id_stock?: number) {
    Object.assign(this, props);
    if (id_stock) this.id_stock = id_stock;
  }
}
