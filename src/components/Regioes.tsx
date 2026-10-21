import type { CSSProperties } from 'react'
import { COR_REGIAO, REGIOES } from '../data/destinos'
import type { Destino, FiltroRegiao } from '../types'
import { brl } from '../utils/formato'
import { IconeGlobo } from './Icones'

type Props = {
  destinos: Destino[]
  ativa: FiltroRegiao
  onEscolher: (regiao: FiltroRegiao) => void
}

export function Regioes({ destinos, ativa, onEscolher }: Props) {
  const resumo = REGIOES.map((regiao) => {
    const daRegiao = destinos.filter((destino) => destino.regiao === regiao.id)
    const menor = daRegiao.reduce(
      (menorPreco, destino) => (destino.preco < menorPreco ? destino.preco : menorPreco),
      Number.POSITIVE_INFINITY,
    )
    return { ...regiao, quantidade: daRegiao.length, menor }
  })

  return (
    <section className="secao secao-regioes" id="regioes">
      <div className="secao-cabecalho">
        <p className="eyebrow">
          <IconeGlobo /> por região
        </p>
        <h2 className="secao-titulo">Escolha o continente, depois o destino</h2>
        <p className="secao-sub">
          Cada região tem uma faixa de preço diferente. Clique em uma para filtrar a lista abaixo.
        </p>
      </div>

      <div className="regioes">
        {resumo.map((regiao) => {
          const selecionada = ativa === regiao.id
          return (
            <button
              key={regiao.id}
              type="button"
              className={`regiao-card${selecionada ? ' ativa' : ''}`}
              style={{ '--cor': COR_REGIAO[regiao.id] } as CSSProperties}
              aria-pressed={selecionada}
              onClick={() => onEscolher(selecionada ? 'todas' : regiao.id)}
            >
              <span className="regiao-foto">
                <img src={regiao.imagem} alt="" aria-hidden="true" loading="lazy" />
              </span>
              <span className="regiao-corpo">
                <span className="regiao-nome">{regiao.nome}</span>
                <span className="regiao-desc">{regiao.descricao}</span>
                <span className="regiao-meta">
                  {regiao.quantidade} destinos
                  {regiao.quantidade > 0 && <> · a partir de {brl(regiao.menor)}</>}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
