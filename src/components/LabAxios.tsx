import axios from 'axios'
import { useEffect, useState } from 'react'
import { wiki } from '../services/http'
import { buscarRotaInexistente, criarTarefa, type Tarefa } from '../services/tarefas'
import { inscrever, ultimas } from '../services/registro'
import type { Requisicao } from '../types'
import { IconeLixeira, IconeTerminal } from './Icones'

type Saida = { tipo: 'ok' | 'erro'; titulo: string; corpo: string }

export function LabAxios() {
  const [log, setLog] = useState<Requisicao[]>(() => ultimas())
  const [saida, setSaida] = useState<Saida | null>(null)
  const [ocupado, setOcupado] = useState(false)
  const [tarefas, setTarefas] = useState<Tarefa[]>([])

  // inscrever devolve a função de limpeza: é ela que o useEffect usa no return.
  useEffect(() => inscrever((requisicao) => setLog((atual) => [requisicao, ...atual].slice(0, 12))), [])

  function tratarErro(erro: unknown) {
    if (axios.isAxiosError(erro)) {
      setSaida({
        tipo: 'erro',
        titulo: `${erro.response?.status ?? 'sem resposta'} · ${erro.code ?? 'erro de rede'}`,
        corpo: JSON.stringify(erro.response?.data ?? { mensagem: erro.message }, null, 2),
      })
      return
    }
    setSaida({ tipo: 'erro', titulo: 'erro inesperado', corpo: String(erro) })
  }

  async function buscarResumo() {
    setOcupado(true)
    try {
      const { data } = await wiki.get<{ title: string; extract: string }>(
        `/page/summary/${encodeURIComponent('Tóquio')}`,
      )
      setSaida({ tipo: 'ok', titulo: `200 · ${data.title}`, corpo: data.extract.slice(0, 220) + '…' })
    } catch (erro) {
      tratarErro(erro)
    } finally {
      setOcupado(false)
    }
  }

  async function criar() {
    setOcupado(true)
    try {
      const nova = await criarTarefa('Revisar HOF')
      // O DummyJSON não grava: atualizamos o estado local com um array novo.
      setTarefas((atuais) => [nova, ...atuais])
      setSaida({
        tipo: 'ok',
        titulo: `201 · tarefa #${nova.id} criada`,
        corpo: JSON.stringify(nova, null, 2),
      })
    } catch (erro) {
      tratarErro(erro)
    } finally {
      setOcupado(false)
    }
  }

  async function provocarErro() {
    setOcupado(true)
    try {
      await buscarRotaInexistente()
      setSaida({ tipo: 'ok', titulo: '200 · não deveria acontecer', corpo: '' })
    } catch (erro) {
      tratarErro(erro)
    } finally {
      setOcupado(false)
    }
  }

  return (
    <article className="lab-card" id="axios">
      <header className="lab-cabecalho">
        <span className="lab-icone">
          <IconeTerminal />
        </span>
        <div>
          <h3 className="lab-titulo">Bloco 3 · Axios ao vivo</h3>
          <p className="lab-sub">
            Duas instâncias (<code>wiki</code> e <code>api</code>) com a URL vinda do <code>.env</code>.
          </p>
        </div>
      </header>

      <div className="lab-corpo">
        <div className="lab-controles">
          <div className="lab-botoes">
            <button type="button" className="btn-lab" onClick={buscarResumo} disabled={ocupado}>
              <span className="metodo m-get">GET</span> resumo da Wikipédia
            </button>
            <button type="button" className="btn-lab" onClick={criar} disabled={ocupado}>
              <span className="metodo m-post">POST</span> /todos/add
            </button>
            <button type="button" className="btn-lab" onClick={provocarErro} disabled={ocupado}>
              <span className="metodo m-get">GET</span> rota inexistente (404)
            </button>
          </div>

          <div className={`terminal saida ${saida ? `saida-${saida.tipo}` : ''}`}>
            <div className="terminal-topo">
              <span className="terminal-bolinhas" aria-hidden="true">
                <i /> <i /> <i />
              </span>
              <span>{saida ? saida.titulo : 'resposta'}</span>
            </div>
            <pre className="terminal-corpo">
              <code>
                {saida
                  ? saida.corpo
                  : 'Clique em um pedido acima. O corpo vem em response.data e o código em response.status.'}
              </code>
            </pre>
          </div>

          {tarefas.length > 0 && (
            <div className="tarefas">
              <p className="tarefas-rotulo">Criadas nesta sessão (estado local)</p>
              <ul>
                {tarefas.map((tarefa) => (
                  <li key={tarefa.id}>
                    <span className="tarefa-id">#{tarefa.id}</span>
                    <span className="tarefa-texto">{tarefa.todo}</span>
                    <button
                      type="button"
                      className="item-remover"
                      aria-label={`Remover tarefa ${tarefa.id}`}
                      onClick={() =>
                        setTarefas((atuais) => atuais.filter((item) => item.id !== tarefa.id))
                      }
                    >
                      <IconeLixeira />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="net">
          <p className="net-rotulo">
            mini Network <span>· {log.length} requisições</span>
          </p>
          <table className="tabela-net">
            <thead>
              <tr>
                <th>método</th>
                <th>url</th>
                <th>status</th>
                <th>tempo</th>
              </tr>
            </thead>
            <tbody>
              {log.length === 0 && (
                <tr>
                  <td className="net-vazio" colSpan={4}>
                    Nenhuma requisição ainda.
                  </td>
                </tr>
              )}
              {log.map((requisicao) => (
                <tr key={requisicao.id}>
                  <td>
                    <span className={`metodo m-${requisicao.metodo.toLowerCase()}`}>
                      {requisicao.metodo}
                    </span>
                  </td>
                  <td className="net-url" title={requisicao.url}>
                    {requisicao.url.replace(/^https?:\/\//, '')}
                  </td>
                  <td>
                    <span className={`status ${requisicao.ok ? 'status-ok' : 'status-erro'}`}>
                      {requisicao.status === 0 ? 'sem resposta' : requisicao.status}
                    </span>
                  </td>
                  <td className="net-ms">{requisicao.ms} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="lab-nota">
            O DummyJSON <strong>simula</strong> o POST: se você recarregar, a tarefa não volta. Por
            isso o estado local recebe <code>[...tarefas, nova]</code>. Erros 4xx/5xx caem no
            <code> catch</code> — no <code>fetch</code> não cairiam.
          </p>
        </div>
      </div>
    </article>
  )
}
