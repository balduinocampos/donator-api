import { Router } from 'express';
import { StockController } from '../controllers/StockController';
import { authMiddleware } from '../middleware/authMiddleware';

const routes = Router();
const controller = new StockController();

routes.use(authMiddleware);

routes.post('/', controller.initStock);
routes.get('/hospital/:id_hospital', controller.getHospitalStock);
routes.post('/movimento', controller.transact);

export { routes as stockRoutes };
