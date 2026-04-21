import { TipoSanguineo } from '@/domain/enums';

// Stock
export interface CreateStockDTO {
  id_hospital: number;
  tipo_sanguineo: TipoSanguineo;
  quantidade_bolsas?: number;
}

export interface UpdateStockDTO {
  quantidade_bolsas?: number;
}

export interface StockResponseDTO {
  id_stock: number;
  id_hospital: number;
  tipo_sanguineo: TipoSanguineo;
  quantidade_bolsas: number;
  ultima_atualizacao: Date;
}

// Movimento Stock
export interface CreateMovimentoStockDTO {
  id_stock: number;
  quantidade: number;
  observacao?: string | null;
}

export interface MovimentoStockResponseDTO {
  id_movimento: number;
  id_stock: number;
  quantidade: number;
  observacao?: string | null;
  data_movimento: Date;
}
