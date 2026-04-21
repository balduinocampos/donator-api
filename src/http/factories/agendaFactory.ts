import { AgendaService } from "@/use-cases/agenda/AgendaService";
import { AgendaRepository } from "@/infra/repository/AgendaRepository";
import { HistoricoDoacaoRepository } from "@/infra/repository/HistoricoDoacaoRepository";

export function agendaFactory() {
    const agendaRepository = new AgendaRepository();
    const historicoRepository = new HistoricoDoacaoRepository();
    const usecase = new AgendaService(agendaRepository, historicoRepository);

    return usecase;
}
