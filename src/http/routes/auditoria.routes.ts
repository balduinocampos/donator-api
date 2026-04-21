import { Router } from 'express';
import { AuditoriaController } from '../controllers/AuditoriaController';
import { authMiddleware } from '../middleware/authMiddleware';

const routes = Router();
const controller = new AuditoriaController();

routes.use(authMiddleware);

routes.post('/log', controller.registerLog);

export { routes as auditoriaRoutes };
