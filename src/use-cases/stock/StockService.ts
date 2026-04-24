import { IStockRepository } from '@/domain/contracts/IStockRepository';
import { IMovimentoStockRepository } from '@/domain/contracts/IMovimentoStockRepository';
import { Stock } from '@/domain/entities/Stock';
import { MovimentoStock } from '@/domain/entities/MovimentoStock';
import {
  CreateStockDTO, UpdateStockDTO, StockResponseDTO,
  CreateMovimentoStockDTO, MovimentoStockResponseDTO
} from '@/interfaces/dtos/StockDTO';
import { AppError } from '@/shared/error';

export class StockService {
  constructor(
    private stockRepository: IStockRepository,
    private movimentoStockRepository: IMovimentoStockRepository
  ) {}

  // === STOCK ===
  async initializeStock(data: CreateStockDTO): Promise<StockResponseDTO> {
    const existing = await this.stockRepository.findByHospitalAndTipoSanguineo(data.id_hospital, data.tipo_sanguineo);

    if (existing) throw AppError.conflict('Stock already exists for this hospital and blood type');

    const created = await this.stockRepository.create(new Stock(data));

    return created as StockResponseDTO;
  }

  async getStock(id: number): Promise<StockResponseDTO | null> {
    const stock = await this.stockRepository.findById(id);
    return stock as StockResponseDTO | null;
  }

  async getHospitalStock(id_hospital: number): Promise<StockResponseDTO[]> {
    const stocks = await this.stockRepository.findAllByHospital(id_hospital);
    return stocks as StockResponseDTO[];
  }

  async updateStockAbsolute(id: number, data: UpdateStockDTO): Promise<StockResponseDTO> {
    const updated = await this.stockRepository.update(id, data);
    return updated as StockResponseDTO;
  }

  async deleteStock(id: number): Promise<void> {
    const success = await this.stockRepository.delete(id);
    if (!success) throw AppError.notFound('Stock record not found');
  }

  async getAllStocks(): Promise<StockResponseDTO[]> {
    const stocks = await this.stockRepository.findAll();
    if (!stocks.length) throw AppError.notFound('No stock records found');
    return stocks as StockResponseDTO[];
  }

  // === MOVIMENTOS (The proper way to update stock) ===
  async registerMovimento(data: CreateMovimentoStockDTO): Promise<MovimentoStockResponseDTO> {
    const stock = await this.stockRepository.findById(data.id_stock);
    if (!stock) throw AppError.notFound('Stock record not found');

    // 1. Create the Movement
    const movimento = new MovimentoStock(data);
    const createdMovimento = await this.movimentoStockRepository.create(movimento);

    // 2. Update actual Stock Balance
    const newBalance = (stock.quantidade_bolsas || 0) + data.quantidade;
    await this.stockRepository.update(data.id_stock, { quantidade_bolsas: newBalance });

    return createdMovimento as MovimentoStockResponseDTO;
  }

  async getMovimento(id_movimento: number): Promise<MovimentoStockResponseDTO | null> {
    const movimento = await this.movimentoStockRepository.findById(id_movimento);
    return movimento as MovimentoStockResponseDTO | null;
  }
  
  async getAllMovimentos(): Promise<MovimentoStockResponseDTO[]> {
    const movimentos = await this.movimentoStockRepository.findAll();
    if (!movimentos.length) throw AppError.notFound('No movement records found');
    return movimentos as MovimentoStockResponseDTO[];
  }

  async deleteMovimento(id_movimento: number): Promise<void> {
    const movimento = await this.movimentoStockRepository.findById(id_movimento);
    if (!movimento) throw AppError.notFound('Movement record not found');

    // Revert Stock Balance
    const stock = await this.stockRepository.findById(movimento.id_stock);
    if (stock) {
      const revertedBalance = (stock.quantidade_bolsas || 0) - movimento.quantidade;
      await this.stockRepository.update(movimento.id_stock, { quantidade_bolsas: revertedBalance });
    }

    const success = await this.movimentoStockRepository.delete(id_movimento);
    if (!success) throw AppError.notFound('Failed to delete movement record');
  }
  

  async getMovimentosByStock(id_stock: number): Promise<MovimentoStockResponseDTO[]> {
    const movimentos = await this.movimentoStockRepository.findAllByStock(id_stock);
    return movimentos as MovimentoStockResponseDTO[];
  }
}
