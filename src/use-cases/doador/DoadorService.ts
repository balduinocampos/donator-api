import { IDoadorRepository } from '@/domain/contracts/IDoadorRepository';
import { CreateDoadorDTO, UpdateDoadorDTO, DoadorResponseDTO } from '@/interfaces/dtos/DoadorDTO';
import { Doador } from '@/domain/entities/Doador';
// Assuming you have some hash function
// import { hashPassword } from '../../utils/crypto';

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

    // Hash password here (Mocked for now)
    const senha_hash = data.senha ? `hashed_${data.senha}` : 'default_hash';

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

  private toResponseDTO(doador: Doador): DoadorResponseDTO {
    const { senha_hash, ...rest } = doador;
    return rest as DoadorResponseDTO;
  }
}
