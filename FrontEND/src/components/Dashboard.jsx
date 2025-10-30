import { useState, useEffect } from 'react'
import axios from 'axios'
import JuicioList from './JuicioList'
import JuicioForm from './JuicioForm'
import HistorialView from './HistorialView'

const API_URL = 'http://localhost:5000/api'

function Dashboard({ user, onLogout }) {
  const [juicios, setJuicios] = useState([])
  const [selectedJuicio, setSelectedJuicio] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [showHistorial, setShowHistorial] = useState(false)
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('token')

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` }
  }

  useEffect(() => {
    fetchJuicios()
  }, [])

  const fetchJuicios = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/juicios`, axiosConfig)
      setJuicios(response.data.juicios)
    } catch (error) {
      console.error('Error al cargar juicios:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateJuicio = () => {
    setSelectedJuicio(null)
    setShowForm(true)
    setShowHistorial(false)
  }

  const handleEditJuicio = (juicio) => {
    setSelectedJuicio(juicio)
    setShowForm(true)
    setShowHistorial(false)
  }

  const handleViewHistorial = (juicio) => {
    setSelectedJuicio(juicio)
    setShowHistorial(true)
    setShowForm(false)
  }

  const handleDeleteJuicio = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este juicio?')) return

    try {
      await axios.delete(`${API_URL}/juicios/${id}`, axiosConfig)
      fetchJuicios()
      if (selectedJuicio?.ID_Juicio === id) {
        setSelectedJuicio(null)
        setShowForm(false)
        setShowHistorial(false)
      }
    } catch (error) {
      alert('Error al eliminar juicio')
    }
  }

  const handleFormSuccess = () => {
    fetchJuicios()
    setShowForm(false)
    setSelectedJuicio(null)
  }

  const handleBack = () => {
    setShowForm(false)
    setShowHistorial(false)
    setSelectedJuicio(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                ⚖️ Sistema de Juicios
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Bienvenido, <span className="font-medium">{user?.nombre}</span>
              </p>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {showForm ? (
          <JuicioForm
            juicio={selectedJuicio}
            onSuccess={handleFormSuccess}
            onCancel={handleBack}
          />
        ) : showHistorial ? (
          <HistorialView
            juicio={selectedJuicio}
            onBack={handleBack}
          />
        ) : (
          <JuicioList
            juicios={juicios}
            loading={loading}
            onCreate={handleCreateJuicio}
            onEdit={handleEditJuicio}
            onDelete={handleDeleteJuicio}
            onViewHistorial={handleViewHistorial}
          />
        )}
      </main>
    </div>
  )
}

export default Dashboard
