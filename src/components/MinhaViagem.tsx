import type { ItemViagem } from '../types'
import { brl } from '../utils/formato'
import { IconeLixeira, IconeMais, IconeMenos, IconeMala } from './Icones'

type Props = {
  viagem: ItemViagem[]
  onRemover: (id: string) => void
  onAlterarViajantes: (id: string, delta: number) => void
  onLimpar: () => void
}

export function MinhaViagem({ viagem, onRemover, onAlterarViajantes, onLimpar }: Props) {
  const totalViajantes = viagem.reduce((soma, item) => soma + item.viajantes, 0)
  const total = viagem.reduce((soma, item) => soma + item.destino.preco * item.viajantes, 0)

  return (
    <section className="secao secao-viagem" id="viagem">
      <div className="secao-cabecalho">
        <p className="eyebrow">
          <IconeMala /> minha viagem
        </p>
        <h2 className="secao-titulo">Sua lista, seu total</h2>
        <p className="secao-sub">
          Tudo aqui é <strong>estado derivado</strong>: destino, viajantes e total saem de um
          <code>reduce</code> sobre a lista — nada é guardado em dobro.
        </p>
      </div>

      {viagem.length === 0 ? (
        <div className="vazio-viagem">
          <span className="vazio-emoji" aria-hidden="true">
            🧳
          </span>
          <p className="vazio-titulo">Sua viagem está vazia.</p>
          <p className="vazio-texto">
            Escolha um destino na lista acima e clique em <strong>Adicionar</strong>.
          </p>
          <a className="btn btn-primario" href="#destinos">
            Ver destinos
          </a>
        </div>
      ) : (
        <div className="viagem-grade">
          <ul className="viagem-lista">
            {viagem.map(({ destino, viajantes }) => (
              <li className="item-viagem" key={destino.id}>
                <img className="item-foto" src={destino.imagem} alt="" aria-hidden="true" />
                <div className="item-info">
                  <span className="item-nome">{destino.nome}</span>
                  <span className="item-meta">
                    {destino.pais} · {brl(destino.preco)} por pessoa
                  </span>
                </div>

                <div className="qtd" role="group" aria-label={`Viajantes em ${destino.nome}`}>
                  <button
                    type="button"
                    onClick={() => onAlterarViajantes(destino.id, -1)}
                    aria-label={`Menos um viajante em ${destino.nome}`}
                  >
                    <IconeMenos />
                  </button>
                  <span aria-live="polite">{viajantes}</span>
                  <button
                    type="button"
                    onClick={() => onAlterarViajantes(destino.id, 1)}
                    aria-label={`Mais um viajante em ${destino.nome}`}
                  >
                    <IconeMais />
                  </button>
                </div>

                <span className="item-subtotal">{brl(destino.preco * viajantes)}</span>

                <button
                  type="button"
                  className="item-remover"
                  onClick={() => onRemover(destino.id)}
                  aria-label={`Remover ${destino.nome} da viagem`}
                >
                  <IconeLixeira />
                </button>
              </li>
            ))}
          </ul>

          <aside className="resumo-viagem">
            <p className="resumo-rotulo">Resumo</p>
            <dl className="resumo-linhas">
              <div>
                <dt>destinos</dt>
                <dd>{viagem.length}</dd>
              </div>
              <div>
                <dt>viajantes</dt>
                <dd>{totalViajantes}</dd>
              </div>
              <div>
                <dt>média por pessoa</dt>
                <dd>{brl(Math.round(total / Math.max(totalViajantes, 1)))}</dd>
              </div>
            </dl>

            <div className="resumo-total">
              <span>total da viagem</span>
              <strong>{brl(total)}</strong>
            </div>

            <p className="resumo-nota">
              <code>reduce</code> sobre a lista · recalculado a cada render. Remover usa
              <code> filter</code>; mudar a quantidade usa <code>map</code> — nunca <code>push</code>.
            </p>

            <button type="button" className="btn btn-fantasma btn-bloco" onClick={onLimpar}>
              Limpar viagem
            </button>
          </aside>
        </div>
      )}
    </section>
  )
}
