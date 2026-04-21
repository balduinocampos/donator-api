import { HospitalService } from "@/use-cases/hospital/HospitalService";
import { HospitalRepository } from "@/infra/repository/HospitalRepository";

export function hospitalFactory() {
    const repository = new HospitalRepository();
    const usecase = new HospitalService(repository);

    return usecase;
}
