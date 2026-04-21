import { Request, Response } from 'express';
import { CreateDoadorSchema, UpdateDoadorSchema } from '../schemas/doadorSchema';
import { AuthLoginSchema } from '../schemas/authSchema';
import { daodorFactory } from '../factories/doadorFactory';

export class DoadorController {
  async register(req: Request, res: Response) {
    try {
      const data = CreateDoadorSchema.parse(req.body);
      const service = daodorFactory(); // Using user's typod export
      const result = await service.createDoador(data);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = daodorFactory();
      const doador = await service.getDoadorById(Number(id));
      if (!doador) return res.status(404).json({ error: 'Doador não encontrado' });
      return res.json(doador);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateInfo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = UpdateDoadorSchema.parse(req.body);
      const service = daodorFactory();
      const updated = await service.updateDoador(Number(id), data);
      return res.json(updated);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, senha } = AuthLoginSchema.parse(req.body);
      const service = daodorFactory();
      const result = await service.login(email, senha);

      // Injeta Token via HttpOnly Cookie (1 dia)
      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 
      });

      return res.json({ message: 'Login com sucesso', user: result.user, token: result.token });
    } catch (error: any) {
      if(error.statusCode) return res.status(error.statusCode).json({ error: error.message });
      return res.status(400).json({ error: error.message || error });
    }
  }
}
