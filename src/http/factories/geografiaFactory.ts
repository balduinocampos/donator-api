import { GeografiaService } from "@/use-cases/geografia/GeografiaService";
import { ProvinciaRepository } from "@/infra/repository/ProvinciaRepository";
import { MunicipioRepository } from "@/infra/repository/MunicipioRepository";

export function geografiaFactory() {
    const provinciaRepository = new ProvinciaRepository();
    const municipioRepository = new MunicipioRepository();
    const usecase = new GeografiaService(provinciaRepository, municipioRepository);

    return usecase;
}
