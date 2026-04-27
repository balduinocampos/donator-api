import { Router } from 'express';
import { StockController } from '../controllers/StockController';
import { authMiddleware } from '../middleware/authMiddleware';

const routes = Router();
const controller = new StockController();

routes.use(authMiddleware);

// ======================
// STOCK
// ======================
routes.post('/', controller.initStock);
routes.get('/', controller.getAllStocks);
routes.get('/:id', controller.getStock);
routes.get('/hospital/:id_hospital', controller.getHospitalStock);
routes.put('/:id', controller.updateStock);
routes.delete('/:id', controller.deleteStock);

// ======================
// MOVIMENTOS
// ======================
routes.post('/movimento', controller.transact);
routes.get('/movimento', controller.getAllMovimentos);
routes.get('/movimento/:id', controller.getMovimentoById);
routes.get('/movimento/stock/:id_stock', controller.getMovimentos);
routes.delete('/movimento/:id', controller.deleteMovimento);

export { routes as stockRoutes };