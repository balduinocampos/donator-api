import { ILogAcessoRepository } from '@/domain/contracts/ILogAcessoRepository';
import { ISessaoAdminRepository } from '@/domain/contracts/ISessaoAdminRepository';
import { ISessaoDoadorRepository } from '@/domain/contracts/ISessaoDoadorRepository';
import { LogAcesso } from '@/domain/entities/LogAcesso';
import { SessaoAdmin } from '@/domain/entities/SessaoAdmin';
import { SessaoDoador } from '@/domain/entities/SessaoDoador';
import {
  CreateLogAcessoDTO, LogAcessoResponseDTO,
  CreateSessaoDTO, SessaoResponseDTO
} from '@/interfaces/dtos/AuditoriaDTO';

export class AuditoriaService {
  constructor(
    private logAcessoRepository: ILogAcessoRepository,
    private sessaoAdminRepository: ISessaoAdminRepository,
    private sessaoDoadorRepository: ISessaoDoadorRepository
  ) {}

  // === LOGS ===
  async createLog(data: CreateLogAcessoDTO): Promise<LogAcessoResponseDTO> {
    const log = new LogAcesso(data);
    const created = await this.logAcessoRepository.create(log);
    return created as LogAcessoResponseDTO;
  }

  // === SESSÕES ADMIN ===
  async registerAdminSession(data: CreateSessaoDTO): Promise<SessaoResponseDTO> {
    const { id_usuario, ...rest } = data;

    const sessao = new SessaoAdmin({ ...rest, id_hospital: id_usuario }, data.id_sessao);

    const created = await this.sessaoAdminRepository.create(sessao);

    return { ...created, id_usuario: created.id_hospital };
  }

  // === SESSÕES DOADOR ===
  async registerDoadorSession(data: CreateSessaoDTO): Promise<SessaoResponseDTO> {
    const { id_usuario, ...rest } = data;

    const sessao = new SessaoDoador({ ...rest, id_doador: id_usuario }, data.id_sessao);

    const created = await this.sessaoDoadorRepository.create(sessao);
    
    return { ...created, id_usuario: created.id_doador };
  }
}
