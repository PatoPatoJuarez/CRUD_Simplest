import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/juicios'

function JuicioForm({ juicio, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    caratula: '',
    fechaInicio: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const token = localStorage.getItem('token')
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` }
  }

  useEffect(() => {
    if (juicio) {
      setFormData({
        caratula: juicio.Caratula,
        fechaInicio: juicio.FechaInicio.split('T')[0]
      })
    }
  }, [juicio])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (juicio) {
        await axios.put(`${API_URL}/${juicio.ID_Juicio}`, formData, axiosConfig)
      } else {
        await axios.post(API_URL, formData, axiosConfig)
      }
      onSuccess()
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar el juicio')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {juicio ? '✏️ Editar Juicio' : '➕ Nuevo Juicio'}
          </h2>
          <p className="text-gray-600 text-sm">
            {juicio ? 'Modifica los datos del juicio' : 'Completa los datos para crear un nuevo juicio'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Carátula */}
          <div>
            <label htmlFor="caratula" className="block text-sm font-medium text-gray-700 mb-2">
              Carátula / Causa
            </label>
            <input
              id="caratula"
              name="caratula"
              type="text"
              required
              value={formData.caratula}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: García c/ Pérez s/ Daños y Perjuicios"
            />
          </div>

          {/* Fecha de Inicio */}
          <div>
            <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Inicio
            </label>
            <input
              id="fechaInicio"
              name="fechaInicio"
              type="date"
              required
              value={formData.fechaInicio}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Guardando...' : juicio ? 'Guardar Cambios' : 'Crear Juicio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JuicioForm
