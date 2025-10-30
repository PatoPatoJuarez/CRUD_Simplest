# Frontend - React + Vite

Aplicación React con autenticación JWT que se conecta al backend Node.js.

## 🚀 Características

- **React 18**: Biblioteca moderna de UI
- **Vite**: Build tool rápido y moderno
- **Axios**: Cliente HTTP para consumir la API
- **localStorage**: Persistencia del token JWT
- **Proxy configurado**: Las peticiones a `/api` se redirigen automáticamente al backend

## 📦 Instalación

Las dependencias ya están instaladas. Si necesitas reinstalarlas:

```bash
npm install
```

## 🏃 Ejecutar

```bash
# Modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

**IMPORTANTE**: Asegúrate de que el backend esté corriendo en `http://localhost:5000` antes de iniciar el frontend.

## 🔗 Conexión con Backend

La aplicación se conecta al backend mediante:
- **URL API**: `http://localhost:5000/api/auth`
- **Proxy Vite**: Configurado en `vite.config.js` para redirigir `/api` → `http://localhost:5000`

### Endpoints utilizados:

#### Registro
```javascript
POST http://localhost:5000/api/auth/register
{
  "username": "usuario",
  "email": "usuario@email.com",
  "password": "contraseña123"
}
```

#### Login
```javascript
POST http://localhost:5000/api/auth/login
{
  "email": "usuario@email.com",
  "password": "contraseña123"
}
```

## 📁 Estructura del Proyecto

```
FrontEnd/
├── public/               # Archivos estáticos
├── src/
│   ├── components/
│   │   └── Auth.jsx     # Componente de login/registro
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos del componente principal
│   ├── index.css        # Estilos globales
│   └── main.jsx         # Punto de entrada
├── index.html           # HTML base
├── vite.config.js       # Configuración de Vite
├── package.json         # Dependencias y scripts
└── README.md            # Este archivo
```

## 🛠️ Tecnologías

- **React**: Biblioteca de UI
- **Vite**: Build tool moderno
- **Axios**: Cliente HTTP
- **localStorage**: Almacenamiento local del token

## 🔒 Autenticación

El token JWT se guarda en `localStorage` después del login/registro exitoso:

```javascript
localStorage.setItem('token', response.data.token)
```

Para hacer peticiones autenticadas (agregar cuando necesites):

```javascript
const token = localStorage.getItem('token')
axios.get('/api/users/profile', {
  headers: { Authorization: `Bearer ${token}` }
})
```

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🎨 Personalización

- Modifica `src/App.css` para cambiar los estilos del componente principal
- Modifica `src/index.css` para cambiar los estilos globales
- Agrega nuevos componentes en `src/components/`

## 🔄 Próximos Pasos

1. Agregar React Router para navegación
2. Crear más componentes (Dashboard, Profile, etc.)
3. Implementar Context API o Redux para estado global
4. Agregar validación de formularios
5. Implementar interceptores de Axios para el token
6. Agregar manejo de errores global
