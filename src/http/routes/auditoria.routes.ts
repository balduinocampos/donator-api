import { Router } from 'express';
import { AuditoriaController } from '../controllers/AuditoriaController';
import { authMiddleware } from '../middleware/authMiddleware';

const routes = Router();
const controller = new AuditoriaController();

routes.use(authMiddleware);

// ======================
// LOGS
// ======================
routes.post('/log', controller.registerLog.bind(controller));
routes.get('/log', controller.getAllLogs.bind(controller));
routes.get('/log/:id', controller.getLogById.bind(controller));
routes.get('/log/hospital/:id_hospital', controller.getLogsByHospital.bind(controller));
routes.get('/log/doador/:id_doador', controller.getLogsByDoador.bind(controller));
routes.put('/log/:id', controller.updateLog.bind(controller));
routes.delete('/log/:id', controller.deleteLog.bind(controller));

// ======================
// SESSÃO ADMIN
// ======================
routes.post('/admin-session', controller.registerAdminSession.bind(controller));
routes.get('/admin-session', controller.getAllAdminSessions.bind(controller));
routes.get('/admin-session/:id', controller.getAdminSessionById.bind(controller));
routes.get('/admin-session/hospital/:id_hospital', controller.getAdminSessionsByHospital.bind(controller));
routes.put('/admin-session/:id', controller.updateAdminSession.bind(controller));
routes.delete('/admin-session/:id', controller.deleteAdminSession.bind(controller));

// ======================
// SESSÃO DOADOR
// ======================
routes.post('/doador-session', controller.registerDoadorSession.bind(controller));
routes.get('/doador-session', controller.getAllDoadorSessions.bind(controller));
routes.get('/doador-session/:id', controller.getDoadorSessionById.bind(controller));
routes.get('/doador-session/doador/:id_doador', controller.getDoadorSessionsByDoador.bind(controller));
routes.put('/doador-session/:id', controller.updateDoadorSession.bind(controller));
routes.delete('/doador-session/:id', controller.deleteDoadorSession.bind(controller));

export { routes as auditoriaRoutes };