import { Request, Response } from 'express';
import {
  CreateLogAcessoSchema,
  CreateSessaoSchema,
  idParam,
  updateSessaoSchema
} from '../schemas/auditoriaSchema';

import { auditoriaFactory } from '../factories/auditoriaFactory';
import {  ZodError } from 'zod';
import { AppError } from '@/shared/error';

export class AuditoriaController {

  // ======================
  // LOGS
  // ======================

  async registerLog(req: Request, res: Response) {
    try {
      const data = CreateLogAcessoSchema.parse(req.body);
      const service = auditoriaFactory();

      const result = await service.createLog(data);

      return res.status(201).json(result);
    } catch (error) {
       if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((err) => ({
          field: err.path[0],
          message: err.message,
        }));
        throw AppError.badRequest("Validation failed", formattedErrors);
      }

      if (error instanceof AppError) {
        throw error;
      }

      //console.error(error);
      throw AppError.internal("Erro interno, tente novamente mais tarde", error);

    }
  }

  async getAllLogs(req: Request, res: Response) {
    try {
      const service = auditoriaFactory();
      const logs = await service.getAllLogs();

      if (logs.length === 0) {
        return res.status(200).json({ message:[] });
      }

      return res.status(200).json(logs);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((err) => ({
          field: err.path[0],
          message: err.message,
        }));
        throw AppError.badRequest("Validation failed", formattedErrors);
      }

      if (error instanceof AppError) {
        throw error;
      }

      //console.error(error);
      throw AppError.internal("Erro interno, tente novamente mais tarde", error);

    }
  }

  async getLogById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = auditoriaFactory();

      const log = await service.getLogById(Number(id));

      if (!log) {
        return res.status(404).json({ message:"Log não encontrado" });
      }

      return res.status(200).json(log);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((err) => ({
          field: err.path[0],
          message: err.message,
        }));
        throw AppError.badRequest("Validation failed", formattedErrors);
      }

      if (error instanceof AppError) {
        throw error;
      }

      //console.error(error);
      throw AppError.internal("Erro interno, tente novamente mais tarde", error);
    }
  }

  async getLogsByHospital(req: Request, res: Response) {
    try {
      const { id_hospital } = req.params;
      const service = auditoriaFactory();

      const logs = await service.getLogsByHospital(Number(id_hospital));

      if (logs.length === 0) {
        return res.status(200).json({ message:[] });
      }
      
      return res.status(200).json(logs);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((err) => ({
          field: err.path[0],
          message: err.message,
        }));
        throw AppError.badRequest("Validation failed", formattedErrors);
      }

      if (error instanceof AppError) {
        throw error;
      }

      //console.error(error);
      throw AppError.internal("Erro interno, tente novamente mais tarde", error);
    }
  }

  async getLogsByDoador(req: Request, res: Response) {
    try {
      const { id_doador } = req.params;
      const service = auditoriaFactory();

      const logs = await service.getLogsByDoador(Number(id_doador));
      if (logs.length === 0) {
        return res.status(200).json({ message:[] });
      }
      return res.status(200).json(logs);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((err) => ({
          field: err.path[0],
          message: err.message,
        }));
        throw AppError.badRequest("Validation failed", formattedErrors);
      }

      if (error instanceof AppError) {
        throw error;
      }

      //console.error(error);
      throw AppError.internal("Erro interno, tente novamente mais tarde", error);
    }
  }

  async updateLog(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = auditoriaFactory();

      const updated = await service.updateLog(Number(id), req.body);
      return res.status(200).json(updated);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((err) => ({
          field: err.path[0],
          message: err.message,
        }));
        throw AppError.badRequest("Validation failed", formattedErrors);
      }

      if (error instanceof AppError) {
        throw error;
      }

      //console.error(error);
      throw AppError.internal("Erro interno, tente novamente mais tarde", error);
    }
  }

  async deleteLog(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = auditoriaFactory();

      await service.deleteLog(Number(id));
      return res.status(204).send();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((err) => ({
          field: err.path[0],
          message: err.message,
        }));
        throw AppError.badRequest("Validation failed", formattedErrors);
      }

      if (error instanceof AppError) {
        throw error;
      }

      //console.error(error);
      throw AppError.internal("Erro interno, tente novamente mais tarde", error);
    }
  }

  // ======================
  // SESSÃO ADMIN
  // ======================

  async registerAdminSession(req: Request, res: Response) {
    try {
      const data = CreateSessaoSchema.parse(req.body);
      const service = auditoriaFactory();

      const result = await service.registerAdminSession(data);
      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((err) => ({
          field: err.path[0],
          message: err.message,
        }));
        throw AppError.badRequest("Validation failed", formattedErrors);
      }

      if (error instanceof AppError) {
        throw error;
      }

      //console.error(error);
      throw AppError.internal("Erro interno, tente novamente mais tarde", error);
    }
  }

  async getAdminSessionById(req: Request, res: Response) {
    try {
      const { id } = idParam.parse(req.params);
      const service = auditoriaFactory();

      const session = await service.getAdminSessionById(id);
      if (!session) {
        return res.status(404).json({ message:"Sessão não encontrada" });
      }
      return res.status(200).json(session);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((err) => ({
          field: err.path[0],
          message: err.message,
        }));
        throw AppError.badRequest("Validation failed", formattedErrors);
      }

      if (error instanceof AppError) {
        throw error;
      }

      //console.error(error);
      throw AppError.internal("Erro interno, tente novamente mais tarde", error);

    }
  }

  async getAllAdminSessions(req: Request, res: Response) {
    try {
      const service = auditoriaFactory();
      const sessions = await service.getAllAdminSessions();

        if (sessions.length === 0) { 
          return res.status(200).json({ message:[] });
        }
      return res.status(200).json(sessions);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((err) => ({
          field: err.path[0],
          message: err.message,
        }));
        throw AppError.badRequest("Validation failed", formattedErrors);
      }

      if (error instanceof AppError) {
        throw error;
      }

      //console.error(error);
      throw AppError.internal("Erro interno, tente novamente mais tarde", error);
    }
  }

  async getAdminSessionsByHospital(req: Request, res: Response) {
    try {
      const { id_hospital } = req.params;
      const service = auditoriaFactory();

      const sessions = await service.getAdminSessionsByHospital(Number(id_hospital));

      if (sessions.length === 0) {
        return res.status(200).json({ message:[] });
      }
      return res.status(200).json(sessions);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((err) => ({
          field: err.path[0],
          message: err.message,
        }));
        throw AppError.badRequest("Validation failed", formattedErrors);
      }

      if (error instanceof AppError) {
        throw error;
      }

      //console.error(error);
      throw AppError.internal("Erro interno, tente novamente mais tarde", error);
    }
  }

  async updateAdminSession(req: Request, res: Response) {
    try {
      const { id } = idParam.parse(req.params);
      const service = auditoriaFactory();

      const updated = await service.updateAdminSession(id, updateSessaoSchema.parse(req.body));
      return res.status(200).json(updated);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((err) => ({
          field: err.path[0],
          message: err.message,
        }));
        throw AppError.badRequest("Validation failed", formattedErrors);
      }

      if (error instanceof AppError) {
        throw error;
      }

      //console.error(error);
      throw AppError.internal("Erro interno, tente novamente mais tarde", error);
    }
  }

  async deleteAdminSession(req: Request, res: Response) {
    try {
      const { id } = idParam.parse(req.params);
      const service = auditoriaFactory();

      await service.deleteAdminSession(id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((err) => ({
          field: err.path[0],
          message: err.message,
        }));
        throw AppError.badRequest("Validation failed", formattedErrors);
      }

      if (error instanceof AppError) {
        throw error;
      }

      //console.error(error);
      throw AppError.internal("Erro interno, tente novamente mais tarde", error);
    }
  }

  // ======================
  // SESSÃO DOADOR
  // ======================

  async registerDoadorSession(req: Request, res: Response) {
    try {
      const {data_expiracao, id_usuario, ip_origem, user_agent, id_sessao} = CreateSessaoSchema.parse(req.body);
      const service = auditoriaFactory();

      const result = await service.registerDoadorSession({data_expiracao, id_usuario, ip_origem, user_agent, id_sessao});
      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((err) => ({
          field: err.path[0],
          message: err.message,
        }));
        throw AppError.badRequest("Validation failed", formattedErrors);
      }

      if (error instanceof AppError) {
        throw error;
      }

      //console.error(error);
      throw AppError.internal("Erro interno, tente novamente mais tarde", error);
    }
  }

  async getDoadorSessionById(req: Request, res: Response) {
    try {
      const { id } = idParam.parse(req.params);
      const service = auditoriaFactory();

      const session = await service.getDoadorSessionById(id);

      if (!session) {
        return res.status(404).json({ message:"Sessão não encontrada" });
      }
      return res.status(200).json(session);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      //console.error(error);
      throw AppError.internal("Erro interno, tente novamente mais tarde", error);
    }
  }

  async getAllDoadorSessions(req: Request, res: Response) {
    try {
      const service = auditoriaFactory();
      const sessions = await service.getAllDoadorSessions();

      if (sessions.length === 0) {
        return res.status(200).json({ message:[] });
      }
      return res.status(200).json(sessions);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      //console.error(error);
      throw AppError.internal("Erro interno, tente novamente mais tarde", error);
    }
  }

  async getDoadorSessionsByDoador(req: Request, res: Response) {
    try {
      const { id_doador } = req.params;
      const service = auditoriaFactory();

      const sessions = await service.getDoadorSessionsByDoador(Number(id_doador));
      if (sessions.length === 0) {
        return res.status(200).json({ message:[] });
      }
      return res.status(200).json(sessions);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      //console.error(error);
      throw AppError.internal("Erro interno, tente novamente mais tarde", error);
    }
  }

  async updateDoadorSession(req: Request, res: Response) {
    try {
      const { id } = idParam.parse(req.params);
      const { data_expiracao, ip_origem, user_agent, id_usuario } = updateSessaoSchema.parse(req.body);
      const service = auditoriaFactory();

      const updated = await service.updateDoadorSession(id, {
        data_expiracao,
        ip_origem,
        user_agent,
        id_usuario
      });
      return res.status(200).json(updated);

    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((err) => ({
          field: err.path[0],
          message: err.message,
        }));
        throw AppError.badRequest("Validation failed", formattedErrors);
      }

      if (error instanceof AppError) {
        throw error;
      }
      //console.error(error);
      throw AppError.internal("Erro interno, tente novamente mais tarde", error);

    }
  }

  async deleteDoadorSession(req: Request, res: Response) {
    try {
      
      const { id } = idParam.parse(req.params);
      const service = auditoriaFactory();

      await service.deleteDoadorSession(id);

      return res.status(204).send();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      //console.error(error);
      throw AppError.internal("Erro interno, tente novamente mais tarde", error);
    }
  }
}