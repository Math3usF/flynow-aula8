import { wiki } from './http'
import { DESTINOS_BASE } from '../data/destinos'
import type { Destino } from '../types'

const LIMITE_RESUMO = 300

type ResumoWiki = {
  title?: string
  extract?: string
}

/** Corta o extrato em fim de frase (ou palavra) — nunca no meio de uma palavra. */
function encurtar(texto: string): string {
  if (texto.length <= LIMITE_RESUMO) return texto

  const corte = texto.slice(0, LIMITE_RESUMO)
  const ultimoPonto = corte.lastIndexOf('. ')
  if (ultimoPonto > 120) return corte.slice(0, ultimoPonto + 1)

  const ultimoEspaco = corte.lastIndexOf(' ')
  return corte.slice(0, ultimoEspaco > 0 ? ultimoEspaco : LIMITE_RESUMO).trimEnd() + '…'
}

/**
 * Bloco 3 + Bloco 4 — GET na Wikipédia REST (/page/summary/:titulo).
 * Promise.allSettled: se uma página falhar, a tela inteira não cai;
 * o destino só fica com o resumo de reserva.
 */
export async function listarDestinos(): Promise<Destino[]> {
  const respostas = await Promise.allSettled(
    DESTINOS_BASE.map((destino) =>
      wiki.get<ResumoWiki>(`/page/summary/${encodeURIComponent(destino.wiki)}`),
    ),
  )

  return DESTINOS_BASE.map((base, indice) => {
    const { resumoReserva, ...resto } = base
    const resposta = respostas[indice]
    const extract =
      resposta.status === 'fulfilled' && typeof resposta.value.data.extract === 'string'
        ? resposta.value.data.extract.trim()
        : ''

    return {
      ...resto,
      resumo: extract.length > 0 ? encurtar(extract) : resumoReserva,
    }
  })
}
