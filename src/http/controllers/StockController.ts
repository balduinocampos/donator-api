import { Request, Response } from 'express';
import { CreateStockSchema, RegisterMovimentoSchema } from '../schemas/stockSchema';
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
}
