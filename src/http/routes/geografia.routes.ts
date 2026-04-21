import { Router } from 'express';
import { GeografiaController } from '../controllers/GeografiaController';
import { authMiddleware } from '../middleware/authMiddleware';

const routes = Router();
const controller = new GeografiaController();

routes.use(authMiddleware);

routes.get('/provincias', controller.getAllProvincias);
routes.post('/provincias', controller.createProvincia);
routes.post('/municipios', controller.createMunicipio);

export { routes as geografiaRoutes };
