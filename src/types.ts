export type Regiao = 'sul' | 'norte' | 'europa' | 'asia'

export type Destino = {
  /** id único — é a key do map (nunca o índice!) */
  id: string
  nome: string
  pais: string
  regiao: Regiao
  /** preço por pessoa, em reais */
  preco: number
  dias: number
  nota: number
  imagem: string
  /** vem da API da Wikipédia (com fallback local) */
  resumo: string
  /** título exato da página na Wikipédia */
  wiki: string
  /** os 4 destinos do enunciado do FlyNow */
  destaque?: boolean
}

/** Item da lista de viagem: o destino + quantas pessoas */
export type ItemViagem = {
  destino: Destino
  viajantes: number
}

export type FiltroRegiao = 'todas' | Regiao

export type Ordem = 'preco-asc' | 'preco-desc' | 'nota' | 'nome'

/** Usuário devolvido por /auth/login e /auth/me (DummyJSON) */
export type Usuario = {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image: string
}

/** Item de "Meus desejos": o recurso /todos da API de treino */
export type Desejo = {
  id: number
  todo: string
  completed: boolean
  userId: number
}

export type Requisicao = {
  id: number
  metodo: string
  url: string
  status: number
  ms: number
  ok: boolean
}
