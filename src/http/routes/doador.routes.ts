import { Router } from 'express';
import { DoadorController } from '../controllers/DoadorController';
import { authMiddleware } from '../middleware/authMiddleware';

const routes = Router();
const controller = new DoadorController();

// Públicas
routes.post('/register', controller.register);
routes.post('/login', controller.login);

// Protegidas
routes.use(authMiddleware);
routes.get('/:id', controller.getProfile);
routes.put('/:id', controller.updateInfo);

export { routes as doadorRoutes };
