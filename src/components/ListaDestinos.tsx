import type { Destino, ItemViagem } from '../types'
import { CardDestino } from './CardDestino'

type Props = {
  destinos: Destino[]
  carregando: boolean
  erro: string | null
  onRecarregar: () => void
  viagem: ItemViagem[]
  onAdicionar: (destino: Destino) => void
  onLimparFiltros: () => void
}

function viajantesDe(viagem: ItemViagem[], id: string) {
  return viagem.find((item) => item.destino.id === id)?.viajantes ?? 0
}

export function ListaDestinos({
  destinos,
  carregando,
  erro,
  onRecarregar,
  viagem,
  onAdicionar,
  onLimparFiltros,
}: Props) {
  if (carregando) {
    return (
      <div className="grade" aria-busy="true" aria-live="polite">
        {Array.from({ length: 8 }).map((_, indice) => (
          <div className="esqueleto" key={indice}>
            <div className="esqueleto-foto" />
            <div className="esqueleto-corpo">
              <span className="esqueleto-linha w60" />
              <span className="esqueleto-linha w40" />
              <span className="esqueleto-linha" />
              <span className="esqueleto-linha w80" />
            </div>
          </div>
        ))}
        <p className="sr-only">Carregando destinos…</p>
      </div>
    )
  }

  if (erro) {
    return (
      <div className="erro-caixa" role="alert">
        <p className="erro-titulo">Não deu pra carregar.</p>
        <p className="erro-texto">{erro}</p>
        <button type="button" className="btn btn-primario" onClick={onRecarregar}>
          Tentar de novo
        </button>
      </div>
    )
  }

  if (destinos.length === 0) {
    return (
      <div className="vazio-caixa">
        <p className="vazio-titulo">Nenhum destino com esses filtros.</p>
        <p className="vazio-texto">
          Tente outra região, desligue o “Só até R$ 650” ou limpe a busca.
        </p>
        <button type="button" className="btn btn-fantasma" onClick={onLimparFiltros}>
          Limpar filtros
        </button>
      </div>
    )
  }

  return (
    <div className="grade">
      {destinos.map((destino) => (
        <CardDestino
          key={destino.id}
          destino={destino}
          viajantes={viajantesDe(viagem, destino.id)}
          onAdicionar={onAdicionar}
        />
      ))}
    </div>
  )
}
