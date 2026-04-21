import { Request, Response } from 'express';
import { CreateLogAcessoSchema } from '../schemas/auditoriaSchema';
import { auditoriaFactory } from '../factories/auditoriaFactory';

export class AuditoriaController {
  async registerLog(req: Request, res: Response) {
    try {
      const data = CreateLogAcessoSchema.parse(req.body);
      const service = auditoriaFactory();
      const result = await service.createLog(data);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || error });
    }
  }
}
