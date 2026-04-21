import { IPedidoRepository } from '@/domain/contracts/IPedidoRepository';
import { IPedidoDoacaoRepository } from '@/domain/contracts/IPedidoDoacaoRepository';
import { IPedidoEntreHospitaisRepository } from '@/domain/contracts/IPedidoEntreHospitaisRepository';
import { Pedido } from '@/domain/entities/Pedido';
import { PedidoDoacao } from '@/domain/entities/PedidoDoacao';
import { PedidoEntreHospitais } from '@/domain/entities/PedidoEntreHospitais';
import {
  CreatePedidoDTO, UpdatePedidoDTO, PedidoResponseDTO,
  CreatePedidoDoacaoDTO, UpdatePedidoDoacaoDTO, PedidoDoacaoResponseDTO,
  CreatePedidoEntreHospitaisDTO, UpdatePedidoEntreHospitaisDTO, PedidoEntreHospitaisResponseDTO
} from '../../interfaces/dtos/PedidoDTO';

export class PedidoService {
  constructor(
    private pedidoRepository: IPedidoRepository,
    private pedidoDoacaoRepository: IPedidoDoacaoRepository,
    private pedidoEntreHospitaisRepository: IPedidoEntreHospitaisRepository
  ) {}

  // === PEDIDO (URGÊNCIA/SMS) ===
  async createPedido(data: CreatePedidoDTO): Promise<PedidoResponseDTO> {
    const pedido = new Pedido(data);
    const created = await this.pedidoRepository.create(pedido);
    return created as PedidoResponseDTO;
  }

  async updatePedido(id: number, data: UpdatePedidoDTO): Promise<PedidoResponseDTO> {
    const updated = await this.pedidoRepository.update(id, data);
    return updated as PedidoResponseDTO;
  }

  async getHospitalPedidos(id_hospital: number): Promise<PedidoResponseDTO[]> {
    const pedidos = await this.pedidoRepository.findAllByHospital(id_hospital);
    return pedidos as PedidoResponseDTO[];
  }

  // === PEDIDO DOAÇÃO (Doador -> Hospital) ===
  async requestDoacao(data: CreatePedidoDoacaoDTO): Promise<PedidoDoacaoResponseDTO> {
    const pedido = new PedidoDoacao(data);
    const created = await this.pedidoDoacaoRepository.create(pedido);
    return created as PedidoDoacaoResponseDTO;
  }

  async answerPedidoDoacao(id: number, data: UpdatePedidoDoacaoDTO): Promise<PedidoDoacaoResponseDTO> {
    const updated = await this.pedidoDoacaoRepository.update(id, data);
    return updated as PedidoDoacaoResponseDTO;
  }
  
  async getDoacoesByDoador(id_doador: number): Promise<PedidoDoacaoResponseDTO[]> {
    const pedidos = await this.pedidoDoacaoRepository.findAllByDoador(id_doador);
    return pedidos as PedidoDoacaoResponseDTO[];
  }

  // === PEDIDO ENTRE HOSPITAIS ===
  async requestBolsas(data: CreatePedidoEntreHospitaisDTO): Promise<PedidoEntreHospitaisResponseDTO> {
    const pedido = new PedidoEntreHospitais(data);
    const created = await this.pedidoEntreHospitaisRepository.create(pedido);
    return created as PedidoEntreHospitaisResponseDTO;
  }

  async answerPedidoBolsas(id: number, data: UpdatePedidoEntreHospitaisDTO): Promise<PedidoEntreHospitaisResponseDTO> {
    const updated = await this.pedidoEntreHospitaisRepository.update(id, data);
    return updated as PedidoEntreHospitaisResponseDTO;
  }
}
