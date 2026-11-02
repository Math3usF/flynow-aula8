import type { Desejo } from '../types'
import { IconeLixeira } from './Icones'

type Props = {
  desejo: Desejo
  ocupado: boolean
  aoAlternar: (d: Desejo) => void
  aoExcluir: (d: Desejo) => void
}

/** Aula 10 · Bloco 2 — uma linha da lista: sem estado próprio, só props. */
export default function DesejoItem({ desejo, ocupado, aoAlternar, aoExcluir }: Props) {
  return (
    <li className={desejo.completed ? 'desejo feito' : 'desejo'}>
      <label className="desejo-marcar">
        <input
          type="checkbox"
          checked={desejo.completed}
          disabled={ocupado}
          onChange={() => aoAlternar(desejo)}
        />
        <span className="desejo-texto">{desejo.todo}</span>
      </label>

      <button
        type="button"
        className="desejo-excluir"
        disabled={ocupado}
        onClick={() => aoExcluir(desejo)}
        aria-label={`Excluir ${desejo.todo}`}
      >
        <IconeLixeira />
        <span>Excluir</span>
      </button>
    </li>
  )
}
