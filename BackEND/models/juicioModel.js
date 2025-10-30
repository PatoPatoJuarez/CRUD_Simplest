import { getConnection, sql } from '../config/database.js';

export const JuicioModel = {
  // Crear nuevo juicio
  async create({ ID_Abogado, caratula, fechaInicio }) {
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input('ID_Abogado', sql.Int, ID_Abogado)
        .input('caratula', sql.NVarChar(255), caratula)
        .input('fechaInicio', sql.Date, fechaInicio)
        .query(`
          INSERT INTO Juicio (ID_Abogado, Caratula, FechaInicio)
          VALUES (@ID_Abogado, @caratula, @fechaInicio);
          SELECT SCOPE_IDENTITY() AS ID_Juicio;
        `);
      
      return {
        ID_Juicio: result.recordset[0].ID_Juicio,
        ID_Abogado,
        caratula,
        fechaInicio
      };
    } catch (error) {
      throw new Error('Error al crear juicio: ' + error.message);
    }
  },

  // Obtener todos los juicios de un abogado con días transcurridos
  async getAllByAbogado(ID_Abogado) {
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input('ID_Abogado', sql.Int, ID_Abogado)
        .query(`
          SELECT 
            ID_Juicio,
            ID_Abogado,
            Caratula,
            FechaInicio,
            DATEDIFF(DAY, FechaInicio, GETDATE()) AS DiasTranscurridos,
            FechaCreacion
          FROM Juicio 
          WHERE ID_Abogado = @ID_Abogado
          ORDER BY FechaCreacion DESC
        `);
      
      return result.recordset;
    } catch (error) {
      throw new Error('Error al obtener juicios: ' + error.message);
    }
  },

  // Obtener un juicio por ID
  async getById(ID_Juicio, ID_Abogado) {
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input('ID_Juicio', sql.Int, ID_Juicio)
        .input('ID_Abogado', sql.Int, ID_Abogado)
        .query(`
          SELECT 
            ID_Juicio,
            ID_Abogado,
            Caratula,
            FechaInicio,
            DATEDIFF(DAY, FechaInicio, GETDATE()) AS DiasTranscurridos,
            FechaCreacion
          FROM Juicio 
          WHERE ID_Juicio = @ID_Juicio AND ID_Abogado = @ID_Abogado
        `);
      
      return result.recordset[0] || null;
    } catch (error) {
      throw new Error('Error al obtener juicio: ' + error.message);
    }
  },

  // Actualizar juicio
  async update(ID_Juicio, ID_Abogado, { caratula, fechaInicio }) {
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input('ID_Juicio', sql.Int, ID_Juicio)
        .input('ID_Abogado', sql.Int, ID_Abogado)
        .input('caratula', sql.NVarChar(255), caratula)
        .input('fechaInicio', sql.Date, fechaInicio)
        .query(`
          UPDATE Juicio 
          SET Caratula = @caratula, FechaInicio = @fechaInicio
          WHERE ID_Juicio = @ID_Juicio AND ID_Abogado = @ID_Abogado;
          SELECT @@ROWCOUNT AS affected;
        `);
      
      return result.recordset[0].affected > 0;
    } catch (error) {
      throw new Error('Error al actualizar juicio: ' + error.message);
    }
  },

  // Eliminar juicio
  async delete(ID_Juicio, ID_Abogado) {
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input('ID_Juicio', sql.Int, ID_Juicio)
        .input('ID_Abogado', sql.Int, ID_Abogado)
        .query(`
          DELETE FROM Juicio 
          WHERE ID_Juicio = @ID_Juicio AND ID_Abogado = @ID_Abogado;
          SELECT @@ROWCOUNT AS affected;
        `);
      
      return result.recordset[0].affected > 0;
    } catch (error) {
      throw new Error('Error al eliminar juicio: ' + error.message);
    }
  }
};
