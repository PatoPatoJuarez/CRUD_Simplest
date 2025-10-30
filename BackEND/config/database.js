import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_DATABASE || 'GestionJuicios',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
    instanceName: process.env.DB_INSTANCE || undefined
  },
  // Si hay usuario/contraseña usa autenticación SQL, sino usa Windows Auth
  ...((process.env.DB_USER && process.env.DB_USER !== '') ? {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  } : {
    // Windows Authentication (Trusted Connection)
    options: {
      ...{
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true,
        trustedConnection: true
      }
    }
  })
};

// Pool de conexiones
let pool = null;

export const getConnection = async () => {
  try {
    if (pool) {
      return pool;
    }
    
    pool = await sql.connect(config);
    console.log('✅ Conectado a SQL Server - Base de datos:', config.database);
    return pool;
  } catch (error) {
    console.error('❌ Error al conectar con SQL Server:', error.message);
    throw error;
  }
};

export const closeConnection = async () => {
  try {
    if (pool) {
      await pool.close();
      pool = null;
      console.log('Conexión a SQL Server cerrada');
    }
  } catch (error) {
    console.error('Error al cerrar conexión:', error.message);
  }
};

export { sql };
