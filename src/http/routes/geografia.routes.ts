import { Router } from 'express';
import { GeografiaController } from '../controllers/GeografiaController';
import { authMiddleware } from '../middleware/authMiddleware';

const routes = Router();
const controller = new GeografiaController();
// ======================
// PROVÍNCIAS
// ======================

// Criar
routes.post('/provincias', controller.createProvincia);

// Listar todas
routes.get('/provincias', controller.getAllProvincias);

// Buscar por ID
routes.get('/provincias/:id', controller.getProvinciaById);

// Atualizar
routes.put('/provincias/:id', controller.updateProvincia);

// Deletar
routes.delete('/provincias/:id', controller.deleteProvincia);


// ======================
// MUNICÍPIOS
// ======================

// Criar
routes.post('/municipios', controller.createMunicipio);

// Listar todos
routes.get('/municipios', controller.getAllMunicipios);

// Buscar por ID
routes.get('/municipios/:id', controller.getMunicipioById);

// Atualizar
routes.put('/municipios/:id', controller.updateMunicipio);

// Deletar
routes.delete('/municipios/:id', controller.deleteMunicipio);


export { routes as geografiaRoutes };