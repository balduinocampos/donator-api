import { Router } from 'express';
import { DoadorController } from '../controllers/DoadorController';
import { authMiddleware } from '../middleware/authMiddleware';

const routes = Router();
const controller = new DoadorController();

// ======================
// ROTAS PÚBLICAS
// ======================
routes.post('/register', controller.register.bind(controller));
routes.post('/login', controller.login.bind(controller));
routes.post('/reset-password', controller.resetPassword.bind(controller));

// ======================
// ROTAS PROTEGIDAS
// ======================
routes.use(authMiddleware);

// 🔎 BUSCAS (colocar antes de /:id pra evitar conflito)
routes.get('/email', controller.getByEmail.bind(controller)); 
routes.get('/telefone', controller.getByTelefone.bind(controller));

// 📋 LISTAGEM
routes.get('/', controller.getAllDoadores.bind(controller));

// 👤 PERFIL
routes.get('/:id', controller.getProfile.bind(controller));
routes.put('/:id', controller.updateInfo.bind(controller));
routes.delete('/:id', controller.deleteDoador.bind(controller));

// 🔐 SEGURANÇA
routes.post('/:id/change-password', controller.changePassword.bind(controller));

export { routes as doadorRoutes };