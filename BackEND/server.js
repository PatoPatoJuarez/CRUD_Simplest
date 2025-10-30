import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import juicioRoutes from './routes/juicioRoutes.js';
import historialRoutes from './routes/historialRoutes.js';
import { getConnection, closeConnection } from './config/database.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend API - Sistema de Gestión de Juicios',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth (register, login)',
      users: '/api/users',
      juicios: '/api/juicios (requiere token)',
      historial: '/api/historial (requiere token)'
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/juicios', juicioRoutes);
app.use('/api/historial', historialRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Error en el servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Iniciar servidor
app.listen(PORT, async () => {
  console.log(`✅ Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📦 Entorno: ${process.env.NODE_ENV}`);
  console.log('🔌 Intentando conectar a SQL Server...');
  
  // Probar conexión a la base de datos
  try {
    await getConnection();
    console.log('✅ Base de datos conectada exitosamente');
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
  }
});

// Cerrar conexión al terminar el proceso
process.on('SIGINT', async () => {
  await closeConnection();
  process.exit(0);
});
