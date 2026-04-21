import { StatusAgenda } from '@/domain/enums';

// Agenda
export interface CreateAgendaDTO {
  id_doador: number;
  id_hospital: number;
  data_agendada: Date;
  hora_agendada: Date;
  observacao_doador?: string | null;
}

export interface UpdateAgendaDTO {
  status?: StatusAgenda;
  observacao_hospital?: string | null;
}

export interface AgendaResponseDTO {
  id_agenda: number;
  id_doador: number;
  id_hospital: number;
  data_agendada: Date;
  hora_agendada: Date;
  status: StatusAgenda;
  observacao_doador?: string | null;
  observacao_hospital?: string | null;
  data_criacao: Date;
  data_atualizacao: Date;
}

// HistoricoDoacao
export interface CreateHistoricoDoacaoDTO {
  id_doador: number;
  id_hospital: number;
  data_doacao: Date;
  observacao?: string | null;
}

export interface HistoricoDoacaoResponseDTO {
  id_historico: number;
  id_doador: number;
  id_hospital: number;
  data_doacao: Date;
  observacao?: string | null;
}
