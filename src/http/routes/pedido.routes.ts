import { Router } from 'express';
import { PedidoController } from '../controllers/PedidoController';
import { authMiddleware } from '../middleware/authMiddleware';

const routes = Router();
const controller = new PedidoController();

routes.use(authMiddleware);

// Pedidos Urgentes
routes.post('/', controller.openPedido);

// Doação Direta
routes.post('/doacao', controller.requestDoacao);
routes.put('/doacao/:id/answer', controller.answerDoacao);

// Entre Hospitais
routes.post('/hospitais', controller.requestBolsas);
routes.put('/hospitais/:id/answer', controller.answerBolsas);

export { routes as pedidoRoutes };
