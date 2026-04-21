import { GamificacaoService } from "@/use-cases/gamificacao/GamificacaoService";
import { EstatisticaDoadorRepository } from "@/infra/repository/EstatisticaDoadorRepository";
import { RegraClassificacaoRepository } from "@/infra/repository/RegraClassificacaoRepository";

export function gamificacaoFactory() {
    const estatisticaRepository = new EstatisticaDoadorRepository();
    const regraRepository = new RegraClassificacaoRepository();
    
    const usecase = new GamificacaoService(estatisticaRepository, regraRepository);

    return usecase;
}
