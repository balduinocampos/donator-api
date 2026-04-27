import { Router } from 'express';
import { GamificacaoController } from '../controllers/GamificacaoController';
import { authMiddleware } from '../middleware/authMiddleware';

const routes = Router();
const controller = new GamificacaoController();

routes.use(authMiddleware);

// ======================
// ESTATÍSTICAS
// ======================
routes.get('/status/:id_doador', controller.getStatus.bind(controller));
routes.get('/doador/:id_doador', controller.getEstatisticaDoador.bind(controller));
routes.get('/estatistica/:id', controller.getEstatisticaById.bind(controller));
routes.get('/ranking/top', controller.getTopDoador.bind(controller));

// ======================
// REGRAS
// ======================
routes.get('/regras', controller.getRankLevels.bind(controller));
routes.get('/regras/:id', controller.getRegraById.bind(controller));
routes.post('/regras', controller.createRegra.bind(controller));
routes.put('/regras/:id', controller.updateRegra.bind(controller));
routes.delete('/regras/:id', controller.deleteRegra.bind(controller));

// ======================
// AÇÕES (DOAÇÃO)
// ======================
routes.post('/doacao/:id_doador', controller.pingDonation.bind(controller));

export { routes as gamificacaoRoutes };