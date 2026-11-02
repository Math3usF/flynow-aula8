import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { IconeAviao } from './Icones'

const classeLink = ({ isActive }: { isActive: boolean }) => (isActive ? 'nav-link ativo' : 'nav-link')

/**
 * Aula 9 · Bloco 2/3 — o Header aparece em todas as páginas internas.
 * NavLink marca a página atual; o usuário vem do Context (sem prop drilling).
 */
export default function Header() {
  const { usuario, logout } = useAuth()
  const { pathname } = useLocation()

  return (
    <header className="topo">
      <div className="topo-inner">
        <NavLink className="marca" to="/" aria-label="FlyNow — ir para os destinos">
          <span className="marca-simbolo">
            <IconeAviao />
          </span>
          <span className="marca-texto">
            FlyNow
            <small>agência de viagens</small>
          </span>
        </NavLink>

        <nav className="nav" aria-label="Navegação principal">
          <NavLink to="/" end className={classeLink}>
            Destinos
          </NavLink>
          <NavLink to="/desejos" className={classeLink}>
            Desejos
          </NavLink>

          {/* atalhos para as seções da página inicial */}
          {pathname === '/' && (
            <span className="nav-ancoras">
              <a href="#regioes">Regiões</a>
              <a href="#viagem">Viagem</a>
              <a href="#laboratorio">Laboratório</a>
            </span>
          )}
        </nav>

        <div className="topo-usuario">
          <span className="topo-ola">
            Olá, <strong>{usuario?.firstName}</strong>
          </span>
          <button type="button" className="btn btn-fantasma btn-sair" onClick={logout}>
            Sair
          </button>
        </div>
      </div>
    </header>
  )
}
