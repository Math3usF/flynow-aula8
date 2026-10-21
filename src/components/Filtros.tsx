import type { CSSProperties } from 'react'
import { COR_REGIAO, REGIOES } from '../data/destinos'
import type { FiltroRegiao, Ordem } from '../types'
import { brl } from '../utils/formato'

type Props = {
  regiao: FiltroRegiao
  onRegiao: (regiao: FiltroRegiao) => void
  soBaratos: boolean
  onSoBaratos: (valor: boolean) => void
  ordem: Ordem
  onOrdem: (ordem: Ordem) => void
  busca: string
  onBusca: (valor: string) => void
  quantidade: number
  total: number
  onLimpar: () => void
  temFiltro: boolean
}

const ORDENS: { valor: Ordem; rotulo: string }[] = [
  { valor: 'preco-asc', rotulo: 'Menor preço' },
  { valor: 'preco-desc', rotulo: 'Maior preço' },
  { valor: 'nota', rotulo: 'Melhor avaliados' },
  { valor: 'nome', rotulo: 'Nome (A–Z)' },
]

export function Filtros({
  regiao,
  onRegiao,
  soBaratos,
  onSoBaratos,
  ordem,
  onOrdem,
  busca,
  onBusca,
  quantidade,
  total,
  onLimpar,
  temFiltro,
}: Props) {
  return (
    <div className="filtros">
      <div className="filtros-linha">
        <div className="chips" role="group" aria-label="Filtrar por região">
          <button
            type="button"
            className={`chip${regiao === 'todas' ? ' ativo' : ''}`}
            aria-pressed={regiao === 'todas'}
            onClick={() => onRegiao('todas')}
          >
            Todas as regiões
          </button>
          {REGIOES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`chip${regiao === item.id ? ' ativo' : ''}`}
              style={{ '--cor': COR_REGIAO[item.id] } as CSSProperties}
              aria-pressed={regiao === item.id}
              onClick={() => onRegiao(item.id)}
            >
              <span className="ponto" aria-hidden="true" />
              {item.nome}
            </button>
          ))}
        </div>

        <div className="filtros-controles">
          <label className="switch">
            <input
              type="checkbox"
              checked={soBaratos}
              onChange={(evento) => onSoBaratos(evento.target.checked)}
            />
            <span className="switch-trilho" aria-hidden="true">
              <span className="switch-bola" />
            </span>
            <span className="switch-rotulo">
              Só até <strong>R$ 650</strong>
            </span>
          </label>

          <label className="campo-select">
            <span className="campo-rotulo">Ordenar</span>
            <select value={ordem} onChange={(evento) => onOrdem(evento.target.value as Ordem)}>
              {ORDENS.map((item) => (
                <option key={item.valor} value={item.valor}>
                  {item.rotulo}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="filtros-info">
        <p>
          <strong>{quantidade}</strong> {quantidade === 1 ? 'destino' : 'destinos'} · total{' '}
          <strong>{brl(total)}</strong>
        </p>
        <div className="filtros-ativos">
          {busca !== '' && (
            <button type="button" className="chip chip-ativo" onClick={() => onBusca('')}>
              busca: “{busca}” <span aria-hidden="true">✕</span>
            </button>
          )}
          {temFiltro && (
            <button type="button" className="link-limpar" onClick={onLimpar}>
              limpar filtros
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
