import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/historial'

function HistorialView({ juicio, onBack }) {
  const [historial, setHistorial] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEntry, setEditingEntry] = useState(null)
  const [formData, setFormData] = useState({
    fecha: '',
    descripcion: ''
  })

  const token = localStorage.getItem('token')
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` }
  }

  useEffect(() => {
    fetchHistorial()
  }, [])

  const fetchHistorial = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `${API_URL}/juicio/${juicio.ID_Juicio}`,
        axiosConfig
      )
      setHistorial(response.data.historial)
    } catch (error) {
      console.error('Error al cargar historial:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddNew = () => {
    setEditingEntry(null)
    setFormData({
      fecha: new Date().toISOString().split('T')[0],
      descripcion: ''
    })
    setShowForm(true)
  }

  const handleEdit = (entry) => {
    setEditingEntry(entry)
    setFormData({
      fecha: entry.Fecha.split('T')[0],
      descripcion: entry.Descripcion
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta entrada del historial?')) return

    try {
      await axios.delete(
        `${API_URL}/${id}/juicio/${juicio.ID_Juicio}`,
        axiosConfig
      )
      fetchHistorial()
    } catch (error) {
      alert('Error al eliminar entrada')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editingEntry) {
        await axios.put(
          `${API_URL}/${editingEntry.ID_Historial}/juicio/${juicio.ID_Juicio}`,
          formData,
          axiosConfig
        )
      } else {
        await axios.post(
          `${API_URL}/juicio/${juicio.ID_Juicio}`,
          formData,
          axiosConfig
        )
      }
      setShowForm(false)
      fetchHistorial()
    } catch (error) {
      alert('Error al guardar entrada')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2 font-medium"
        >
          ← Volver a Juicios
        </button>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            📜 Historial del Juicio
          </h2>
          <p className="text-gray-700 font-medium mb-2">{juicio.Caratula}</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span>📅 Inicio: {juicio.FechaInicio.split('T')[0]}</span>
            <span>⏱️ Días transcurridos: <strong className="text-blue-600">{juicio.DiasTranscurridos}</strong></span>
          </div>
        </div>
      </div>

      {/* Form para agregar/editar entrada */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {editingEntry ? '✏️ Editar Entrada' : '➕ Nueva Entrada'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha
              </label>
              <input
                type="date"
                required
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                required
                rows="4"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Ej: Audiencia preliminar. Se fijó fecha para presentación de pruebas..."
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingEntry ? 'Guardar Cambios' : 'Agregar Entrada'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de historial */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            Entradas ({historial.length})
          </h3>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            + Nueva Entrada
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : historial.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-gray-600 mb-4">No hay entradas en el historial</p>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Agregar Primera Entrada
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {historial.map((entry) => (
              <div
                key={entry.ID_Historial}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    📅 {entry.Fecha.split('T')[0]}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-sm"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleDelete(entry.ID_Historial)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{entry.Descripcion}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HistorialView
