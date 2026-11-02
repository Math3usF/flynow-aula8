import type { Usuario } from '../types'

/**
 * Conta local de demonstração — NÃO existe na API.
 *
 * O DummyJSON é uma API pública de treino: não tem cadastro de usuário e não
 * aceita criar conta. Para ter um login fácil de lembrar na apresentação, esta
 * conta é conferida aqui no front, sem chamar a rede.
 *
 * Consequências (deixadas explícitas de propósito):
 * - a senha está visível no JavaScript — serve para demonstração, nunca para produção;
 * - o "token" é só uma etiqueta (`demo-local`), não é um JWT assinado;
 * - usamos `id: 2` porque o CRUD continua sendo o /todos do DummyJSON, e o id 2
 *   existe lá (senão o GET devolveria 404).
 *
 * O login de verdade da Aula 9 continua sendo `emilys` / `emilyspass`.
 */
export const TOKEN_DEMO = 'demo-local'

export const CONTA_DEMO = {
  username: 'admin',
  password: 'admin@123',
} as const

export const USUARIO_DEMO: Usuario = {
  id: 2,
  username: CONTA_DEMO.username,
  email: 'admin@flynow.dev',
  firstName: 'Admin',
  lastName: 'FlyNow',
  // A conta local não tem foto: o avatar simplesmente não aparece no header.
  image: '',
}
