import { IProvinciaRepository } from '../../domain/contracts/IProvinciaRepository';
import { IMunicipioRepository } from '../../domain/contracts/IMunicipioRepository';
import { 
  CreateProvinciaDTO, 
  UpdateProvinciaDTO, 
  ProvinciaResponseDTO,
  CreateMunicipioDTO,
  UpdateMunicipioDTO,
  MunicipioResponseDTO
} from '../../interfaces/dtos/GeografiaDTO';
import { Provincia } from '../../domain/entities/Provincia';
import { Municipio } from '../../domain/entities/Municipio';

export class GeografiaService {
  constructor(
    private provinciaRepository: IProvinciaRepository,
    private municipioRepository: IMunicipioRepository
  ) {}

  // --- Provincia ---
  async createProvincia(data: CreateProvinciaDTO): Promise<ProvinciaResponseDTO> {
    const provincia = new Provincia(data);
    const created = await this.provinciaRepository.create(provincia);
    return created as ProvinciaResponseDTO;
  }

  async getProvinciaById(id: number): Promise<ProvinciaResponseDTO | null> {
    const provincia = await this.provinciaRepository.findById(id);
    return provincia ? (provincia as ProvinciaResponseDTO) : null;
  }

  async getAllProvincias(): Promise<ProvinciaResponseDTO[]> {
    const provincias = await this.provinciaRepository.findAll();
    return provincias as ProvinciaResponseDTO[];
  }

  async updateProvincia(id: number, data: UpdateProvinciaDTO): Promise<ProvinciaResponseDTO> {
    const updated = await this.provinciaRepository.update(id, data);
    return updated as ProvinciaResponseDTO;
  }

  async deleteProvincia(id: number): Promise<boolean> {
    return this.provinciaRepository.delete(id);
  }

  // --- Municipio ---
  async createMunicipio(data: CreateMunicipioDTO): Promise<MunicipioResponseDTO> {
    const municipio = new Municipio(data);
    const created = await this.municipioRepository.create(municipio);
    return created as MunicipioResponseDTO;
  }

  async getMunicipioById(id: number): Promise<MunicipioResponseDTO | null> {
    const municipio = await this.municipioRepository.findById(id);
    return municipio ? (municipio as MunicipioResponseDTO) : null;
  }

  async getAllMunicipios(): Promise<MunicipioResponseDTO[]> {
    const municipios = await this.municipioRepository.findAll();
    return municipios as MunicipioResponseDTO[];
  }

  async updateMunicipio(id: number, data: UpdateMunicipioDTO): Promise<MunicipioResponseDTO> {
    const updated = await this.municipioRepository.update(id, data);
    return updated as MunicipioResponseDTO;
  }

  async deleteMunicipio(id: number): Promise<boolean> {
    return this.municipioRepository.delete(id);
  }
}
