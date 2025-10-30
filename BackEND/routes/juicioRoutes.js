import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { 
  crearJuicio, 
  obtenerJuicios, 
  obtenerJuicioPorId, 
  actualizarJuicio, 
  eliminarJuicio 
} from '../controllers/juicioController.js';

const router = express.Router();

// Todas las rutas están protegidas por JWT
router.use(authenticateToken);

// Rutas CRUD de juicios
router.post('/', crearJuicio);
router.get('/', obtenerJuicios);
router.get('/:id', obtenerJuicioPorId);
router.put('/:id', actualizarJuicio);
router.delete('/:id', eliminarJuicio);

export default router;
