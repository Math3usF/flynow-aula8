import { useState } from 'react'
import { IconeTerminal } from './Icones'

const TITULO_ORIGINAL = 'FlyNow — Minha Lista de Viagem'

export function LabDom() {
  const [titulo, setTitulo] = useState(TITULO_ORIGINAL)
  const [inspecao, setInspecao] = useState<string | null>(null)

  function inspecionar() {
    const alvo = document.querySelector<HTMLElement>('#alvo-dom')
    if (!alvo) return

    setInspecao(
      [
        "document.querySelector('#alvo-dom')",
        '',
        `tagName:     <${alvo.tagName.toLowerCase()}>`,
        `textContent: "${alvo.textContent}"`,
        `classList:   [${Array.from(alvo.classList).join(', ')}]`,
        `outerHTML:   ${alvo.outerHTML.slice(0, 96)}…`,
      ].join('\n'),
    )
  }

  function trocarTexto() {
    const alvo = document.querySelector<HTMLElement>('#alvo-dom')
    if (!alvo) return
    alvo.textContent = 'FlyNow — bastidor'
    inspecionar()
  }

  function alternarClasse() {
    const alvo = document.querySelector<HTMLElement>('#alvo-dom')
    if (!alvo) return
    alvo.classList.toggle('destaque-dom')
    inspecionar()
  }

  function voltarPeloEstado() {
    setTitulo((atual) =>
      atual === TITULO_ORIGINAL ? 'FlyNow — escrito pelo React' : TITULO_ORIGINAL,
    )
  }

  return (
    <article className="lab-card" id="dom">
      <header className="lab-cabecalho">
        <span className="lab-icone">
          <IconeTerminal />
        </span>
        <div>
          <h3 className="lab-titulo">Bloco 1 · DOM ao vivo</h3>
          <p className="lab-sub">
            O console mexe no palco; o React só obedece ao roteiro (o estado).
          </p>
        </div>
      </header>

      <div className="lab-corpo">
        <div className="lab-controles">
          <div className="lab-botoes">
            <button type="button" className="btn btn-fantasma" onClick={inspecionar}>
              Inspecionar
            </button>
            <button type="button" className="btn btn-fantasma" onClick={trocarTexto}>
              Trocar texto no DOM
            </button>
            <button type="button" className="btn btn-fantasma" onClick={alternarClasse}>
              Ligar classe .destaque
            </button>
            <button type="button" className="btn btn-primario" onClick={voltarPeloEstado}>
              Devolver ao React
            </button>
          </div>

          <div className="alvo-caixa">
            <span className="alvo-rotulo">alvo · #alvo-dom</span>
            <h4 className="alvo-dom" id="alvo-dom">
              {titulo}
            </h4>
          </div>

          <pre className="terminal terminal-pequeno">
            <code>{`const titulo = document.querySelector('#alvo-dom')
titulo.textContent = 'FlyNow — bastidor'
titulo.classList.add('destaque')`}</code>
          </pre>
        </div>

        <div className="terminal">
          <div className="terminal-topo">
            <span className="terminal-bolinhas" aria-hidden="true">
              <i /> <i /> <i />
            </span>
            <span>console</span>
          </div>
          <pre className="terminal-corpo">
            <code>{inspecao ?? '> clique em “Inspecionar” para ver o nó.'}</code>
          </pre>
        </div>
      </div>

      <p className="lab-nota">
        O “Trocar texto no DOM” altera o elemento direto, sem o React saber — e o próximo
        <strong> F5</strong> desfaz. O botão “Devolver ao React” muda o <em>estado</em>: aí o React
        reescreve por cima. É a regra do Bloco 1: <strong>fonte da verdade = código + estado</strong>.
      </p>
    </article>
  )
}
