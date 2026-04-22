import { Request, Response } from 'express';
import { CreateHospitalSchema, UpdateHospitalSchema } from '../schemas/hospitalSchema';
import { AuthLoginSchema } from '../schemas/authSchema';
import { hospitalFactory } from '../factories/hospitalFactory';
import { auditoriaFactory } from '../factories/auditoriaFactory';

export class HospitalController {
  async register(req: Request, res: Response) {
    try {
      const data = CreateHospitalSchema.parse(req.body);
      const service = hospitalFactory();
      const result = await service.createHospital(data);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = hospitalFactory();
      const hospital = await service.getHospitalById(Number(id));
      if (!hospital) return res.status(404).json({ error: 'Hospital não encontrado' });
      return res.json(hospital);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAllHospitais(req: Request, res: Response) {
    try {
      const service = hospitalFactory();
      const hospitais = await service.getAllHospitais();
      return res.json(hospitais);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateInfo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = UpdateHospitalSchema.parse(req.body);
      const service = hospitalFactory();
      const updated = await service.updateHospital(Number(id), data);
      return res.json(updated);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async deleteHospital(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = hospitalFactory();
      await service.deleteHospital(Number(id));
      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, senha } = AuthLoginSchema.parse(req.body);
      const service = hospitalFactory();
      const result = await service.login(email, senha);

      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000
      });

      const auditoria = auditoriaFactory();
      await auditoria.registerAdminSession({
        id_sessao: result.token,
        id_usuario: result.user.id_hospital,
        ip_origem: req.ip || '0.0.0.0',
        user_agent: req.headers['user-agent'] || 'Desconhecido',
        data_expiracao: new Date(Date.now() + 24 * 60 * 60 * 1000)
      });
      await auditoria.createLog({
        id_hospital: result.user.id_hospital,
        acao: 'LOGIN',
        descricao: 'Hospital efetuou login com sucesso',
        ip_origem: req.ip || '0.0.0.0'
      });

      return res.json({ message: 'Login com sucesso', user: result.user, token: result.token });
    } catch (error: any) {
      if (error.statusCode) return res.status(error.statusCode).json({ error: error.message });
      return res.status(400).json({ error: error.message || error });
    }
  }
}
