import { useState } from 'react'
import './App.css'
import Auth from './components/Auth'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <div className="App">
      <header>
        <h1>React + Node.js API</h1>
      </header>
      
      <main>
        {!token ? (
          <Auth setToken={setToken} />
        ) : (
          <div className="dashboard">
            <h2>¡Bienvenido!</h2>
            <p>Has iniciado sesión correctamente</p>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
