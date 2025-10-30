import { HistorialModel } from '../models/historialModel.js';

// Crear nueva entrada de historial para un juicio
export const crearHistorial = async (req, res) => {
  try {
    const ID_Juicio = parseInt(req.params.juicioId);
    const ID_Abogado = req.user.id;
    const { fecha, descripcion } = req.body;

    if (isNaN(ID_Juicio)) {
      return res.status(400).json({ message: 'ID de juicio inválido' });
    }

    // Verificar que el juicio pertenece al abogado
    const isOwner = await HistorialModel.verifyJuicioOwnership(ID_Juicio, ID_Abogado);
    if (!isOwner) {
      return res.status(403).json({ 
        message: 'No tienes permiso para agregar historial a este juicio' 
      });
    }

    const nuevaEntrada = await HistorialModel.create({
      ID_Juicio,
      fecha,
      descripcion
    });

    res.status(201).json({
      message: 'Entrada de historial creada exitosamente',
      historial: nuevaEntrada
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al crear entrada de historial', 
      error: error.message 
    });
  }
};

// Obtener todo el historial de un juicio
export const obtenerHistorial = async (req, res) => {
  try {
    const ID_Juicio = parseInt(req.params.juicioId);
    const ID_Abogado = req.user.id;

    if (isNaN(ID_Juicio)) {
      return res.status(400).json({ message: 'ID de juicio inválido' });
    }

    // Verificar que el juicio pertenece al abogado
    const isOwner = await HistorialModel.verifyJuicioOwnership(ID_Juicio, ID_Abogado);
    if (!isOwner) {
      return res.status(403).json({ 
        message: 'No tienes permiso para ver el historial de este juicio' 
      });
    }

    const historial = await HistorialModel.getAllByJuicio(ID_Juicio);

    res.json({
      message: 'Historial obtenido exitosamente',
      cantidad: historial.length,
      historial
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener historial', 
      error: error.message 
    });
  }
};

// Obtener una entrada específica del historial
export const obtenerHistorialPorId = async (req, res) => {
  try {
    const ID_Historial = parseInt(req.params.id);
    const ID_Juicio = parseInt(req.params.juicioId);
    const ID_Abogado = req.user.id;

    if (isNaN(ID_Historial) || isNaN(ID_Juicio)) {
      return res.status(400).json({ message: 'IDs inválidos' });
    }

    // Verificar que el juicio pertenece al abogado
    const isOwner = await HistorialModel.verifyJuicioOwnership(ID_Juicio, ID_Abogado);
    if (!isOwner) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    const entrada = await HistorialModel.getById(ID_Historial, ID_Juicio);

    if (!entrada) {
      return res.status(404).json({ message: 'Entrada de historial no encontrada' });
    }

    res.json({
      message: 'Entrada obtenida exitosamente',
      historial: entrada
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener entrada', 
      error: error.message 
    });
  }
};

// Actualizar entrada de historial
export const actualizarHistorial = async (req, res) => {
  try {
    const ID_Historial = parseInt(req.params.id);
    const ID_Juicio = parseInt(req.params.juicioId);
    const ID_Abogado = req.user.id;
    const { fecha, descripcion } = req.body;

    if (isNaN(ID_Historial) || isNaN(ID_Juicio)) {
      return res.status(400).json({ message: 'IDs inválidos' });
    }

    // Verificar que el juicio pertenece al abogado
    const isOwner = await HistorialModel.verifyJuicioOwnership(ID_Juicio, ID_Abogado);
    if (!isOwner) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    const updated = await HistorialModel.update(ID_Historial, ID_Juicio, {
      fecha,
      descripcion
    });

    if (!updated) {
      return res.status(404).json({ 
        message: 'Entrada de historial no encontrada' 
      });
    }

    res.json({
      message: 'Entrada de historial actualizada exitosamente'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al actualizar entrada', 
      error: error.message 
    });
  }
};

// Eliminar entrada de historial
export const eliminarHistorial = async (req, res) => {
  try {
    const ID_Historial = parseInt(req.params.id);
    const ID_Juicio = parseInt(req.params.juicioId);
    const ID_Abogado = req.user.id;

    if (isNaN(ID_Historial) || isNaN(ID_Juicio)) {
      return res.status(400).json({ message: 'IDs inválidos' });
    }

    // Verificar que el juicio pertenece al abogado
    const isOwner = await HistorialModel.verifyJuicioOwnership(ID_Juicio, ID_Abogado);
    if (!isOwner) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    const deleted = await HistorialModel.delete(ID_Historial, ID_Juicio);

    if (!deleted) {
      return res.status(404).json({ 
        message: 'Entrada de historial no encontrada' 
      });
    }

    res.json({
      message: 'Entrada de historial eliminada exitosamente'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al eliminar entrada', 
      error: error.message 
    });
  }
};
