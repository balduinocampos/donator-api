
export interface CreateEstatisticaDoadorDTO {
  id_doador: number;
  total_doacoes?: number;
  vidas_salvas?: number;
  total_centros?: number;
  pontuacao?: number;
}

export interface UpdateEstatisticaDoadorDTO {
  total_doacoes?: number;
  vidas_salvas?: number;
  total_centros?: number;
  pontuacao?: number;
}

export interface EstatisticaDoadorResponseDTO {
  id_estatistica: number;
  id_doador: number;
  total_doacoes: number;
  vidas_salvas: number;
  total_centros: number;
  pontuacao: number;
  ultima_atualizacao: Date;
}

// RegraClassificacao
export interface RegraClassificacaoDTO {
  id_regra?: number;
  nome_nivel: string;
  pontuacao_minima: number;
  pontuacao_maxima?: number | null;
}
