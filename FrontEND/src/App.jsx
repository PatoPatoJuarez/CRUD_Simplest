import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import { useAuth } from './hooks/useAuth'

function App() {
  const { user, loading, login, register, logout, isAuthenticated } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {!isAuthenticated() ? (
        <Auth onLogin={login} onRegister={register} />
      ) : (
        <Dashboard user={user} onLogout={logout} />
      )}
    </div>
  )
}

export default App
