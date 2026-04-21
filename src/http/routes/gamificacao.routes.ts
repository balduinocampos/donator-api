import { Router } from 'express';
import { GamificacaoController } from '../controllers/GamificacaoController';
import { authMiddleware } from '../middleware/authMiddleware';

const routes = Router();
const controller = new GamificacaoController();

routes.use(authMiddleware);

routes.get('/status/:id_doador', controller.getStatus);
routes.get('/regras', controller.getRankLevels);
routes.post('/ping/:id_doador', controller.pingDonation);

export { routes as gamificacaoRoutes };
