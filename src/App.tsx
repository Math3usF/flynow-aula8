import { useEffect, useMemo, useRef, useState } from 'react'
import { Cabecalho } from './components/Cabecalho'
import { Filtros } from './components/Filtros'
import { Hero } from './components/Hero'
import { LabAxios } from './components/LabAxios'
import { LabDom } from './components/LabDom'
import { ListaDestinos } from './components/ListaDestinos'
import { MinhaViagem } from './components/MinhaViagem'
import { Regioes } from './components/Regioes'
import { Rodape } from './components/Rodape'
import { DESTINOS_BASE, REGIOES } from './data/destinos'
import { listarDestinos } from './services/destinos'
import type { Destino, FiltroRegiao, ItemViagem, Ordem } from './types'

export default function App() {
  // ---- Bloco 4: os três estados + o efeito que busca ao abrir a tela ----
  const [destinos, setDestinos] = useState<Destino[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [recarregar, setRecarregar] = useState(0)

  // ---- filtros (Bloco 2) ----
  const [regiao, setRegiao] = useState<FiltroRegiao>('todas')
  const [soBaratos, setSoBaratos] = useState(false)
  const [busca, setBusca] = useState('')
  const [ordem, setOrdem] = useState<Ordem>('preco-asc')

  // ---- minha viagem ----
  const [viagem, setViagem] = useState<ItemViagem[]>([])

  const [toast, setToast] = useState<string | null>(null)
  const timerToast = useRef<number | undefined>(undefined)

  useEffect(() => {
    let ativo = true

    async function carregar() {
      setCarregando(true)
      setErro(null)

      try {
        const dados = await listarDestinos()
        if (ativo) setDestinos(dados)
      } catch {
        if (ativo) setErro('Confere a conexão e tenta de novo: a lista vem da API da Wikipédia.')
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    carregar()

    // cleanup: se o componente sair da tela, não atualiza estado à toa
    return () => {
      ativo = false
    }
  }, [recarregar])

  // Bloco 1 + 4: o título da aba é DOM — quem mexe "de fora" no React é o efeito.
  const visiveis = useMemo(() => {
    const termo = busca.trim().toLowerCase()

    const filtrados = destinos.filter((destino) => {
      const daRegiao = regiao === 'todas' || destino.regiao === regiao
      const noPreco = !soBaratos || destino.preco <= 650
      const naBusca =
        termo === '' ||
        destino.nome.toLowerCase().includes(termo) ||
        destino.pais.toLowerCase().includes(termo)
      return daRegiao && noPreco && naBusca
    })

    // sort sempre em uma cópia: nunca mutar o array que veio do estado/filtro
    switch (ordem) {
      case 'preco-asc':
        return [...filtrados].sort((a, b) => a.preco - b.preco)
      case 'preco-desc':
        return [...filtrados].sort((a, b) => b.preco - a.preco)
      case 'nota':
        return [...filtrados].sort((a, b) => b.nota - a.nota)
      default:
        return [...filtrados].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
    }
  }, [destinos, regiao, soBaratos, busca, ordem])

  const totalVisivel = useMemo(
    () => visiveis.reduce((soma, destino) => soma + destino.preco, 0),
    [visiveis],
  )

  const totalViajantes = useMemo(
    () => viagem.reduce((soma, item) => soma + item.viajantes, 0),
    [viagem],
  )

  const menorPreco = useMemo(
    () => destinos.reduce((menor, destino) => Math.min(menor, destino.preco), Number.POSITIVE_INFINITY),
    [destinos],
  )

  useEffect(() => {
    document.title = `${visiveis.length} destinos · FlyNow`
  }, [visiveis.length])

  useEffect(() => {
    return () => window.clearTimeout(timerToast.current)
  }, [])

  function avisar(mensagem: string) {
    setToast(mensagem)
    window.clearTimeout(timerToast.current)
    timerToast.current = window.setTimeout(() => setToast(null), 2400)
  }

  function adicionar(destino: Destino) {
    const jaEsta = viagem.some((item) => item.destino.id === destino.id)

    setViagem((atual) =>
      jaEsta
        ? atual.map((item) =>
            item.destino.id === destino.id ? { ...item, viajantes: item.viajantes + 1 } : item,
          )
        : [...atual, { destino, viajantes: 1 }],
    )

    avisar(jaEsta ? `${destino.nome} · mais 1 viajante` : `${destino.nome} entrou na sua viagem`)
  }

  function alterarViajantes(id: string, delta: number) {
    setViagem((atual) =>
      atual
        .map((item) =>
          item.destino.id === id ? { ...item, viajantes: item.viajantes + delta } : item,
        )
        .filter((item) => item.viajantes > 0),
    )
  }

  function remover(id: string) {
    setViagem((atual) => atual.filter((item) => item.destino.id !== id))
    avisar('Destino removido da viagem')
  }

  function limparFiltros() {
    setRegiao('todas')
    setSoBaratos(false)
    setBusca('')
  }

  const temFiltro = regiao !== 'todas' || soBaratos || busca !== ''
  const totalBase = destinos.length || DESTINOS_BASE.length

  return (
    <div className="pagina">
      <Cabecalho itens={totalViajantes} />

      <main className="container">
        <Hero
          busca={busca}
          onBusca={setBusca}
          total={totalBase}
          regioes={REGIOES.length}
          menorPreco={menorPreco}
        />

        <Regioes destinos={destinos} ativa={regiao} onEscolher={setRegiao} />

        <section className="secao" id="destinos">
          <div className="secao-cabecalho">
            <p className="eyebrow">a lista</p>
            <h2 className="secao-titulo">FlyNow — Minha Lista de Viagem</h2>
            <p className="secao-sub">
              Os resumos vêm da API (com fallback local), o filtro por região e por preço é{' '}
              <code>filter</code>, o total é <code>reduce</code> e cada item é <code>map</code> com{' '}
              <code>key={'{d.id}'}</code>.
            </p>
          </div>

          <Filtros
            regiao={regiao}
            onRegiao={setRegiao}
            soBaratos={soBaratos}
            onSoBaratos={setSoBaratos}
            ordem={ordem}
            onOrdem={setOrdem}
            busca={busca}
            onBusca={setBusca}
            quantidade={visiveis.length}
            total={totalVisivel}
            onLimpar={limparFiltros}
            temFiltro={temFiltro}
          />

          <ListaDestinos
            destinos={visiveis}
            carregando={carregando}
            erro={erro}
            onRecarregar={() => setRecarregar((valor) => valor + 1)}
            viagem={viagem}
            onAdicionar={adicionar}
            onLimparFiltros={limparFiltros}
          />
        </section>

        <MinhaViagem
          viagem={viagem}
          onRemover={remover}
          onAlterarViajantes={alterarViajantes}
          onLimpar={() => {
            setViagem([])
            avisar('Viagem limpa')
          }}
        />

        <section className="secao secao-lab" id="laboratorio">
          <div className="secao-cabecalho">
            <p className="eyebrow">os bastidores</p>
            <h2 className="secao-titulo">Laboratório: DOM e Axios</h2>
            <p className="secao-sub">
              Duas provas rápidas, no navegador, do que está no material: o DOM sendo mexido por
              fora e as requisições do Axios com o status de cada resposta.
            </p>
          </div>

          <div className="lab-grade">
            <LabDom />
            <LabAxios />
          </div>
        </section>
      </main>

      <Rodape />

      {toast && (
        <div className="toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </div>
  )
}
