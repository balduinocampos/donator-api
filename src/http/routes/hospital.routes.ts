import { Router } from 'express';
import { HospitalController } from '../controllers/HospitalController';
import { authMiddleware } from '../middleware/authMiddleware';

const routes = Router();
const controller = new HospitalController();

// Públicas
routes.post('/register', controller.register);
routes.post('/login', controller.login);

// Protegidas
routes.use(authMiddleware);
routes.get('/:id', controller.getProfile);
routes.put('/:id', controller.updateInfo);

export { routes as hospitalRoutes };
