import type { Requisicao } from '../types'

/**
 * "Mini Network": um barramento simples que os interceptors do Axios alimentam.
 * O painel do laboratório se inscreve com useEffect e se desinscreve no cleanup.
 */
type Ouvinte = (requisicao: Requisicao) => void

const ouvintes = new Set<Ouvinte>()
const historico: Requisicao[] = []
let sequencia = 0

export function registrar(dados: Omit<Requisicao, 'id' | 'ok'>) {
  const requisicao: Requisicao = {
    ...dados,
    id: (sequencia += 1),
    ok: dados.status >= 200 && dados.status < 400,
  }

  historico.unshift(requisicao)
  if (historico.length > 24) historico.length = 24

  ouvintes.forEach((ouvinte) => ouvinte(requisicao))
}

/** Últimas requisições (para o painel abrir já com o histórico). */
export function ultimas(): Requisicao[] {
  return [...historico]
}

/** Devolve a função de limpeza (é ela que o useEffect usa no return). */
export function inscrever(ouvinte: Ouvinte): () => void {
  ouvintes.add(ouvinte)
  return () => {
    ouvintes.delete(ouvinte)
  }
}
