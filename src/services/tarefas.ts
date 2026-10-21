import { api } from './http'

export type Tarefa = {
  id: number
  todo: string
  completed: boolean
  userId: number
}

/** POST — cria uma tarefa no DummyJSON (que só simula: não grava de verdade). */
export async function criarTarefa(todo: string): Promise<Tarefa> {
  const { data } = await api.post<Tarefa>('/todos/add', {
    todo,
    completed: false,
    userId: 1,
  })
  return data
}

/** GET que falha de propósito, para treinar a leitura do erro (404). */
export async function buscarRotaInexistente() {
  await api.get('/404/nao-achei')
}
