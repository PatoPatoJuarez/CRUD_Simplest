import { getConnection, sql } from '../config/database.js';

export const AbogadoModel = {
  // Crear nuevo abogado (registro)
  async create({ nombre, email, contraseña }) {
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input('nombre', sql.NVarChar(100), nombre)
        .input('email', sql.NVarChar(100), email)
        .input('contraseña', sql.NVarChar(255), contraseña)
        .query(`
          INSERT INTO Abogado (Nombre, Email, Contraseña)
          VALUES (@nombre, @email, @contraseña);
          SELECT SCOPE_IDENTITY() AS ID_Abogado;
        `);
      
      return {
        ID_Abogado: result.recordset[0].ID_Abogado,
        nombre,
        email
      };
    } catch (error) {
      throw new Error('Error al crear abogado: ' + error.message);
    }
  },

  // Buscar abogado por email
  async findByEmail(email) {
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input('email', sql.NVarChar(100), email)
        .query('SELECT * FROM Abogado WHERE Email = @email');
      
      return result.recordset[0] || null;
    } catch (error) {
      throw new Error('Error al buscar abogado: ' + error.message);
    }
  },

  // Buscar abogado por ID
  async findById(id) {
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT ID_Abogado, Nombre, Email, FechaCreacion FROM Abogado WHERE ID_Abogado = @id');
      
      return result.recordset[0] || null;
    } catch (error) {
      throw new Error('Error al buscar abogado por ID: ' + error.message);
    }
  },

  // Obtener todos los abogados
  async getAll() {
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .query('SELECT ID_Abogado, Nombre, Email, FechaCreacion FROM Abogado');
      
      return result.recordset;
    } catch (error) {
      throw new Error('Error al obtener abogados: ' + error.message);
    }
  }
};
