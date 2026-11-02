import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

/**
 * Aula 9 · Bloco 4 — a portaria: só entra quem tem sessão.
 * O `carregando` evita expulsar a pessoa no F5, antes de a restauração terminar.
 */
export default function ProtectedRoute() {
  const { usuario, carregando } = useAuth()

  if (carregando) {
    return (
      <main className="container tela-espera">
        <p role="status">Verificando sessão…</p>
      </main>
    )
  }

  if (!usuario) return <Navigate to="/login" replace />

  return <Outlet />
}
