import { Router } from 'express';
import { ComunicacaoController } from '../controllers/ComunicacaoController';
import { authMiddleware } from '../middleware/authMiddleware';

const routes = Router();
const controller = new ComunicacaoController();

// ======================
// MENSAGENS
// ======================
routes.post('/mensagem', controller.send.bind(controller));
routes.put('/mensagem/:id/lida', controller.readMessage.bind(controller));
routes.get('/mensagem/inbox/:id_hospital', controller.getInbox.bind(controller));
routes.get('/mensagem/enviadas/:id_hospital', controller.getSent.bind(controller));
routes.get('/mensagem', controller.getAllMessages.bind(controller));
routes.delete('/mensagem/:id', controller.deleteMessage.bind(controller));

// ======================
// NOTIFICAÇÕES
// ======================
routes.post('/notificacao', controller.notifyDoador.bind(controller));
routes.get('/notificacao', controller.getAllNotificacoes.bind(controller));
routes.get('/notificacao/doador/:id_doador', controller.getNotificacoesDoador.bind(controller));
routes.get('/notificacao/pedido/:id_pedido', controller.getNotificacoesPedido.bind(controller));
routes.delete('/notificacao/:id', controller.deleteNotificacao.bind(controller));

export { routes as comunicacaoRoutes };