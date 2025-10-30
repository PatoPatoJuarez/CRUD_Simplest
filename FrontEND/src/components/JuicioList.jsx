import { useState } from 'react'

function JuicioList({ juicios, loading, onCreate, onEdit, onDelete, onViewHistorial }) {
  const [searchTerm, setSearchTerm] = useState('')

  // Filtrar juicios por término de búsqueda
  const filteredJuicios = juicios.filter(juicio =>
    juicio.Caratula.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Header con botón crear */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Mis Juicios</h2>
            <p className="text-sm text-gray-600 mt-1">
              {filteredJuicios.length} de {juicios.length} {juicios.length === 1 ? 'juicio' : 'juicios'}
            </p>
          </div>
          <button
            onClick={onCreate}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <span className="text-lg">+</span>
            Nuevo Juicio
          </button>
        </div>
        
        {/* Buscador */}
        <div className="relative">
          <input
            type="text"
            placeholder="🔍 Buscar por carátula..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Lista de juicios */}
      {juicios.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay juicios registrados</h3>
          <p className="text-gray-600 mb-4">Comienza agregando tu primer juicio</p>
          <button
            onClick={onCreate}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="text-lg mr-2">+</span>
            Crear Juicio
          </button>
        </div>
      ) : filteredJuicios.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron juicios</h3>
          <p className="text-gray-600 mb-4">Intenta con otro término de búsqueda</p>
          <button
            onClick={() => setSearchTerm('')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Limpiar búsqueda
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJuicios.map((juicio) => (
            <div
              key={juicio.ID_Juicio}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 border border-gray-200"
            >
              {/* Header de la card */}
              <div className="mb-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                  {juicio.Caratula}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>📅</span>
                  <span>
                    {new Date(juicio.FechaInicio).toLocaleDateString('es-AR')}
                  </span>
                </div>
              </div>

              {/* Días transcurridos */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Días transcurridos</div>
                <div className="text-2xl font-bold text-blue-600">
                  {juicio.DiasTranscurridos}
                </div>
              </div>

              {/* Acciones */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => onViewHistorial(juicio)}
                  className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  📜 Ver Historial
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(juicio)}
                    className="flex-1 px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-sm font-medium"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => onDelete(juicio.ID_Juicio)}
                    className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default JuicioList
