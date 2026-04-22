import { Request, Response } from 'express';
import { CreateStockSchema, RegisterMovimentoSchema, UpdateStockSchema } from '../schemas/stockSchema';
import { stockFactory } from '../factories/stockFactory';

export class StockController {
  async initStock(req: Request, res: Response) {
    try {
      const data = CreateStockSchema.parse(req.body);
      const service = stockFactory();
      const result = await service.initializeStock(data);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async getStock(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = stockFactory();
      const stock = await service.getStock(Number(id));
      if (!stock) return res.status(404).json({ error: 'Stock não encontrado' });
      return res.json(stock);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getHospitalStock(req: Request, res: Response) {
    try {
      const { id_hospital } = req.params;
      const service = stockFactory();
      const stocks = await service.getHospitalStock(Number(id_hospital));
      return res.json(stocks);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateStock(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = UpdateStockSchema.parse(req.body);
      const service = stockFactory();
      const updated = await service.updateStockAbsolute(Number(id), data);
      return res.json(updated);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async transact(req: Request, res: Response) {
    try {
      const data = RegisterMovimentoSchema.parse(req.body);
      const service = stockFactory();
      const result = await service.registerMovimento(data);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async getMovimentos(req: Request, res: Response) {
    try {
      const { id_stock } = req.params;
      const service = stockFactory();
      const movimentos = await service.getMovimentosByStock(Number(id_stock));
      return res.json(movimentos);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
