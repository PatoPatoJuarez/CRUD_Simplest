import { JuicioModel } from '../models/juicioModel.js';

// Crear nuevo juicio
export const crearJuicio = async (req, res) => {
  try {
    const { caratula, fechaInicio } = req.body;
    const ID_Abogado = req.user.id;

    // Validaciones
    if (!caratula || !fechaInicio) {
      return res.status(400).json({ 
        message: 'Carátula y fecha de inicio son requeridos' 
      });
    }

    const nuevoJuicio = await JuicioModel.create({
      ID_Abogado,
      caratula,
      fechaInicio
    });

    res.status(201).json({
      message: 'Juicio creado exitosamente',
      juicio: nuevoJuicio
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al crear juicio', 
      error: error.message 
    });
  }
};

// Obtener todos los juicios del abogado autenticado
export const obtenerJuicios = async (req, res) => {
  try {
    const ID_Abogado = req.user.id;
    const juicios = await JuicioModel.getAllByAbogado(ID_Abogado);

    res.json({
      message: 'Juicios obtenidos exitosamente',
      cantidad: juicios.length,
      juicios
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener juicios', 
      error: error.message 
    });
  }
};

// Obtener un juicio específico
export const obtenerJuicioPorId = async (req, res) => {
  try {
    const ID_Juicio = parseInt(req.params.id);
    const ID_Abogado = req.user.id;

    if (isNaN(ID_Juicio)) {
      return res.status(400).json({ message: 'ID de juicio inválido' });
    }

    const juicio = await JuicioModel.getById(ID_Juicio, ID_Abogado);

    if (!juicio) {
      return res.status(404).json({ message: 'Juicio no encontrado' });
    }

    res.json({
      message: 'Juicio obtenido exitosamente',
      juicio
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener juicio', 
      error: error.message 
    });
  }
};

// Actualizar juicio
export const actualizarJuicio = async (req, res) => {
  try {
    const ID_Juicio = parseInt(req.params.id);
    const ID_Abogado = req.user.id;
    const { caratula, fechaInicio } = req.body;

    if (isNaN(ID_Juicio)) {
      return res.status(400).json({ message: 'ID de juicio inválido' });
    }

    if (!caratula || !fechaInicio) {
      return res.status(400).json({ 
        message: 'Carátula y fecha de inicio son requeridos' 
      });
    }

    const updated = await JuicioModel.update(ID_Juicio, ID_Abogado, {
      caratula,
      fechaInicio
    });

    if (!updated) {
      return res.status(404).json({ 
        message: 'Juicio no encontrado o no autorizado' 
      });
    }

    res.json({
      message: 'Juicio actualizado exitosamente'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al actualizar juicio', 
      error: error.message 
    });
  }
};

// Eliminar juicio
export const eliminarJuicio = async (req, res) => {
  try {
    const ID_Juicio = parseInt(req.params.id);
    const ID_Abogado = req.user.id;

    if (isNaN(ID_Juicio)) {
      return res.status(400).json({ message: 'ID de juicio inválido' });
    }

    const deleted = await JuicioModel.delete(ID_Juicio, ID_Abogado);

    if (!deleted) {
      return res.status(404).json({ 
        message: 'Juicio no encontrado o no autorizado' 
      });
    }

    res.json({
      message: 'Juicio eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al eliminar juicio', 
      error: error.message 
    });
  }
};
