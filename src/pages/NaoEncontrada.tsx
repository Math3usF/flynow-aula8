import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IconeAviao } from '../components/Icones'

/** Aula 9 · Bloco 2 — qualquer endereço que ninguém reivindicou cai aqui. */
export default function NaoEncontrada() {
  useEffect(() => {
    document.title = '404 · FlyNow'
  }, [])

  return (
    <div className="tela-404">
      <div className="tela-404-caixa">
        <span className="marca-simbolo tela-404-simbolo">
          <IconeAviao />
        </span>
        <p className="eyebrow">erro 404</p>
        <h1 className="login-titulo">Essa sala não existe</h1>
        <p className="login-sub">
          O endereço que você digitou não corresponde a nenhuma página do FlyNow.
        </p>
        <Link className="btn btn-primario" to="/">
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}
