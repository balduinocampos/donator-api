import { Request, Response } from 'express';
import { CreateMensagemSchema, DispatchNotificacaoSchema } from '../schemas/comunicacaoSchema';
import { comunicacaoFactory } from '../factories/comunicacaoFactory';

export class ComunicacaoController {
  async send(req: Request, res: Response) {
    try {
      const data = CreateMensagemSchema.parse(req.body);
      const service = comunicacaoFactory();
      const result = await service.sendMensagem(data);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async readMessage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = comunicacaoFactory();
      const updated = await service.readMensagem(Number(id));
      return res.json(updated);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async notifyDoador(req: Request, res: Response) {
    try {
      const data = DispatchNotificacaoSchema.parse(req.body);
      const service = comunicacaoFactory();
      const result = await service.dispatchNotificacao(data);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || error });
    }
  }
}
