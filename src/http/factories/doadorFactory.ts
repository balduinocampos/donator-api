import { DoadorService } from "@/use-cases/doador/DoadorService";
import { DoadorRepository } from "@/infra/repository/DoadorRepository";

export function daodorFactory(){
    const repository = new DoadorRepository();
    const usecase = new DoadorService(repository);

    return usecase;
}