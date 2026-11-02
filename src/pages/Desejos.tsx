import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import DesejoItem from '../components/DesejoItem'
import { IconeMala, IconeMais } from '../components/Icones'
import { useAuth } from '../contexts/AuthContext'
import { atualizarDesejo, criarDesejo, excluirDesejo, listarDesejos } from '../services/desejos'
import type { Desejo } from '../types'
import { mensagemDeErro } from '../utils/erros'

function validar(valor: string): string | null {
  if (valor.length < 3) return 'Escreve pelo menos 3 letras.'
  if (valor.length > 80) return 'Máximo de 80 letras.'
  return null
}

/**
 * Aula 10 — "Meus desejos": CRUD completo sobre /todos.
 * Quatro estados na tela: carregando → erro → vazio → lista.
 */
export default function Desejos() {
  const { usuario } = useAuth()
  const userId = usuario?.id

  const [desejos, setDesejos] = useState<Desejo[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [recarregar, setRecarregar] = useState(0)

  const [texto, setTexto] = useState('')
  const [erroForm, setErroForm] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  const [ocupado, setOcupado] = useState<number | null>(null)
  const [aviso, setAviso] = useState<string | null>(null)

  // A API de treino não grava: os ids criados aqui só existem no app.
  // Para eles, pulamos PATCH/DELETE (que responderiam 404) e mexemos só no estado.
  const idsLocais = useRef(new Set<number>())

  // Bloco 1 da aula 8: o título da aba também é DOM.
  useEffect(() => {
    document.title = 'Meus desejos · FlyNow'
  }, [])

  useEffect(() => {
    if (userId === undefined) return

    let ativo = true
    setCarregando(true)
    setErro(null)

    listarDesejos(userId)
      .then((lista) => {
        if (ativo) setDesejos(lista)
      })
      .catch((err) => {
        if (ativo) setErro(mensagemDeErro(err))
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })

    return () => {
      ativo = false
    }
  }, [userId, recarregar])

  async function aoEnviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const limpo = texto.trim()
    const avisoValidacao = validar(limpo)
    if (avisoValidacao) {
      setErroForm(avisoValidacao)
      return
    }

    if (userId === undefined) return

    setErroForm(null)
    setAviso(null)
    setEnviando(true)

    try {
      const novo = await criarDesejo(limpo, userId)
      idsLocais.current.add(novo.id)
      setDesejos((lista) => [...lista, novo])
      setTexto('')
    } catch (err) {
      setErroForm(mensagemDeErro(err))
    } finally {
      setEnviando(false)
    }
  }

  async function alternar(d: Desejo) {
    setAviso(null)
    setOcupado(d.id)

    try {
      if (!idsLocais.current.has(d.id)) {
        await atualizarDesejo(d.id, { completed: !d.completed })
      }
      setDesejos((lista) =>
        lista.map((x) => (x.id === d.id ? { ...x, completed: !x.completed } : x)),
      )
    } catch (err) {
      setAviso(mensagemDeErro(err))
    } finally {
      setOcupado(null)
    }
  }

  async function excluir(d: Desejo) {
    if (!window.confirm(`Excluir “${d.todo}”?`)) return

    setAviso(null)
    setOcupado(d.id)

    try {
      if (!idsLocais.current.has(d.id)) {
        await excluirDesejo(d.id)
      }
      setDesejos((lista) => lista.filter((x) => x.id !== d.id))
    } catch (err) {
      setAviso(mensagemDeErro(err))
    } finally {
      setOcupado(null)
    }
  }

  const feitos = desejos.filter((d) => d.completed).length

  return (
    <section className="secao tela-desejos">
      <div className="secao-cabecalho">
        <p className="eyebrow">
          <IconeMala /> meus desejos
        </p>
        <h1 className="secao-titulo">Lugares que você quer conhecer</h1>
        <p className="secao-sub">
          Cada ação aqui é uma letra do CRUD: <code>GET</code> ao abrir, <code>POST</code> ao
          adicionar, <code>PATCH</code> ao marcar e <code>DELETE</code> ao excluir. A API de treino
          não grava — quem guarda a lista é o estado local.
        </p>
      </div>

      <form className="form-desejo" onSubmit={aoEnviar} noValidate>
        <label className="sr-only" htmlFor="desejo">
          Novo desejo
        </label>
        <input
          id="desejo"
          value={texto}
          placeholder="Ex.: Conhecer Lisboa"
          onChange={(e) => setTexto(e.target.value)}
          disabled={enviando}
          aria-invalid={erroForm !== null}
          aria-describedby={erroForm ? 'erro-desejo' : undefined}
        />
        <button type="submit" className="btn btn-primario" disabled={enviando}>
          <IconeMais />
          {enviando ? 'Salvando…' : 'Adicionar'}
        </button>
      </form>

      {erroForm && (
        <p className="aviso aviso-erro" role="alert" id="erro-desejo">
          {erroForm}
        </p>
      )}

      {aviso && (
        <p className="aviso aviso-erro" role="alert">
          {aviso}
        </p>
      )}

      {carregando && (
        <p className="desejos-status" role="status">
          Carregando seus desejos…
        </p>
      )}

      {!carregando && erro && (
        <div className="vazio-caixa" role="alert">
          <p className="vazio-titulo">Não deu para carregar seus desejos.</p>
          <p className="vazio-texto">{erro}</p>
          <button
            type="button"
            className="btn btn-primario"
            onClick={() => setRecarregar((valor) => valor + 1)}
          >
            Tentar de novo
          </button>
        </div>
      )}

      {!carregando && !erro && desejos.length === 0 && (
        <div className="vazio-caixa">
          <span className="vazio-emoji" aria-hidden="true">
            📭
          </span>
          <p className="vazio-titulo">Nenhum desejo ainda.</p>
          <p className="vazio-texto">Que tal começar com “Conhecer Lisboa”?</p>
        </div>
      )}

      {!carregando && !erro && desejos.length > 0 && (
        <>
          <div className="desejos-resumo">
            <span>
              <strong>{desejos.length}</strong> desejos
            </span>
            <span>
              <strong>{feitos}</strong> já realizados
            </span>
          </div>

          <ul className="desejos">
            {desejos.map((d) => (
              <DesejoItem
                key={d.id}
                desejo={d}
                ocupado={ocupado === d.id}
                aoAlternar={alternar}
                aoExcluir={excluir}
              />
            ))}
          </ul>
        </>
      )}
    </section>
  )
}
