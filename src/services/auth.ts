import { api } from './http'
import type { Usuario } from '../types'

export type LoginResposta = Usuario & {
  accessToken: string
  refreshToken: string
}

/** Aula 9 · Bloco 4 — POST /auth/login. Quem trata o erro é a tela de Login. */
export async function login(username: string, password: string): Promise<LoginResposta> {
  const { data } = await api.post<LoginResposta>('/auth/login', {
    username,
    password,
    expiresInMins: 30,
  })
  return data
}

/** Aula 9 · Bloco 4 — GET /auth/me: "quem é o dono deste token?". */
export async function me(token: string): Promise<Usuario> {
  const { data } = await api.get<Usuario>('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}
