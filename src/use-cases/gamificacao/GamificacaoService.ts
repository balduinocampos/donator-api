import { IEstatisticaDoadorRepository } from '@/domain/contracts/IEstatisticaDoadorRepository';
import { IRegraClassificacaoRepository } from '@/domain/contracts/IRegraClassificacaoRepository';
import { EstatisticaDoador } from '@/domain/entities/EstatisticaDoador';
import {
  CreateEstatisticaDoadorDTO, UpdateEstatisticaDoadorDTO, EstatisticaDoadorResponseDTO,
  RegraClassificacaoDTO
} from '@/interfaces/dtos/GamificacaoDTO';

export class GamificacaoService {
  constructor(
    private estatisticaDoadorRepository: IEstatisticaDoadorRepository,
    private regraClassificacaoRepository: IRegraClassificacaoRepository
  ) {}

  // === ESTATISTICAS ===
  async getEstatisticaDoador(id_doador: number): Promise<EstatisticaDoadorResponseDTO | null> {
    const stats = await this.estatisticaDoadorRepository.findByDoador(id_doador);
    return stats as EstatisticaDoadorResponseDTO | null;
  }

  async ensureEstatisticaExists(id_doador: number): Promise<EstatisticaDoadorResponseDTO> {
    let stats = await this.estatisticaDoadorRepository.findByDoador(id_doador);
    if (!stats) {
      stats = await this.estatisticaDoadorRepository.create(new EstatisticaDoador({ id_doador }));
    }
    return stats as EstatisticaDoadorResponseDTO;
  }

  async incrementDonationStats(id_doador: number): Promise<EstatisticaDoadorResponseDTO> {
    const stats = await this.ensureEstatisticaExists(id_doador);
    
    const updated = await this.estatisticaDoadorRepository.update(stats.id_estatistica as number, {
      total_doacoes: (stats.total_doacoes || 0) + 1,
      vidas_salvas: (stats.vidas_salvas || 0) + 3,
      pontuacao: (stats.pontuacao || 0) + 10 // Business Rule: +10 pts por doação
    });

    return updated as EstatisticaDoadorResponseDTO;
  }

  // === REGRAS / NIVEIS ===
  async getAllRegras(): Promise<RegraClassificacaoDTO[]> {
    return await this.regraClassificacaoRepository.findAll() as RegraClassificacaoDTO[];
  }
}
