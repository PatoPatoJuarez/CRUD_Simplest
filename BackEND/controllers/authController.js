import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwtUtils.js';
import { AbogadoModel } from '../models/abogadoModel.js';

// Registro de usuario
export const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar si el usuario ya existe
    const userExists = await AbogadoModel.findByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear abogado
    const newAbogado = await AbogadoModel.create({
      nombre,
      email,
      contraseña: hashedPassword
    });

    // Generar token
    const token = generateToken({ 
      id: newAbogado.ID_Abogado, 
      email: newAbogado.email 
    });

    res.status(201).json({
      message: 'Abogado registrado exitosamente',
      token,
      user: {
        id: newAbogado.ID_Abogado,
        nombre: newAbogado.nombre,
        email: newAbogado.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar abogado', error: error.message });
  }
};

// Login de usuario
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar abogado
    const abogado = await AbogadoModel.findByEmail(email);
    if (!abogado) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, abogado.Contraseña);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar token
    const token = generateToken({ 
      id: abogado.ID_Abogado, 
      email: abogado.Email 
    });

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: abogado.ID_Abogado,
        nombre: abogado.Nombre,
        email: abogado.Email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};
