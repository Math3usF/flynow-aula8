import type { CSSProperties } from 'react'
import { COR_REGIAO, ROTULO_REGIAO } from '../data/destinos'
import type { Destino } from '../types'
import { brl } from '../utils/formato'
import { IconeCheck, IconeMais, IconePino, IconeEstrela } from './Icones'

type Props = {
  destino: Destino
  viajantes: number
  onAdicionar: (destino: Destino) => void
}

export function CardDestino({ destino, viajantes, onAdicionar }: Props) {
  const naViagem = viajantes > 0

  return (
    <article className="card-destino" data-destino={destino.id}>
      <figure className="card-foto">
        <img src={destino.imagem} alt={`${destino.nome}, ${destino.pais}`} loading="lazy" />
        <span className="card-selo" style={{ '--cor': COR_REGIAO[destino.regiao] } as CSSProperties}>
          {ROTULO_REGIAO[destino.regiao]}
        </span>
        {destino.destaque && <span className="card-destaque">★ destaque FlyNow</span>}
        <span className="card-preco">
          {brl(destino.preco)}
          <small>/pessoa</small>
        </span>
      </figure>

      <div className="card-corpo">
        <h3 className="card-nome">{destino.nome}</h3>
        <p className="card-pais">
          <IconePino /> {destino.pais} · {destino.dias} dias
        </p>
        <p className="card-resumo">{destino.resumo}</p>

        <div className="card-rodape">
          <span className="nota" title={`Nota ${destino.nota} de 5`}>
            <IconeEstrela /> {destino.nota.toFixed(1)}
          </span>

          <button
            type="button"
            className={naViagem ? 'btn btn-na-viagem' : 'btn btn-adicionar'}
            onClick={() => onAdicionar(destino)}
            aria-label={
              naViagem
                ? `Adicionar mais um viajante em ${destino.nome}`
                : `Adicionar ${destino.nome} à viagem`
            }
          >
            {naViagem ? (
              <>
                <IconeCheck /> Na viagem · {viajantes}
              </>
            ) : (
              <>
                <IconeMais /> Adicionar
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}
