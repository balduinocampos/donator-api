// Log Acesso
export interface CreateLogAcessoDTO {
  id_hospital?: number | null;
  id_doador?: number | null;
  acao: string;
  descricao: string;
  ip_origem: string;
}

export interface LogAcessoResponseDTO {
  id_log: number;
  id_hospital?: number | null;
  id_doador?: number | null;
  acao: string;
  descricao: string;
  ip_origem: string;
  data_hora: Date;
}

// Sessoes
export interface CreateSessaoDTO {
  id_sessao: string;
  id_usuario: number; // mapped to id_hospital or id_doador
  ip_origem: string;
  user_agent?: string | null;
  data_expiracao: Date;
}

export interface SessaoResponseDTO {
  id_sessao: string;
  id_usuario: number;
  ip_origem: string;
  user_agent?: string | null;
  data_login: Date;
  data_expiracao: Date;
  ativo: boolean;
}
