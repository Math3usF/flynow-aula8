import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { registrar } from './registro'
import { TOKEN_DEMO } from './contaDemo'

/**
 * Bloco 3 — as duas instâncias do Axios.
 * A URL vem do .env (prefixo VITE_ obrigatório). Se faltar, cai no padrão.
 */
const WIKI_URL = import.meta.env.VITE_WIKI_URL ?? 'https://pt.wikipedia.org/api/rest_v1'
const API_URL = import.meta.env.VITE_API_URL ?? 'https://dummyjson.com'

export const CHAVE_TOKEN = 'flynow.token'

type ConfigComInicio = InternalAxiosRequestConfig & { __inicio?: number }

/** Mede o tempo e alimenta o "mini Network" do laboratório. */
function instrumentar(instancia: AxiosInstance) {
  instancia.interceptors.request.use((config) => {
    const comInicio = config as ConfigComInicio
    comInicio.__inicio = performance.now()
    return config
  })

  instancia.interceptors.response.use(
    (resposta) => {
      const config = resposta.config as ConfigComInicio
      registrar({
        metodo: (config.method ?? 'get').toUpperCase(),
        url: `${config.baseURL ?? ''}${config.url ?? ''}`,
        status: resposta.status,
        ms: Math.round(performance.now() - (config.__inicio ?? performance.now())),
      })
      return resposta
    },
    (erro) => {
      const config = (erro?.config ?? {}) as ConfigComInicio
      registrar({
        metodo: (config.method ?? 'get').toUpperCase(),
        url: `${config.baseURL ?? ''}${config.url ?? ''}`,
        status: erro?.response?.status ?? 0,
        ms: Math.round(performance.now() - (config.__inicio ?? performance.now())),
      })
      return Promise.reject(erro)
    },
  )
}

/** timeout: se a API não responder em 10 s, o Axios cancela (ECONNABORTED). */
export const wiki = axios.create({ baseURL: WIKI_URL, timeout: 10000 })
export const api = axios.create({ baseURL: API_URL, timeout: 10000 })

instrumentar(wiki)
instrumentar(api)

/**
 * Aula 10 · Bloco 3 — interceptor de request: carimba o token em todo pedido.
 * Só na instância `api` (mandar o token à Wikipédia não faria sentido).
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(CHAVE_TOKEN)
  // A conta local de demonstração não tem JWT: mandar "Bearer demo-local"
  // só sujaria o cabeçalho, então esse token não é carimbado.
  if (token && token !== TOKEN_DEMO) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/**
 * Aula 10 · Bloco 3 — interceptor de response: 401 = sessão vencida.
 * Quem sabe deslogar é o AuthContext, que se registra aqui.
 */
let aoExpirar: (() => void) | null = null

export function registrarAoExpirar(fn: (() => void) | null) {
  aoExpirar = fn
}

api.interceptors.response.use(
  (resposta) => resposta,
  (erro) => {
    const ehLogin = String(erro?.config?.url).includes('/auth/login')
    if (axios.isAxiosError(erro) && erro.response?.status === 401 && !ehLogin) {
      aoExpirar?.()
    }
    return Promise.reject(erro)
  },
)
