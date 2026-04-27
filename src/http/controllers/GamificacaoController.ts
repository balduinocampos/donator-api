import { Request, Response } from 'express';
import { gamificacaoFactory } from '../factories/gamificacaoFactory';
import { AppError } from '@/shared/error';
import { ZodError } from 'zod';

export class GamificacaoController {

  // ======================
  // ESTATÍSTICAS
  // ======================

  async getStatus(req: Request, res: Response) {
    try {
      const { id_doador } = req.params;
      const service = gamificacaoFactory();

      const result = await service.ensureEstatisticaExists(Number(id_doador));

      if (!result) throw AppError.notFound('Doador não encontrado');

      return res.status(200).json(result);

    } catch (error) {
       if (error instanceof ZodError) {
              const formatted = error.issues.map(err => ({
                field: err.path[0],
                message: err.message,
              }));
              throw AppError.badRequest('Validation failed', formatted);
            }
      
            if (error instanceof AppError) throw error;
      
            throw AppError.internal('Erro interno, tente novamente mais tarde', error);
          
    }
  }

  // ✔ NOVO
  async getEstatisticaDoador(req: Request, res: Response) {
    try {
      const { id_doador } = req.params;
      const service = gamificacaoFactory();

      const result = await service.getEstatisticaDoador(Number(id_doador));
      if (!result) throw AppError.notFound('Doador não encontrado');
      return res.status(200).json(result);

    } catch (error: any) {
      if (error instanceof ZodError) {
        const formatted = error.issues.map(err => ({
          field: err.path[0],
          message: err.message,
        }));
        throw AppError.badRequest('Validation failed', formatted);
      }

      if (error instanceof AppError) throw error;
      throw AppError.internal('Erro ao buscar estatística', error);
    }
  }

  // ✔ NOVO
  async getEstatisticaById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = gamificacaoFactory();

      const result = await service.getByIdEstatistica(Number(id));
      if (!result) throw AppError.notFound('Estatística não encontrada');
      return res.status(200).json(result);

    } catch (error: any) {
      if (error instanceof ZodError) {
        const formatted = error.issues.map(err => ({
          field: err.path[0],
          message: err.message,
        }));
        throw AppError.badRequest('Validation failed', formatted);
      }

      if (error instanceof AppError) throw error;
      throw AppError.internal('Erro ao buscar estatística', error);
    }
  }

  // ✔ NOVO
  async getTopDoador(req: Request, res: Response) {
    try {
      const service = gamificacaoFactory();

      const result = await service.getEstatisticasTopDoador();
      if (!result || result.length === 0) throw AppError.notFound('Nenhum doador encontrado');
      return res.status(200).json(result);

    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw AppError.internal('Erro ao buscar ranking', error);
    }
  }

  // ======================
  // REGRAS
  // ======================

  async getRankLevels(req: Request, res: Response) {
    try {
      const service = gamificacaoFactory();

      const result = await service.getAllRegras();
      if (!result || result.length === 0) throw AppError.notFound('Nenhuma regra encontrada');
      return res.status(200).json(result);

    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw AppError.internal('Erro ao buscar regras', error);
    }
  }

  // ✔ NOVO
  async getRegraById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = gamificacaoFactory();

      const result = await service.getRegraById(Number(id));
      if (!result) throw AppError.notFound('Regra não encontrada');
      return res.status(200).json(result);

    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw AppError.internal('Erro ao buscar regra', error);
    }
  }

  // ✔ NOVO
  async createRegra(req: Request, res: Response) {
    try {
      const service = gamificacaoFactory();

      const result = await service.createRegraClassificacao(req.body);
      return res.status(201).json(result);

    } catch (error) {
       if (error instanceof ZodError) {
        const formatted = error.issues.map(err => ({
          field: err.path[0],
          message: err.message,
        }));
        throw AppError.badRequest('Validation failed', formatted);
      }

      if (error instanceof AppError) throw error;

      throw AppError.internal('Erro interno, tente novamente mais tarde', error);
    
    }
  }

  // ✔ NOVO
  async updateRegra(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = gamificacaoFactory();

      const result = await service.updateRegraClassificacao(Number(id), req.body);
      return res.status(200).json(result);

    } catch (error) {
             if (error instanceof ZodError) {
        const formatted = error.issues.map(err => ({
          field: err.path[0],
          message: err.message,
        }));
        throw AppError.badRequest('Validation failed', formatted);
      }

      if (error instanceof AppError) throw error;

      throw AppError.internal('Erro interno, tente novamente mais tarde', error);
    }
  }

  // ✔ NOVO
  async deleteRegra(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = gamificacaoFactory();

      await service.deleteRegraClassificacao(Number(id));
      return res.status(204).send();

    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw AppError.internal('Erro ao deletar regra', error);
    }
  }

  // ======================
  // AÇÕES (DOAÇÃO)
  // ======================

  async pingDonation(req: Request, res: Response) {
    try {
      const { id_doador } = req.params;
      const service = gamificacaoFactory();

      const result = await service.incrementDonationStats(Number(id_doador));
      if (!result) throw AppError.notFound('Doador não encontrado');
      return res.status(200).json(result);

    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw AppError.internal('Erro ao registrar doação', error);
    }
  }
}