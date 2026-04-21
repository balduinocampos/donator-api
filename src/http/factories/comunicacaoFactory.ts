import { ComunicacaoService } from "@/use-cases/comunicacao/ComunicacaoService";
import { MensagemRepository } from "@/infra/repository/MensagemRepository";
import { NotificacaoRepository } from "@/infra/repository/NotificacaoRepository";

export function comunicacaoFactory() {
    const mensagemRepository = new MensagemRepository();
    const notificacaoRepository = new NotificacaoRepository();
    const usecase = new ComunicacaoService(mensagemRepository, notificacaoRepository);

    return usecase;
}
