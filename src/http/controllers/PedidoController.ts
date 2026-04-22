import { Request, Response } from 'express';
import {
  CreatePedidoSchema, CreatePedidoDoacaoSchema, AnswerPedidoDoacaoSchema,
  CreatePedidoEntreHospitaisSchema, AnswerPedidoEntreSchema, UpdatePedidoSchema
} from '../schemas/pedidoSchema';
import { pedidoFactory } from '../factories/pedidoFactory';
import { auditoriaFactory } from '../factories/auditoriaFactory';

export class PedidoController {
  // === PEDIDO URGÊNCIA/SMS ===
  async openPedido(req: Request, res: Response) {
    try {
      const data = CreatePedidoSchema.parse(req.body);
      const service = pedidoFactory();
      const result = await service.createPedido(data);

      const auditoria = auditoriaFactory();
      await auditoria.createLog({
        id_hospital: data.id_hospital,
        acao: 'NOVO_PEDIDO_URGENTE',
        descricao: `Novo pedido urgente criado para tipo ${data.tipo_sanguineo_necessario}`,
        ip_origem: req.ip || '0.0.0.0'
      });

      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async updatePedido(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = UpdatePedidoSchema.parse(req.body);
      const service = pedidoFactory();
      const updated = await service.updatePedido(Number(id), data);
      return res.json(updated);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async getHospitalPedidos(req: Request, res: Response) {
    try {
      const { id_hospital } = req.params;
      const service = pedidoFactory();
      const pedidos = await service.getHospitalPedidos(Number(id_hospital));
      return res.json(pedidos);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // === PEDIDO DOAÇÃO (Doador -> Hospital) ===
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
      const updated = await service.answerPedidoDoacao(Number(id), { ...data, data_resposta: new Date() });
      return res.json(updated);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async getDoacoesByDoador(req: Request, res: Response) {
    try {
      const { id_doador } = req.params;
      const service = pedidoFactory();
      const pedidos = await service.getDoacoesByDoador(Number(id_doador));
      return res.json(pedidos);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // === PEDIDO ENTRE HOSPITAIS ===
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
