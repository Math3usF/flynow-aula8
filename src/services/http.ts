import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { registrar } from './registro'

/**
 * Bloco 3 — as duas instâncias do Axios.
 * A URL vem do .env (prefixo VITE_ obrigatório). Se faltar, cai no padrão.
 */
const WIKI_URL = import.meta.env.VITE_WIKI_URL ?? 'https://pt.wikipedia.org/api/rest_v1'
const API_URL = import.meta.env.VITE_API_URL ?? 'https://dummyjson.com'

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

export const wiki = axios.create({ baseURL: WIKI_URL })
export const api = axios.create({ baseURL: API_URL })

instrumentar(wiki)
instrumentar(api)
