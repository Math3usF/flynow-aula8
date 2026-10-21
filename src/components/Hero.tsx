import { brl } from '../utils/formato'
import { IconeBusca } from './Icones'

type Props = {
  busca: string
  onBusca: (valor: string) => void
  total: number
  regioes: number
  menorPreco: number
}

export function Hero({ busca, onBusca, total, regioes, menorPreco }: Props) {
  return (
    <section className="hero" id="topo">
      <img
        className="hero-fundo"
        src="/img/destinos/hero-rio.jpg"
        alt=""
        aria-hidden="true"
        decoding="async"
      />
      <div className="hero-veu" aria-hidden="true" />

      <div className="hero-conteudo">
        <p className="hero-eyebrow">
          <span className="hero-ponto" aria-hidden="true" />
          temporada 2026 · {total} destinos em {regioes} regiões
        </p>

        <h1 className="hero-titulo">
          Seu próximo destino <em>começa aqui</em>.
        </h1>

        <p className="hero-sub">
          Compare destinos por região, monte a lista da viagem e acompanhe o total. Os resumos chegam
          ao vivo da Wikipédia — e a lista inteira é derivada de um único estado.
        </p>

        <div className="busca">
          <IconeBusca className="busca-icone" />
          <input
            type="search"
            value={busca}
            onChange={(evento) => onBusca(evento.target.value)}
            placeholder="Buscar destino ou país — ex.: Lisboa, Japão"
            aria-label="Buscar destino ou país"
          />
          {busca !== '' && (
            <button type="button" className="busca-limpar" onClick={() => onBusca('')}>
              limpar
            </button>
          )}
        </div>

        <dl className="hero-stats">
          <div>
            <dt>destinos</dt>
            <dd>{total}</dd>
          </div>
          <div>
            <dt>regiões</dt>
            <dd>{regioes}</dd>
          </div>
          <div>
            <dt>a partir de</dt>
            <dd>{total > 0 ? brl(menorPreco) : '—'}</dd>
          </div>
          <div>
            <dt>em até 12x</dt>
            <dd>{total > 0 ? brl(Math.round(menorPreco / 12)) : '—'}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
