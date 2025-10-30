import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validate, registerSchema, loginSchema } from '../validators/validators.js';

const router = express.Router();

// Rutas de autenticación con validaciones
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;
