import { IDoadorRepository } from '@/domain/contracts/IDoadorRepository';
import { CreateDoadorDTO, UpdateDoadorDTO, DoadorResponseDTO } from '@/interfaces/dtos/DoadorDTO';
import { Doador } from '@/domain/entities/Doador';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from '@/shared/error';
export class DoadorService {
  constructor(private doadorRepository: IDoadorRepository) {}

  async createDoador(data: CreateDoadorDTO): Promise<DoadorResponseDTO> {
    // Check if email or telefone already exists
    if (data.email) {
      const existingEmail = await this.doadorRepository.findByEmail(data.email);
      if (existingEmail) throw new Error('Email already in use');
    }
    const existingPhone = await this.doadorRepository.findByTelefone(data.telefone);
    if (existingPhone) throw new Error('Telefone already in use');

    // Hash password here
    const senha_hash = data.senha ? await bcrypt.hash(data.senha, 10) : '';

    const doadorEntity = new Doador({
      ...data,
      senha_hash
    });

    const created = await this.doadorRepository.create(doadorEntity);
    return this.toResponseDTO(created);
  }

  async getDoadorById(id: number): Promise<DoadorResponseDTO | null> {
    const doador = await this.doadorRepository.findById(id);
    return doador ? this.toResponseDTO(doador) : null;
  }

  async getAllDoadores(): Promise<DoadorResponseDTO[]> {
    const doadores = await this.doadorRepository.findAll();
    return doadores.map(this.toResponseDTO);
  }

  async updateDoador(id: number, data: UpdateDoadorDTO): Promise<DoadorResponseDTO> {
    const updated = await this.doadorRepository.update(id, data);
    return this.toResponseDTO(updated);
  }

  async deleteDoador(id: number): Promise<boolean> {
    return this.doadorRepository.delete(id);
  }

  async login(email: string, senhaRaw: string): Promise<{ token: string, user: DoadorResponseDTO }> {
    const doador = await this.doadorRepository.findByEmail(email);
    if (!doador || !doador.senha_hash) {
      throw AppError.unauthorized('Credenciais inválidas');
    }

    const isMatch = await bcrypt.compare(senhaRaw, doador.senha_hash);
    if (!isMatch) {
      throw AppError.unauthorized('Credenciais inválidas');
    }

    const token = jwt.sign(
      { userId: doador.id_doador, role: 'doador' },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1d' }
    );

    return {
      token,
      user: this.toResponseDTO(doador)
    };
  }

  private toResponseDTO(doador: Doador): DoadorResponseDTO {
    const { senha_hash, ...rest } = doador;
    return rest as DoadorResponseDTO;
  }
}
