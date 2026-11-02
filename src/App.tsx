import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Desejos from './pages/Desejos'
import Destinos from './pages/Destinos'
import Login from './pages/Login'
import NaoEncontrada from './pages/NaoEncontrada'
import ProtectedRoute from './routes/ProtectedRoute'

/**
 * Aula 9 · Bloco 2/4 — o mapa de rotas.
 * /login é pública; o resto passa pela portaria (ProtectedRoute) e pela moldura (Layout).
 */
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index element={<Destinos />} />
          <Route path="desejos" element={<Desejos />} />
        </Route>
      </Route>

      <Route path="*" element={<NaoEncontrada />} />
    </Routes>
  )
}
