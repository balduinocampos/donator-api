import { IHospitalRepository } from '@/domain/contracts/IHospitalRepository';
import { CreateHospitalDTO, UpdateHospitalDTO, HospitalResponseDTO } from '@/interfaces/dtos/HospitalDTO';
import { Hospital } from '@/domain/entities/Hospital';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from '@/shared/error';

export class HospitalService {
  constructor(private hospitalRepository: IHospitalRepository) {}

  async createHospital(data: CreateHospitalDTO): Promise<HospitalResponseDTO> {
    const existingEmail = await this.hospitalRepository.findByEmail(data.email);
    if (existingEmail) throw AppError.conflict('Email already in use');

    const existingNif = await this.hospitalRepository.findByNif(data.nif);
    if (existingNif) throw AppError.conflict('NIF already in use');

    const senha_hash = data.senha ? await bcrypt.hash(data.senha, 10) : '';

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

  async login(email: string, senhaRaw: string): Promise<{ token: string, user: Omit<Hospital, 'senha_hash'> }> {
    const hospital = await this.hospitalRepository.findByEmail(email);
    if (!hospital || !hospital.senha_hash) {
      throw AppError.unauthorized('Credenciais inválidas');
    }

    const isMatch = await bcrypt.compare(senhaRaw, hospital.senha_hash);
    if (!isMatch) {
      throw AppError.unauthorized('Credenciais inválidas');
    }

    const token = jwt.sign(
      { userId: hospital.id_hospital, role: 'hospital' },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1d' }
    );

    return {
      token,
      user: this.toResponseDTO(hospital)
    };
  }

  async changePassword(id: number, currentSenha: string, newSenha: string): Promise<void> {
    const hospital = await this.hospitalRepository.findById(id);
    if (!hospital || !hospital.senha_hash) {
      throw AppError.notFound('Hospital não encontrado');
    }

    const isMatch = await bcrypt.compare(currentSenha, hospital.senha_hash);
    if (!isMatch) {
      throw AppError.unauthorized('Senha atual incorreta');
    }

    const newHash = await bcrypt.hash(newSenha, 10);
    await this.hospitalRepository.update(id, { senha_hash: newHash });
  }

  async resetPassword(email: string, newSenha: string): Promise<void> {
    const hospital = await this.hospitalRepository.findByEmail(email);
    if (!hospital || !hospital.senha_hash) {
      throw AppError.notFound('Hospital não encontrado');
    }

    const newHash = await bcrypt.hash(newSenha, 10);
    await this.hospitalRepository.update(hospital.id_hospital!, { senha_hash: newHash });
  }

  private toResponseDTO(hospital: Hospital): HospitalResponseDTO {
    const { senha_hash, ...rest } = hospital;
    return rest as HospitalResponseDTO;
  }
}
