import { Router } from 'express';
import { PedidoController } from '../controllers/PedidoController';
import { authMiddleware } from '../middleware/authMiddleware';

const routes = Router();
const controller = new PedidoController();

routes.use(authMiddleware);

// ======================================================
// 📌 PEDIDOS URGENTES (HOSPITAL -> SISTEMA)
// ======================================================

routes.post('/', controller.openPedido);
routes.get('/', controller.getAllPedidos);
routes.get('/:id', controller.getPedidoById);
routes.get('/hospital/:id_hospital', controller.getHospitalPedidos);
routes.put('/:id', controller.updatePedido);
routes.delete('/:id', controller.deletePedido);


// ======================================================
// 📌 PEDIDOS DE DOAÇÃO (HOSPITAL -> DOADOR)
// ======================================================

routes.post('/doacao', controller.requestDoacao);
routes.get('/doacao', controller.getAllDoacoes);
routes.get('/doacao/:id_doador', controller.getDoacoesByDoador);
routes.get('/doacao/hospital/:id_hospital', controller.getDoacoesByHospital);
routes.put('/doacao/:id/answer', controller.answerDoacao);
routes.delete('/doacao/:id', controller.deletePedidoDoacao);


// ======================================================
// 📌 PEDIDOS ENTRE HOSPITAIS
// ======================================================

routes.post('/hospitais', controller.requestBolsas);
routes.get('/hospitais', controller.getAllEntreHospitais);
routes.get('/hospitais/:id', controller.getPedidoEntreById);
routes.get('/hospitais/solicitante/:id', controller.getBySolicitante);
routes.get('/hospitais/fornecedor/:id', controller.getByFornecedor);
routes.put('/hospitais/:id/answer', controller.answerBolsas);
routes.delete('/hospitais/:id', controller.deletePedidoEntre);


export { routes as pedidoRoutes };