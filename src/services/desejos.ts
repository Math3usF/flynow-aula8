import { api } from './http'
import type { Desejo } from '../types'

type ListaDesejos = {
  todos: Desejo[]
  total: number
  skip: number
  limit: number
}

/** R — lista os desejos de quem está logado(a). */
export async function listarDesejos(userId: number): Promise<Desejo[]> {
  const { data } = await api.get<ListaDesejos>(`/todos/user/${userId}`)
  return data.todos
}

/** C — cria um desejo (a API de treino responde 201, mas não grava). */
export async function criarDesejo(todo: string, userId: number): Promise<Desejo> {
  const { data } = await api.post<Desejo>('/todos/add', {
    todo,
    completed: false,
    userId,
  })
  return data
}

/** U — atualiza só os campos que mudaram. */
export async function atualizarDesejo(
  id: number,
  campos: Partial<Pick<Desejo, 'todo' | 'completed'>>,
): Promise<Desejo> {
  const { data } = await api.patch<Desejo>(`/todos/${id}`, campos)
  return data
}

/** D — exclui um desejo. */
export async function excluirDesejo(id: number): Promise<void> {
  await api.delete(`/todos/${id}`)
}
