import { Outlet } from 'react-router-dom'
import Header from './Header'
import { Rodape } from './Rodape'

/** Aula 9 · Bloco 2 — a moldura: Header em cima e a página filha no <Outlet />. */
export default function Layout() {
  return (
    <div className="pagina">
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Rodape />
    </div>
  )
}
