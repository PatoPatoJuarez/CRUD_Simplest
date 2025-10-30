import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta protegida - Obtener perfil de usuario
router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    message: 'Perfil de usuario',
    user: req.user
  });
});

// Ruta protegida - Obtener todos los usuarios (ejemplo)
router.get('/', authenticateToken, (req, res) => {
  res.json({
    message: 'Lista de usuarios',
    users: [
      { id: req.user.id, email: req.user.email }
    ]
  });
});

// Ruta protegida - Actualizar usuario
router.put('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  
  if (req.user.id !== parseInt(id)) {
    return res.status(403).json({ message: 'No autorizado para actualizar este usuario' });
  }

  res.json({
    message: 'Usuario actualizado',
    data: req.body
  });
});

// Ruta protegida - Eliminar usuario
router.delete('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  
  if (req.user.id !== parseInt(id)) {
    return res.status(403).json({ message: 'No autorizado para eliminar este usuario' });
  }

  res.json({
    message: 'Usuario eliminado',
    id
  });
});

export default router;
