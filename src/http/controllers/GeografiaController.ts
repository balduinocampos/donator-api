import { Request, Response } from 'express';
import {
  CreateProvinciaSchema,
  CreateMunicipioSchema,
  UpdateProvinciaSchema,
  UpdateMunicipioSchema
} from '../schemas/geografiaSchema';

import { geografiaFactory } from '../factories/geografiaFactory';
import { AppError } from '@/shared/error';
import { ZodError } from 'zod';

export class GeografiaController {

  // ======================
  // PROVÍNCIAS
  // ======================

  async createProvincia(req: Request, res: Response) {
    try {
      const data = CreateProvinciaSchema.parse(req.body);
      const service = geografiaFactory();

      const result = await service.createProvincia(data);
      return res.status(201).json(result);

    } catch (error: any) {
      if (error instanceof ZodError) throw AppError.badRequest('Validation failed', error.issues);
      if (error instanceof AppError) throw error;
      throw AppError.internal('Erro ao criar província', error);
    }
  }

  async getAllProvincias(req: Request, res: Response) {
    try {
      const service = geografiaFactory();

      const provincias = await service.getAllProvincias();
      if (provincias.length === 0) return res.status(204).send({message:[]});
      return res.status(200).json(provincias);

    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw AppError.internal('Erro ao buscar províncias', error);
    }
  }

  async getProvinciaById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = geografiaFactory();

      const provincia = await service.getProvinciaById(Number(id));
      if (!provincia) return res.status(404).json({ message: 'Província não encontrada' });
      return res.status(200).json(provincia);

    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw AppError.internal('Erro ao buscar província', error);
    }
  }

  async updateProvincia(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = UpdateProvinciaSchema.parse(req.body);
      const service = geografiaFactory();

      const updated = await service.updateProvincia(Number(id), data);

      return res.status(200).json(updated);

    } catch (error: any) {
      if (error instanceof ZodError) throw AppError.badRequest('Validation failed', error.issues);
      if (error instanceof AppError) throw error;
      throw AppError.internal('Erro ao atualizar província', error);
    }
  }

  async deleteProvincia(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = geografiaFactory();

      await service.deleteProvincia(Number(id));
      return res.status(204).send();

    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw AppError.internal('Erro ao deletar província', error);
    }
  }

  // ======================
  // MUNICÍPIOS
  // ======================

  async createMunicipio(req: Request, res: Response) {
    try {
      const data = CreateMunicipioSchema.parse(req.body);
      const service = geografiaFactory();

      const result = await service.createMunicipio(data);
      return res.status(201).json(result);

    } catch (error: any) {
      if (error instanceof ZodError) throw AppError.badRequest('Validation failed', error.issues);
      if (error instanceof AppError) throw error;
      throw AppError.internal('Erro ao criar município', error);
    }
  }

  async getAllMunicipios(req: Request, res: Response) {
    try {
      const service = geografiaFactory();

      const municipios = await service.getAllMunicipios();
      if (municipios.length === 0) return res.status(204).send({message:[]});
      return res.status(200).json(municipios);

    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw AppError.internal('Erro ao buscar municípios', error);
    }
  }

  async getMunicipioById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = geografiaFactory();

      const municipio = await service.getMunicipioById(Number(id));
      if (!municipio) return res.status(404).json({ message: 'Município não encontrado' });
      return res.status(200).json(municipio);

    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw AppError.internal('Erro ao buscar município', error);
    }
  }

  async updateMunicipio(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = UpdateMunicipioSchema.parse(req.body);
      const service = geografiaFactory();

      const updated = await service.updateMunicipio(Number(id), data);
      return res.status(200).json(updated);

    } catch (error: any) {
      if (error instanceof ZodError) throw AppError.badRequest('Validation failed', error.issues);
      if (error instanceof AppError) throw error;
      throw AppError.internal('Erro ao atualizar município', error);
    }
  }

  async deleteMunicipio(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = geografiaFactory();

      await service.deleteMunicipio(Number(id));
      return res.status(204).send();

    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw AppError.internal('Erro ao deletar município', error);
    }
  }
}