import { Router } from 'express';
import { AgendaController } from '../controllers/AgendaController';
import { authMiddleware } from '../middleware/authMiddleware';

const routes = Router();
const controller = new AgendaController();

routes.use(authMiddleware);

routes.post('/', controller.schedule);
routes.put('/:id/process', controller.processSchedule);
routes.get('/doador/:id_doador', controller.listMine);
routes.get('/hospital/:id_hospital', controller.listHospital);

export { routes as agendaRoutes };
