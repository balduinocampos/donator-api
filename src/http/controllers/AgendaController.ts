import { Request, Response } from 'express';
import { CreateAgendaSchema, UpdateAgendaSchema } from '../schemas/agendaSchema';
import { agendaFactory } from '../factories/agendaFactory';

export class AgendaController {
  async schedule(req: Request, res: Response) {
    try {
      const data = CreateAgendaSchema.parse(req.body);
      const service = agendaFactory();
      const result = await service.schedule(data);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async processSchedule(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = UpdateAgendaSchema.parse(req.body);
      const service = agendaFactory();
      // Service auto-creates "HistoricoDoacao" if status === 'concluida'
      const updated = await service.updateScheduleState(Number(id), data);
      return res.json(updated);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async listMine(req: Request, res: Response) {
    try {
      const { id_doador } = req.params;
      const service = agendaFactory();
      const agendas = await service.getDoadoresAgenda(Number(id_doador));
      return res.json(agendas);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async listHospital(req: Request, res: Response) {
    try {
      const { id_hospital } = req.params;
      const service = agendaFactory();
      const agendas = await service.getHospitalAgenda(Number(id_hospital));
      return res.json(agendas);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
