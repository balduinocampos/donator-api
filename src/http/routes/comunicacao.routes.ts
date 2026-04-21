import { Router } from 'express';
import { ComunicacaoController } from '../controllers/ComunicacaoController';
import { authMiddleware } from '../middleware/authMiddleware';

const routes = Router();
const controller = new ComunicacaoController();

routes.use(authMiddleware);

routes.post('/mensagem', controller.send);
routes.put('/mensagem/:id/lida', controller.readMessage);
routes.post('/notificacao', controller.notifyDoador);

export { routes as comunicacaoRoutes };
