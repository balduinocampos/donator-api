import { Request, Response } from 'express';
import { CreateProvinciaSchema, CreateMunicipioSchema } from '../schemas/geografiaSchema';
import { geografiaFactory } from '../factories/geografiaFactory';

export class GeografiaController {
  async createProvincia(req: Request, res: Response) {
    try {
      const data = CreateProvinciaSchema.parse(req.body);
      const service = geografiaFactory();
      const result = await service.createProvincia(data);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async createMunicipio(req: Request, res: Response) {
    try {
      const data = CreateMunicipioSchema.parse(req.body);
      const service = geografiaFactory();
      const result = await service.createMunicipio(data);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getAllProvincias(req: Request, res: Response) {
    try {
      const service = geografiaFactory();
      const provincias = await service.getAllProvincias();
      return res.json(provincias);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
