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
import { AppError } from '@/shared/error';

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

  async getLogsByHospital(id_hospital: number): Promise<LogAcessoResponseDTO[]> { 
    const logs = await this.logAcessoRepository.findAllByHospital(id_hospital);
    if (!logs.length) throw AppError.notFound('No logs found for this hospital');
    return logs as LogAcessoResponseDTO[];
  }
  
  async getLogsByDoador(id_doador: number): Promise<LogAcessoResponseDTO[]> {
    const logs = await this.logAcessoRepository.findAllByDoador(id_doador);
    if (!logs.length) throw AppError.notFound('No logs found for this doador');
    return logs as LogAcessoResponseDTO[];
  }

    async getLogById(id_log: number): Promise<LogAcessoResponseDTO> {
    const log = await this.logAcessoRepository.findById(id_log);
    if (!log) throw AppError.notFound('Log not found');
    return log as LogAcessoResponseDTO;
  }

  async deleteLog(id_log: number): Promise<boolean> {
    return await this.logAcessoRepository.delete(id_log);
  }

  async updateLog(id_log: number, data: Partial<CreateLogAcessoDTO>): Promise<LogAcessoResponseDTO> {
    const logAntes = await this.logAcessoRepository.findById(id_log);
    if (!logAntes) throw AppError.notFound('Log not found');

    const updated = await this.logAcessoRepository.update(id_log, data);
    return updated as LogAcessoResponseDTO;
  }

  async getAllLogs(): Promise<LogAcessoResponseDTO[]> {
    const logs = await this.logAcessoRepository.findAll();
    if (!logs.length) throw AppError.notFound('No logs found');
    return logs as LogAcessoResponseDTO[];
  }

  // === SESSÕES ADMIN ===
  async registerAdminSession(data: CreateSessaoDTO) {
    const { id_usuario, ...rest } = data;

    const sessao = new SessaoAdmin({ ...rest, id_hospital: id_usuario }, data.id_sessao);

    const created = await this.sessaoAdminRepository.create(sessao);

    return { ...created, id_usuario: created.id_hospital };
  }

  async getAdminSessionById(id_sessao: string): Promise<SessaoResponseDTO> {  
    const sessao = await this.sessaoAdminRepository.findById(id_sessao);
    if (!sessao) throw AppError.notFound('Sessão não encontrada');
    return { ...sessao, id_usuario: sessao.id_hospital } as SessaoResponseDTO;
  }

  async deleteAdminSession(id_sessao: string): Promise<boolean> {
    return await this.sessaoAdminRepository.delete(id_sessao);
  }

  async updateAdminSession(id_sessao: string, data: Partial<CreateSessaoDTO>): Promise<SessaoResponseDTO> {
    const sessaoAntes = await this.sessaoAdminRepository.findById(id_sessao);
    if (!sessaoAntes) throw AppError.notFound('Sessão não encontrada');

    const updated = await this.sessaoAdminRepository.update(id_sessao, data);
    return { ...updated, id_usuario: updated.id_hospital } as SessaoResponseDTO;
  }

  async getAllAdminSessions(): Promise<SessaoResponseDTO[]> {
    const sessoes = await this.sessaoAdminRepository.findAll();
    if (!sessoes.length) throw AppError.notFound('No admin sessions found');
    return sessoes.map(sessao => ({ ...sessao, id_usuario: sessao.id_hospital })) as SessaoResponseDTO[];
  }

  async getAdminSessionsByHospital(id_hospital: number): Promise<SessaoResponseDTO[]> {
    const sessoes = await this.sessaoAdminRepository.findAllByHospital(id_hospital);
    if (!sessoes.length) throw AppError.notFound('No admin sessions found for this hospital');
    return sessoes.map(sessao => ({ ...sessao, id_usuario: sessao.id_hospital })) as SessaoResponseDTO[];
  }

  // === SESSÕES DOADOR ===
  async registerDoadorSession(data: CreateSessaoDTO) {
    const { id_usuario, ...rest } = data;

    const sessao = new SessaoDoador({ ...rest, id_doador: id_usuario }, data.id_sessao);

    const created = await this.sessaoDoadorRepository.create(sessao);
    
    return { ...created, id_usuario: created.id_doador };
  }

  async getDoadorSessionById(id_sessao: string): Promise<SessaoResponseDTO> {
    const sessao = await this.sessaoDoadorRepository.findById(id_sessao);
    if (!sessao) throw AppError.notFound('Sessão não encontrada');
    return { ...sessao, id_usuario: sessao.id_doador } as SessaoResponseDTO;
  }

  async deleteDoadorSession(id_sessao: string): Promise<boolean> {
    return await this.sessaoDoadorRepository.delete(id_sessao);
  }

  async updateDoadorSession(id_sessao: string, data: Partial<CreateSessaoDTO>): Promise<SessaoResponseDTO> {
    const sessaoAntes = await this.sessaoDoadorRepository.findById(id_sessao);
    if (!sessaoAntes) throw AppError.notFound('Sessão não encontrada');

    const updated = await this.sessaoDoadorRepository.update(id_sessao, data);
    return { ...updated, id_usuario: updated.id_doador } as SessaoResponseDTO;
  }

  async getAllDoadorSessions(): Promise<SessaoResponseDTO[]> {
    const sessoes = await this.sessaoDoadorRepository.findAll();
    if (!sessoes.length) throw AppError.notFound('No doador sessions found');
    return sessoes.map(sessao => ({ ...sessao, id_usuario: sessao.id_doador })) as SessaoResponseDTO[];
  }

  async getDoadorSessionsByDoador(id_doador: number): Promise<SessaoResponseDTO[]> {
    const sessoes = await this.sessaoDoadorRepository.findAllByDoador(id_doador);
    if (!sessoes.length) throw AppError.notFound('No doador sessions found for this doador');
    return sessoes.map(sessao => ({ ...sessao, id_usuario: sessao.id_doador })) as SessaoResponseDTO[];
  }
}
