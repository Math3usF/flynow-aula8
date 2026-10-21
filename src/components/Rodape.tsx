export function Rodape() {
  return (
    <footer className="rodape">
      <div className="container rodape-grade">
        <div>
          <p className="rodape-marca">FlyNow</p>
          <p className="rodape-texto">
            Projeto da Aula 8 — DOM · HOF · Axios · useEffect.
            <br />
            Laboratório de Programação Front End · Engenharia de Software · 2026.2
          </p>
        </div>

        <div>
          <p className="rodape-titulo">Dados</p>
          <ul>
            <li>
              <a href="https://pt.wikipedia.org/api/rest_v1/" target="_blank" rel="noreferrer">
                Wikipédia REST — resumos
              </a>
            </li>
            <li>
              <a href="https://dummyjson.com" target="_blank" rel="noreferrer">
                DummyJSON — POST de treino
              </a>
            </li>
            <li>
              <a href="https://commons.wikimedia.org" target="_blank" rel="noreferrer">
                Wikimedia Commons — fotos
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="rodape-titulo">Stack</p>
          <ul>
            <li>React 18 + TypeScript</li>
            <li>Vite</li>
            <li>Axios</li>
          </ul>
        </div>
      </div>

      <p className="rodape-fim">13/10/2026 · prof.ª Laís Cristine Bordallo Pinheiro</p>
    </footer>
  )
}
