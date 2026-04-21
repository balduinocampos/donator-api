import { IHospitalRepository } from '@/domain/contracts/IHospitalRepository';
import { CreateHospitalDTO, UpdateHospitalDTO, HospitalResponseDTO } from '@/interfaces/dtos/HospitalDTO';
import { Hospital } from '@/domain/entities/Hospital';

export class HospitalService {
  constructor(private hospitalRepository: IHospitalRepository) {}

  async createHospital(data: CreateHospitalDTO): Promise<HospitalResponseDTO> {
    const existingEmail = await this.hospitalRepository.findByEmail(data.email);
    if (existingEmail) throw new Error('Email already in use');

    const existingNif = await this.hospitalRepository.findByNif(data.nif);
    if (existingNif) throw new Error('NIF already in use');

    const senha_hash = data.senha ? `hashed_${data.senha}` : 'default_hash';

    const hospitalEntity = new Hospital({
      ...data,
      senha_hash
    });

    const created = await this.hospitalRepository.create(hospitalEntity);
    return this.toResponseDTO(created);
  }

  async getHospitalById(id: number): Promise<HospitalResponseDTO | null> {
    const hospital = await this.hospitalRepository.findById(id);
    return hospital ? this.toResponseDTO(hospital) : null;
  }

  async getAllHospitais(): Promise<HospitalResponseDTO[]> {
    const hospitais = await this.hospitalRepository.findAll();
    return hospitais.map(this.toResponseDTO);
  }

  async updateHospital(id: number, data: UpdateHospitalDTO): Promise<HospitalResponseDTO> {
    const updated = await this.hospitalRepository.update(id, data);
    return this.toResponseDTO(updated);
  }

  async deleteHospital(id: number): Promise<boolean> {
    return this.hospitalRepository.delete(id);
  }

  private toResponseDTO(hospital: Hospital): HospitalResponseDTO {
    const { senha_hash, ...rest } = hospital;
    return rest as HospitalResponseDTO;
  }
}
