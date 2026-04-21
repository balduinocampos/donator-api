import { AuditoriaService } from "@/use-cases/auditoria/AuditoriaService";
import { LogAcessoRepository } from "@/infra/repository/LogAcessoRepository";
import { SessaoAdminRepository } from "@/infra/repository/SessaoAdminRepository";
import { SessaoDoadorRepository } from "@/infra/repository/SessaoDoadorRepository";

export function auditoriaFactory() {
    const logRepository = new LogAcessoRepository();
    const sessaoAdminRepository = new SessaoAdminRepository();
    const sessaoDoadorRepository = new SessaoDoadorRepository();
    
    const usecase = new AuditoriaService(
        logRepository, 
        sessaoAdminRepository, 
        sessaoDoadorRepository
    );

    return usecase;
}
