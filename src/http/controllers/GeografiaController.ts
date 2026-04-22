import { Request, Response } from 'express';
import { CreateProvinciaSchema, CreateMunicipioSchema, UpdateProvinciaSchema, UpdateMunicipioSchema } from '../schemas/geografiaSchema';
import { geografiaFactory } from '../factories/geografiaFactory';

export class GeografiaController {
  // === PROVINCIAS ===
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

  async getAllProvincias(req: Request, res: Response) {
    try {
      const service = geografiaFactory();
      const provincias = await service.getAllProvincias();
      return res.json(provincias);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getProvinciaById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = geografiaFactory();
      const provincia = await service.getProvinciaById(Number(id));
      if (!provincia) return res.status(404).json({ error: 'Província não encontrada' });
      return res.json(provincia);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateProvincia(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = UpdateProvinciaSchema.parse(req.body);
      const service = geografiaFactory();
      const updated = await service.updateProvincia(Number(id), data);
      return res.json(updated);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deleteProvincia(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = geografiaFactory();
      await service.deleteProvincia(Number(id));
      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // === MUNICIPIOS ===
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

  async getAllMunicipios(req: Request, res: Response) {
    try {
      const service = geografiaFactory();
      const municipios = await service.getAllMunicipios();
      return res.json(municipios);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getMunicipioById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = geografiaFactory();
      const municipio = await service.getMunicipioById(Number(id));
      if (!municipio) return res.status(404).json({ error: 'Município não encontrado' });
      return res.json(municipio);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateMunicipio(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = UpdateMunicipioSchema.parse(req.body);
      const service = geografiaFactory();
      const updated = await service.updateMunicipio(Number(id), data);
      return res.json(updated);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deleteMunicipio(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = geografiaFactory();
      await service.deleteMunicipio(Number(id));
      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
