# Backend API - Node.js + Express + JWT + CORS

API REST completa con autenticación JWT, protección de rutas y CORS configurado.

## 🚀 Características

- **Express.js**: Framework web rápido y minimalista
- **JWT (JSON Web Tokens)**: Autenticación segura
- **CORS**: Configurado para permitir peticiones desde el frontend
- **Bcrypt**: Hash seguro de contraseñas
- **ES Modules**: Uso de import/export moderno
- **Nodemon**: Recarga automática en desarrollo

## 📦 Instalación

```bash
# Instalar dependencias
npm install
```

## ⚙️ Configuración

1. Copia `.env.example` a `.env` (ya está creado)
2. Modifica las variables de entorno según necesites:

```env
PORT=5000
JWT_SECRET=tu_secret_key_super_seguro_aqui_cambiar_en_produccion
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

## 🏃 Ejecutar

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El servidor estará disponible en `http://localhost:5000`

## 📚 Endpoints Disponibles

### Autenticación (No requieren token)

#### Registro
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "usuario",
  "email": "usuario@email.com",
  "password": "contraseña123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@email.com",
  "password": "contraseña123"
}
```

### Usuarios (Requieren token JWT)

#### Obtener perfil
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Listar usuarios
```http
GET /api/users
Authorization: Bearer <token>
```

#### Actualizar usuario
```http
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "nuevo_nombre"
}
```

#### Eliminar usuario
```http
DELETE /api/users/:id
Authorization: Bearer <token>
```

## 🔒 Autenticación

Las rutas protegidas requieren un token JWT en el header:

```
Authorization: Bearer <tu_token_jwt>
```

El token se obtiene al hacer login o registro exitoso.

## 📁 Estructura del Proyecto

```
BackEnd/
├── middleware/
│   └── authMiddleware.js    # Middleware de autenticación JWT
├── routes/
│   ├── authRoutes.js         # Rutas de autenticación
│   └── userRoutes.js         # Rutas de usuarios
├── utils/
│   └── jwtUtils.js           # Utilidades para JWT
├── .env                      # Variables de entorno
├── .env.example              # Ejemplo de variables de entorno
├── .gitignore                # Archivos ignorados por git
├── package.json              # Dependencias y scripts
├── server.js                 # Punto de entrada
└── README.md                 # Este archivo
```

## 🛠️ Tecnologías

- **Node.js**: Runtime de JavaScript
- **Express**: Framework web
- **jsonwebtoken**: Manejo de JWT
- **bcrypt**: Hash de contraseñas
- **cors**: Configuración de CORS
- **dotenv**: Variables de entorno
- **nodemon**: Desarrollo con recarga automática

## 📝 Notas

- La base de datos actual es en memoria (array). Para producción, integra MongoDB, PostgreSQL, MySQL, etc.
- Cambia `JWT_SECRET` en `.env` por algo seguro en producción
- Los tokens expiran según `JWT_EXPIRES_IN` (por defecto 7 días)

## 🔄 Próximos Pasos

1. Integrar una base de datos real (MongoDB, PostgreSQL, etc.)
2. Agregar validación de datos con Joi o Zod
3. Implementar refresh tokens
4. Agregar rate limiting
5. Configurar logs con Winston o Morgan
6. Implementar testing con Jest
