import { useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/auth'

function Auth({ setToken }) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const endpoint = isLogin ? `${API_URL}/login` : `${API_URL}/register`
      const data = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData

      const response = await axios.post(endpoint, data)
      
      localStorage.setItem('token', response.data.token)
      setToken(response.data.token)
      setMessage(response.data.message)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error en la operación')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-toggle">
        <button 
          className={isLogin ? 'active' : ''} 
          onClick={() => setIsLogin(true)}
        >
          Iniciar Sesión
        </button>
        <button 
          className={!isLogin ? 'active' : ''} 
          onClick={() => setIsLogin(false)}
        >
          Registrarse
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label>Usuario:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required={!isLogin}
            />
          </div>
        )}

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : isLogin ? 'Iniciar Sesión' : 'Registrarse'}
        </button>
      </form>

      {message && <p className={message.includes('Error') ? 'error' : 'success'}>{message}</p>}
    </div>
  )
}

export default Auth
