import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { 
  crearHistorial, 
  obtenerHistorial, 
  obtenerHistorialPorId, 
  actualizarHistorial, 
  eliminarHistorial 
} from '../controllers/historialController.js';
import { validate, historialSchema } from '../validators/validators.js';

const router = express.Router();

// Todas las rutas están protegidas por JWT
router.use(authenticateToken);

// Rutas CRUD de historial con validaciones
router.post('/juicio/:juicioId', validate(historialSchema), crearHistorial);
router.get('/juicio/:juicioId', obtenerHistorial);
router.get('/:id/juicio/:juicioId', obtenerHistorialPorId);
router.put('/:id/juicio/:juicioId', validate(historialSchema), actualizarHistorial);
router.delete('/:id/juicio/:juicioId', eliminarHistorial);

export default router;
