import Joi from 'joi';

// Validaciones de autenticación
export const registerSchema = Joi.object({
  nombre: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.empty': 'El nombre es requerido',
      'string.min': 'El nombre debe tener al menos 3 caracteres',
      'string.max': 'El nombre no puede exceder 100 caracteres',
      'any.required': 'El nombre es requerido'
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'El email es requerido',
      'string.email': 'Debe proporcionar un email válido',
      'any.required': 'El email es requerido'
    }),
  password: Joi.string()
    .min(6)
    .max(100)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      'string.empty': 'La contraseña es requerida',
      'string.min': 'La contraseña debe tener al menos 6 caracteres',
      'string.max': 'La contraseña no puede exceder 100 caracteres',
      'string.pattern.base': 'La contraseña debe contener al menos una mayúscula, una minúscula y un número',
      'any.required': 'La contraseña es requerida'
    })
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'El email es requerido',
      'string.email': 'Debe proporcionar un email válido',
      'any.required': 'El email es requerido'
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'La contraseña es requerida',
      'any.required': 'La contraseña es requerida'
    })
});

// Validaciones de juicios
export const juicioSchema = Joi.object({
  caratula: Joi.string()
    .min(5)
    .max(200)
    .required()
    .messages({
      'string.empty': 'La carátula es requerida',
      'string.min': 'La carátula debe tener al menos 5 caracteres',
      'string.max': 'La carátula no puede exceder 200 caracteres',
      'any.required': 'La carátula es requerida'
    }),
  fechaInicio: Joi.date()
    .required()
    .messages({
      'date.base': 'La fecha de inicio debe ser una fecha válida',
      'any.required': 'La fecha de inicio es requerida'
    })
});

// Validaciones de historial
export const historialSchema = Joi.object({
  fecha: Joi.date()
    .required()
    .messages({
      'date.base': 'La fecha debe ser una fecha válida',
      'any.required': 'La fecha es requerida'
    }),
  descripcion: Joi.string()
    .min(10)
    .max(1000)
    .required()
    .messages({
      'string.empty': 'La descripción es requerida',
      'string.min': 'La descripción debe tener al menos 10 caracteres',
      'string.max': 'La descripción no puede exceder 1000 caracteres',
      'any.required': 'La descripción es requerida'
    })
});

// Middleware para validar con Joi
export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path[0],
        message: detail.message
      }));
      
      return res.status(400).json({
        message: 'Error de validación',
        errors
      });
    }
    
    next();
  };
};
