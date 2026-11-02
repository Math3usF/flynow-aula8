import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { IconeAviao } from '../components/Icones'
import { useAuth } from '../contexts/AuthContext'

function mensagemDeLogin(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (!err.response) return 'Sem conexão. Confere a internet e tenta de novo.'
    const status = err.response.status
    if (status === 400 || status === 401) return 'Usuário ou senha incorretos.'
    if (status >= 500) return 'O servidor está com problema. Tenta daqui a pouco.'
  }
  return 'Não foi possível entrar. Tenta de novo.'
}

/** Aula 9 · Bloco 4 — a única rota pública do app. */
export default function Login() {
  const { login, usuario } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [senha, setSenha] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErro(null)
    setEnviando(true)
    try {
      await login(username, senha)
      navigate('/', { replace: true })
    } catch (err) {
      setErro(mensagemDeLogin(err))
    } finally {
      setEnviando(false)
    }
  }

  useEffect(() => {
    document.title = 'Entrar · FlyNow'
  }, [])

  // Já logado(a) não precisa ver o formulário.
  if (usuario) return <Navigate to="/" replace />

  return (
    <div className="tela-login">
      <div className="login-card">
        <Link className="marca login-marca" to="/">
          <span className="marca-simbolo">
            <IconeAviao />
          </span>
          <span className="marca-texto">
            FlyNow
            <small>agência de viagens</small>
          </span>
        </Link>

        <p className="eyebrow">área logada</p>
        <h1 className="login-titulo">Entrar no FlyNow</h1>
        <p className="login-sub">
          Entre para comparar destinos e guardar os lugares que você quer conhecer.
        </p>

        <form className="login-form" onSubmit={enviar} noValidate>
          <div className="campo">
            <label htmlFor="username">Usuário</label>
            <input
              id="username"
              name="username"
              value={username}
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              name="senha"
              type="password"
              value={senha}
              autoComplete="current-password"
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {erro && (
            <p className="aviso aviso-erro" role="alert">
              {erro}
            </p>
          )}

          <button type="submit" className="btn btn-primario btn-bloco" disabled={enviando}>
            {enviando ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <div className="login-dica">
          <p>
            <strong>Login real (DummyJSON):</strong> <code>emilys</code> / <code>emilyspass</code>
          </p>
          <p>
            <strong>Conta local de demonstração:</strong> <code>admin</code> / <code>admin@123</code>
          </p>
        </div>
      </div>
    </div>
  )
}
