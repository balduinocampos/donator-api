import { Request, Response } from 'express';
import { gamificacaoFactory } from '../factories/gamificacaoFactory';

export class GamificacaoController {
  async getStatus(req: Request, res: Response) {
    try {
      const { id_doador } = req.params;
      const service = gamificacaoFactory();
      // Ensure it exists then return
      const result = await service.ensureEstatisticaExists(Number(id_doador));
      return res.json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message || error });
    }
  }

  async getRankLevels(req: Request, res: Response) {
    try {
      const service = gamificacaoFactory();
      const result = await service.getAllRegras();
      return res.json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message || error });
    }
  }

  // Internally this is often called by Agenda completion, but exposing to tests
  async pingDonation(req: Request, res: Response) {
    try {
      const { id_doador } = req.params;
      const service = gamificacaoFactory();
      const result = await service.incrementDonationStats(Number(id_doador));
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || error });
    }
  }
}
