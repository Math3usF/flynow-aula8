import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { login as loginApi, me } from '../services/auth'
import { CONTA_DEMO, TOKEN_DEMO, USUARIO_DEMO } from '../services/contaDemo'
import { CHAVE_TOKEN, registrarAoExpirar } from '../services/http'
import type { Usuario } from '../types'

type AuthValue = {
  /** quem está logado (null = visitante) */
  usuario: Usuario | null
  /** o JWT em texto, guardado também no localStorage */
  token: string | null
  /** true enquanto restauramos a sessão ao abrir o app */
  carregando: boolean
  login: (username: string, senha: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [token, setToken] = useState<string | null>(null)
  // Ao abrir o app ainda não sabemos se há sessão para restaurar.
  const [carregando, setCarregando] = useState(true)

  const logout = useCallback(() => {
    localStorage.removeItem(CHAVE_TOKEN)
    setToken(null)
    setUsuario(null)
  }, [])

  async function entrar(username: string, senha: string) {
    // Conta local de demonstração (admin / admin@123): não existe na API,
    // então nem chamamos a rede — o "login" é conferido aqui mesmo.
    if (username.trim().toLowerCase() === CONTA_DEMO.username && senha === CONTA_DEMO.password) {
      localStorage.setItem(CHAVE_TOKEN, TOKEN_DEMO)
      setToken(TOKEN_DEMO)
      setUsuario(USUARIO_DEMO)
      return
    }

    // Se a senha estiver errada o Axios lança e nada abaixo roda:
    // o erro sobe para a tela de Login tratar.
    const dados = await loginApi(username, senha)

    localStorage.setItem(CHAVE_TOKEN, dados.accessToken)
    setToken(dados.accessToken)
    setUsuario({
      id: dados.id,
      username: dados.username,
      email: dados.email,
      firstName: dados.firstName,
      lastName: dados.lastName,
      image: dados.image,
    })
  }

  // Restaura a sessão ao abrir o app: lê o token e pergunta à API quem é o dono.
  useEffect(() => {
    const salvo = localStorage.getItem(CHAVE_TOKEN)

    if (!salvo) {
      setCarregando(false)
      return
    }

    // Token da conta local: não há /auth/me para consultar, o "dono" é fixo.
    if (salvo === TOKEN_DEMO) {
      setToken(TOKEN_DEMO)
      setUsuario(USUARIO_DEMO)
      setCarregando(false)
      return
    }

    me(salvo)
      .then((u) => {
        setToken(salvo)
        setUsuario(u)
      })
      .catch(() => localStorage.removeItem(CHAVE_TOKEN))
      .finally(() => setCarregando(false))
  }, [])

  // 401 em qualquer chamada (token vencido) → o interceptor avisa e nós deslogamos.
  useEffect(() => {
    registrarAoExpirar(logout)
    return () => registrarAoExpirar(null)
  }, [logout])

  return (
    <AuthContext.Provider value={{ usuario, token, carregando, login: entrar, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

/** Hook customizado: lê o Context e falha cedo se faltou o Provider. */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth precisa estar dentro de <AuthProvider>')
  }
  return ctx
}
