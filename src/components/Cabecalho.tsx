import { IconeAviao, IconeMala } from './Icones'

type Props = { itens: number }

export function Cabecalho({ itens }: Props) {
  return (
    <header className="topo">
      <div className="topo-inner">
        <a className="marca" href="#topo" aria-label="FlyNow — voltar ao início">
          <span className="marca-simbolo">
            <IconeAviao />
          </span>
          <span className="marca-texto">
            FlyNow
            <small>agência de viagens</small>
          </span>
        </a>

        <nav className="nav" aria-label="Seções do site">
          <a href="#regioes">Regiões</a>
          <a href="#destinos">Destinos</a>
          <a href="#viagem">Viagem</a>
          <a href="#laboratorio">Laboratório</a>
        </nav>

        <a className="btn btn-primario btn-viagem" href="#viagem">
          <IconeMala />
          <span>Minha viagem</span>
          {itens > 0 && <span className="contador">{itens}</span>}
        </a>
      </div>
    </header>
  )
}
