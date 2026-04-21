import { Request, Response } from 'express';
import { 
  CreatePedidoSchema, CreatePedidoDoacaoSchema, AnswerPedidoDoacaoSchema, 
  CreatePedidoEntreHospitaisSchema, AnswerPedidoEntreSchema 
} from '../schemas/pedidoSchema';
import { pedidoFactory } from '../factories/pedidoFactory';

export class PedidoController {
  // SMS/Urgência
  async openPedido(req: Request, res: Response) {
    try {
      const data = CreatePedidoSchema.parse(req.body);
      const service = pedidoFactory();
      const result = await service.createPedido(data);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  // Doação (Doador -> Hospital)
  async requestDoacao(req: Request, res: Response) {
    try {
      const data = CreatePedidoDoacaoSchema.parse(req.body);
      const service = pedidoFactory();
      const result = await service.requestDoacao(data);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async answerDoacao(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = AnswerPedidoDoacaoSchema.parse(req.body);
      const service = pedidoFactory();
      // Inject completion timestamp if status is finished
      const updated = await service.answerPedidoDoacao(Number(id), { ...data, data_resposta: new Date() });
      return res.json(updated);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  // Inter-Hospitais
  async requestBolsas(req: Request, res: Response) {
    try {
      const data = CreatePedidoEntreHospitaisSchema.parse(req.body);
      const service = pedidoFactory();
      const result = await service.requestBolsas(data);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async answerBolsas(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = AnswerPedidoEntreSchema.parse(req.body);
      const service = pedidoFactory();
      const updated = await service.answerPedidoBolsas(Number(id), { ...data, data_resposta: new Date() });
      return res.json(updated);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || error });
    }
  }
}
