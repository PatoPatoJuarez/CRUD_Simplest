# Sistema de Gestión de Juicios - Full Stack

Aplicación web completa para la gestión de causas legales con **Backend (Node.js + Express + JWT + SQL Server)** y **Frontend (React + Vite + Tailwind CSS)**.

## 📋 Descripción del Proyecto

Sistema diseñado para abogados que permite gestionar juicios y su historial de forma privada y segura. Cada abogado solo puede ver, editar y eliminar sus propios juicios.

## ✨ Características Principales

- ✅ **Autenticación segura** con JWT (tokens válidos por 7 días)
- ✅ **Privacidad total**: Cada abogado solo ve sus propios juicios
- ✅ **CRUD completo** de juicios y historial
- ✅ **Cálculo automático** de días transcurridos desde inicio del juicio
- ✅ **Diseño responsive** con Tailwind CSS (mobile-first)
- ✅ **Base de datos SQL Server** con stored procedures
- ✅ **Validaciones** en frontend y backend

## 📍 Estructura del Proyecto

```
CRUD_Simplest/
├── BackEnd/
│   ├── config/
│   │   └── database.js      # Configuración SQL Server
│   ├── database/
│   │   └── schema.sql       # Script de creación de BD
│   ├── middleware/
│   │   └── authMiddleware.js # Middleware JWT
│   ├── models/
│   │   ├── abogadoModel.js  # Modelo de Abogado
│   │   ├── juicioModel.js   # Modelo de Juicio
│   │   └── historialModel.js # Modelo de Historial
│   ├── routes/
│   │   ├── authRoutes.js    # Rutas de autenticación
│   │   ├── juicioRoutes.js  # Rutas de juicios
│   │   └── historialRoutes.js # Rutas de historial
│   ├── utils/
│   │   └── jwtUtils.js      # Utilidades JWT
│   ├── .env              # Variables de entorno
│   ├── server.js         # Servidor principal
│   └── package.json
│
├── FrontEnd/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth.jsx         # Login/Registro
│   │   │   ├── Dashboard.jsx    # Dashboard principal
│   │   │   ├── JuicioList.jsx   # Lista de juicios
│   │   │   ├── JuicioForm.jsx   # Formulario juicio
│   │   │   └── HistorialView.jsx # Vista historial
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.cjs # Config Tailwind
│   └── package.json
│
└── package.json          # Scripts para ejecutar todo
```

## 🛠️ Requisitos Previos

- **Node.js** v18 o superior
- **SQL Server** (cualquier edición)
- **npm** o **yarn**
- Navegador web moderno

## 💾 Instalación de la Base de Datos

### 1. Crear la Base de Datos

Abre **SQL Server Management Studio (SSMS)** y ejecuta el script:

```bash
BackEnd/database/schema.sql
```

Este script creará:
- Base de datos `GestionJuicios`
- Tabla `Abogado` (usuarios)
- Tabla `Juicio` (causas legales)
- Tabla `Historial` (entradas de historial)
- Índices para optimización

### 2. Configurar SQL Server

Asegúrate de que SQL Server esté configurado en **Mixed Mode** (autenticación SQL y Windows).

### 3. Configurar Variables de Entorno

Edita `BackEnd/.env` con tus credenciales:

```env
PORT=5000
JWT_SECRET=tu_secret_key_super_seguro_cambiar_en_produccion
JWT_EXPIRES_IN=7d
NODE_ENV=development

# SQL Server Configuration
DB_SERVER=localhost
DB_DATABASE=GestionJuicios
DB_USER=abogado_app
DB_PASSWORD=Password123!
DB_TRUST_SERVER_CERTIFICATE=true
```

**Nota:** El usuario `abogado_app` se crea automáticamente con el script SQL.

## 🚀 Instalación y Ejecución

### Opción 1: Ejecutar todo junto (RECOMENDADO)

```bash
# Instalar dependencias
npm run install-all

# Ejecutar backend y frontend simultáneamente
npm run dev
```

### Opción 2: Ejecutar por separado

**Terminal 1 - Backend:**
```bash
cd BackEnd
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd FrontEnd
npm install
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

## 🌐 URLs de la Aplicación

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Status**: http://localhost:5000 (información de endpoints)

## 🔑 Credenciales de Prueba

Puedes usar estas credenciales para probar la aplicación:

```
Email: abogado@test.com
Contraseña: Test123!
```

**O registra un nuevo usuario** desde la pantalla de registro.

**Nota:** Cada abogado tiene acceso únicamente a sus propios juicios. Los datos están completamente aislados por usuario.

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

### 📡 Endpoints de la API

#### Autenticación (Públicos)
- `POST /api/auth/register` - Registro de abogado
- `POST /api/auth/login` - Inicio de sesión

#### Juicios (Requieren autenticación JWT)
- `GET /api/juicios` - Listar todos los juicios del abogado
- `POST /api/juicios` - Crear nuevo juicio
- `GET /api/juicios/:id` - Obtener juicio específico
- `PUT /api/juicios/:id` - Actualizar juicio
- `DELETE /api/juicios/:id` - Eliminar juicio

#### Historial (Requieren autenticación JWT)
- `GET /api/historial/juicio/:juicioId` - Listar historial de un juicio
- `POST /api/historial/juicio/:juicioId` - Agregar entrada al historial
- `GET /api/historial/:id/juicio/:juicioId` - Obtener entrada específica
- `PUT /api/historial/:id/juicio/:juicioId` - Actualizar entrada
- `DELETE /api/historial/:id/juicio/:juicioId` - Eliminar entrada

## 🎨 Características del Frontend

- **React 18**: Última versión con Hooks
- **Vite 6**: Build tool ultrarapido
- **Tailwind CSS 3**: Diseño moderno y responsive
- **Axios**: Cliente HTTP para API REST
- **Componentes reutilizables**: Arquitectura modular
- **localStorage**: Persistencia de sesión (token JWT)
- **Diseño responsive**: Mobile-first, adaptable a tablets y desktop
- **Validaciones**: Formularios con validación en tiempo real

## 📝 Cómo Usar la Aplicación

### 1. Registro e Inicio de Sesión

1. Abre `http://localhost:3000` en tu navegador
2. En la pantalla de login, haz clic en **"Registrarse"**
3. Completa los datos:
   - Nombre completo
   - Email
   - Contraseña
4. Después de registrarte, se creará tu cuenta y se iniciará sesión automáticamente

### 2. Gestionar Juicios

- **Crear juicio**: Clic en "Nuevo Juicio", completa carátula y fecha de inicio
- **Ver juicios**: Se muestra el listado con días transcurridos
- **Editar juicio**: Clic en el botón "Editar" de la card
- **Eliminar juicio**: Clic en "Eliminar" (pide confirmación)

### 3. Gestionar Historial

- Desde la lista de juicios, clic en **"Ver Historial"**
- **Agregar entrada**: Botón "Nueva Entrada", fecha y descripción
- **Editar/Eliminar**: Botones en cada entrada del historial
- **Volver**: Botón "Volver a Juicios" para regresar

### 4. Cerrar Sesión
- Clic en "Cerrar Sesión" en el header
- El token se elimina del localStorage
- Redirige automáticamente al login

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

## 📚 Documentación Adicional

- **Script SQL**: `BackEnd/database/schema.sql` - Estructura completa de la BD
- **Variables de entorno**: `BackEnd/.env.example` - Ejemplo de configuración
- **Configuración Tailwind**: `FrontEnd/tailwind.config.cjs` - Personalización de estilos

---

**Desarrollado para SIMPLEST Guru - Prueba Técnica FullStack Engineer** 🎉
