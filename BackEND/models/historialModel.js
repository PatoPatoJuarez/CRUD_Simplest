import { getConnection, sql } from '../config/database.js';

export const HistorialModel = {
  // Crear nueva entrada de historial
  async create({ ID_Juicio, fecha, descripcion }) {
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input('ID_Juicio', sql.Int, ID_Juicio)
        .input('fecha', sql.Date, fecha)
        .input('descripcion', sql.NVarChar(sql.MAX), descripcion)
        .query(`
          INSERT INTO Historial (ID_Juicio, Fecha, Descripcion)
          VALUES (@ID_Juicio, @fecha, @descripcion);
          SELECT SCOPE_IDENTITY() AS ID_Historial;
        `);
      
      return {
        ID_Historial: result.recordset[0].ID_Historial,
        ID_Juicio,
        fecha,
        descripcion
      };
    } catch (error) {
      throw new Error('Error al crear historial: ' + error.message);
    }
  },

  // Obtener todo el historial de un juicio
  async getAllByJuicio(ID_Juicio) {
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input('ID_Juicio', sql.Int, ID_Juicio)
        .query(`
          SELECT 
            ID_Historial,
            ID_Juicio,
            Fecha,
            Descripcion,
            FechaCreacion
          FROM Historial 
          WHERE ID_Juicio = @ID_Juicio
          ORDER BY Fecha DESC, FechaCreacion DESC
        `);
      
      return result.recordset;
    } catch (error) {
      throw new Error('Error al obtener historial: ' + error.message);
    }
  },

  // Obtener una entrada específica del historial
  async getById(ID_Historial, ID_Juicio) {
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input('ID_Historial', sql.Int, ID_Historial)
        .input('ID_Juicio', sql.Int, ID_Juicio)
        .query(`
          SELECT 
            ID_Historial,
            ID_Juicio,
            Fecha,
            Descripcion,
            FechaCreacion
          FROM Historial 
          WHERE ID_Historial = @ID_Historial AND ID_Juicio = @ID_Juicio
        `);
      
      return result.recordset[0] || null;
    } catch (error) {
      throw new Error('Error al obtener entrada de historial: ' + error.message);
    }
  },

  // Actualizar entrada de historial
  async update(ID_Historial, ID_Juicio, { fecha, descripcion }) {
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input('ID_Historial', sql.Int, ID_Historial)
        .input('ID_Juicio', sql.Int, ID_Juicio)
        .input('fecha', sql.Date, fecha)
        .input('descripcion', sql.NVarChar(sql.MAX), descripcion)
        .query(`
          UPDATE Historial 
          SET Fecha = @fecha, Descripcion = @descripcion
          WHERE ID_Historial = @ID_Historial AND ID_Juicio = @ID_Juicio;
          SELECT @@ROWCOUNT AS affected;
        `);
      
      return result.recordset[0].affected > 0;
    } catch (error) {
      throw new Error('Error al actualizar historial: ' + error.message);
    }
  },

  // Eliminar entrada de historial
  async delete(ID_Historial, ID_Juicio) {
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input('ID_Historial', sql.Int, ID_Historial)
        .input('ID_Juicio', sql.Int, ID_Juicio)
        .query(`
          DELETE FROM Historial 
          WHERE ID_Historial = @ID_Historial AND ID_Juicio = @ID_Juicio;
          SELECT @@ROWCOUNT AS affected;
        `);
      
      return result.recordset[0].affected > 0;
    } catch (error) {
      throw new Error('Error al eliminar historial: ' + error.message);
    }
  },

  // Verificar que el juicio pertenece al abogado
  async verifyJuicioOwnership(ID_Juicio, ID_Abogado) {
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input('ID_Juicio', sql.Int, ID_Juicio)
        .input('ID_Abogado', sql.Int, ID_Abogado)
        .query('SELECT ID_Juicio FROM Juicio WHERE ID_Juicio = @ID_Juicio AND ID_Abogado = @ID_Abogado');
      
      return result.recordset.length > 0;
    } catch (error) {
      throw new Error('Error al verificar propiedad del juicio: ' + error.message);
    }
  }
};
