import { IAgendaRepository } from '../../domain/contracts/IAgendaRepository';
import { IHistoricoDoacaoRepository } from '../../domain/contracts/IHistoricoDoacaoRepository';
import { Agenda } from '../../domain/entities/Agenda';
import { HistoricoDoacao } from '../../domain/entities/HistoricoDoacao';
import { StatusAgenda } from '../../domain/enums';
import {
  CreateAgendaDTO, UpdateAgendaDTO, AgendaResponseDTO,
  CreateHistoricoDoacaoDTO, HistoricoDoacaoResponseDTO
} from '../../interfaces/dtos/AgendaDTO';

export class AgendaService {
  constructor(
    private agendaRepository: IAgendaRepository,
    private historicoDoacaoRepository: IHistoricoDoacaoRepository
  ) {}

  // === AGENDA ===
  async schedule(data: CreateAgendaDTO): Promise<AgendaResponseDTO> {
    const agenda = new Agenda(data);
    const created = await this.agendaRepository.create(agenda);
    return created as AgendaResponseDTO;
  }

  async updateScheduleState(id: number, data: UpdateAgendaDTO): Promise<AgendaResponseDTO> {
    // If completing the donation, we should also generate a record in HistoricoDoacao automatically (business rule!)
    const agendaAntes = await this.agendaRepository.findById(id);
    if (!agendaAntes) throw new Error('Agenda not found');

    const updated = await this.agendaRepository.update(id, data);

    if (data.status === StatusAgenda.concluida && agendaAntes.status !== StatusAgenda.concluida) {
      await this.historicoDoacaoRepository.create(new HistoricoDoacao({
        id_doador: updated.id_doador,
        id_hospital: updated.id_hospital,
        data_doacao: new Date() // donation happened today
      }));
    }

    return updated as AgendaResponseDTO;
  }

  async getDoadoresAgenda(id_doador: number): Promise<AgendaResponseDTO[]> {
    const result = await this.agendaRepository.findAllByDoador(id_doador);
    return result as AgendaResponseDTO[];
  }

  async getHospitalAgenda(id_hospital: number): Promise<AgendaResponseDTO[]> {
    const result = await this.agendaRepository.findAllByHospital(id_hospital);
    return result as AgendaResponseDTO[];
  }

  // === HISTORICO (Manual entry outside of agenda) ===
  async registerHistoricoManually(data: CreateHistoricoDoacaoDTO): Promise<HistoricoDoacaoResponseDTO> {
    const historico = new HistoricoDoacao(data);
    const created = await this.historicoDoacaoRepository.create(historico);
    return created as HistoricoDoacaoResponseDTO;
  }

  async getHistorico(id_doador: number): Promise<HistoricoDoacaoResponseDTO[]> {
    const historico = await this.historicoDoacaoRepository.findAllByDoador(id_doador);
    return historico as HistoricoDoacaoResponseDTO[];
  }
}
