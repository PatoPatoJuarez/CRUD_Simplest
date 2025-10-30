# CRUD_Simplest - Full Stack App

Aplicación completa con **Backend (Node.js + Express + JWT + CORS)** y **Frontend (React + Vite)** lista para desarrollar cualquier tipo de aplicación.

## 📁 Estructura del Proyecto

```
CRUD_Simplest/
├── BackEnd/              # API REST con Node.js
│   ├── middleware/       # Middlewares (autenticación JWT)
│   ├── routes/           # Rutas de la API
│   ├── utils/            # Utilidades (JWT helpers)
│   ├── server.js         # Servidor principal
│   ├── package.json
│   └── README.md
│
├── FrontEnd/             # Aplicación React
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   ├── App.jsx       # Componente principal
│   │   └── main.jsx      # Punto de entrada
│   ├── package.json
│   └── README.md
│
└── package.json          # Scripts para ejecutar todo junto
```

## 🚀 Inicio Rápido

### Opción 1: Ejecutar todo junto (RECOMENDADO)

Desde la carpeta raíz `CRUD_Simplest`:

```bash
npm run dev
```

Esto ejecutará backend y frontend simultáneamente en una sola terminal.

### Opción 2: Ejecutar por separado

**Terminal 1 - Backend:**
```bash
cd BackEnd
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd FrontEnd
npm run dev
```

## 📝 Scripts Disponibles

Desde la raíz del proyecto (`C:\Users\Pato\Desktop\CRUD_Simplest`):

```bash
# Ejecutar backend y frontend juntos
npm run dev

# Ejecutar solo el backend
npm run backend

# Ejecutar solo el frontend
npm run frontend

# Reinstalar todas las dependencias
npm run install-all
```

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Backend Status**: http://localhost:5000 (muestra info de la API)

## ✅ Todo está listo

- ✅ Backend con Express, JWT, CORS configurado
- ✅ Frontend con React y Vite
- ✅ Autenticación completa (registro y login)
- ✅ Middleware de protección de rutas
- ✅ Comunicación Frontend ↔ Backend configurada
- ✅ Dependencias instaladas
- ✅ Scripts para ejecutar todo junto

## 🔑 Características del Backend

- **Express**: Framework web minimalista
- **JWT**: Autenticación con tokens
- **CORS**: Configurado para permitir peticiones del frontend
- **Bcrypt**: Hash seguro de contraseñas
- **ES Modules**: Import/Export moderno
- **Nodemon**: Recarga automática en desarrollo

### Endpoints disponibles:

- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Login de usuario
- `GET /api/users/profile` - Perfil (requiere token)
- `GET /api/users` - Lista de usuarios (requiere token)
- `PUT /api/users/:id` - Actualizar usuario (requiere token)
- `DELETE /api/users/:id` - Eliminar usuario (requiere token)

## 🎨 Características del Frontend

- **React 18**: Última versión de React
- **Vite**: Build tool rápido
- **Axios**: Cliente HTTP
- **Componentes funcionales**: Con Hooks
- **localStorage**: Persistencia de token
- **Proxy configurado**: Para conectar con el backend

## 📝 Uso

### Probar la autenticación:

1. Ejecuta `npm run dev` desde la raíz
2. Abre `http://localhost:3000` en tu navegador
3. Prueba el registro e inicio de sesión

### Agregar nuevas funcionalidades:

**En el Backend:**
- Crea nuevas rutas en `BackEnd/routes/`
- Usa el middleware `authenticateToken` para proteger rutas
- Conecta una base de datos real (MongoDB, PostgreSQL, etc.)

**En el Frontend:**
- Crea nuevos componentes en `FrontEnd/src/components/`
- Usa Axios para consumir la API
- Agrega React Router para navegación entre páginas

## 🔧 Configuración

### Variables de entorno (BackEnd)

Edita `BackEnd/.env`:

```env
PORT=5000
JWT_SECRET=tu_secret_key_super_seguro
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### Cambiar puerto del frontend

Edita `FrontEnd/vite.config.js` línea 8.

## 📚 Documentación

- Ver `BackEnd/README.md` para detalles del backend
- Ver `FrontEnd/README.md` para detalles del frontend

## 🎯 Próximos Pasos

1. **Base de datos**: Integra MongoDB, PostgreSQL o MySQL
2. **Validación**: Agrega Joi o Zod para validar datos
3. **Rutas frontend**: Implementa React Router
4. **Estado global**: Usa Context API o Redux
5. **Testing**: Agrega Jest y React Testing Library
6. **Docker**: Contenedoriza la aplicación
7. **Deploy**: Despliega en Vercel (frontend) y Railway/Render (backend)

## 📄 Licencia

ISC

---

**¡Tu entorno está listo para desarrollar! 🎉**

Ejecuta `npm run dev` y comienza a construir tu aplicación.
