# FlyNow — Minha Lista de Viagem

Site de viagens construído ao longo das **Aulas 8, 9 e 10** de Laboratório de Programação
Front End (Engenharia de Software · 2026.2):

| Aula | Assunto | O que o projeto ganhou |
| --- | --- | --- |
| 8 | DOM · HOF · Axios · useEffect | lista de destinos, filtros, minha viagem, laboratórios |
| 9 | Closures · React Router · Context · login com token | rotas `/login`, `/` e `/desejos`, rota protegida, sessão que sobrevive ao F5 |
| 10 | CRUD · erros · layout responsivo | tela “Meus desejos”, `mensagemDeErro`, interceptors e mobile-first |

16 destinos, 4 regiões, fotos reais, filtro por região, filtro **Só até R$ 650**, lista de
viagem com total calculado e dois laboratórios ao vivo (DOM e Axios).

---

## Como rodar

```bash
npm install
npm run dev
```

Abre em **http://localhost:5173** (ou o endereço que o Vite mostrar no terminal).

Para gerar a versão de produção — o `build` roda o TypeScript antes, então erro de tipo quebra o build:

```bash
npm run build   # tsc --noEmit && vite build
npm run preview # serve o dist/
```

---

## Conta de acesso (usuário e senha)

Existem **duas** formas de entrar. A primeira é o login de verdade da Aula 9; a segunda é uma
conta local de demonstração, criada para a apresentação.

### 1. Login real — validado na API (recomendado)

Quem confere a senha é o **DummyJSON**, que devolve um **JWT** de 30 minutos
(`POST /auth/login`). Não existe cadastro: o usuário já vem pronto.

| Campo | Valor |
| --- | --- |
| **Usuário** | `emilys` |
| **Senha** | `emilyspass` |
| Nome exibido no header | Emily |
| `id` usado nos desejos | `1` |

### 2. Conta local de demonstração

Serve para quem quer uma senha fácil de lembrar na hora de apresentar. Ela **não passa pela API**:
é conferida no front (`src/services/contaDemo.ts`), então não é segurança de verdade.

| Campo | Valor |
| --- | --- |
| **Usuário** | `admin` |
| **Senha** | `admin@123` |
| Nome exibido no header | Admin |
| `id` usado nos desejos | `2` |

> Por que existe: o DummyJSON **não permite criar usuários**. Se a professora perguntar “onde essa
> senha é validada?”, a resposta honesta é: **a `emilys` é validada na API e volta com token
> assinado; a `admin` é só uma simulação local** — inclusive a senha fica visível no JavaScript.
> Em um sistema real isso viraria um backend com bcrypt + JWT.

As duas dicas aparecem embaixo do formulário em `/login`. Senha errada → a API responde 400/401 e
a tela mostra “Usuário ou senha incorretos.”.

---

## Rotas

| Rota | Página | Acesso |
| --- | --- | --- |
| `/login` | `pages/Login.tsx` | pública |
| `/` | `pages/Destinos.tsx` | protegida |
| `/desejos` | `pages/Desejos.tsx` | protegida |
| `*` | `pages/NaoEncontrada.tsx` | qualquer visitante |

`ProtectedRoute` é a portaria: enquanto o `AuthContext` restaura a sessão mostra
“Verificando sessão…”, sem usuário redireciona para `/login` com `replace`.

---

## O que tem no projeto

### Estrutura

```
src/
├─ App.tsx                  # só a tabela de rotas (Routes / Route)
├─ main.tsx                 # BrowserRouter > AuthProvider > App
├─ types.ts                 # Destino, ItemViagem, Usuario, Desejo...
├─ styles.css               # design system (areia + marinho + coral)
├─ contexts/AuthContext.tsx # usuario, token, carregando, login, logout, useAuth
├─ routes/ProtectedRoute.tsx
├─ pages/
│  ├─ Destinos.tsx          # a página da aula 8, movida para cá
│  ├─ Desejos.tsx           # CRUD de /todos
│  ├─ Login.tsx
│  └─ NaoEncontrada.tsx
├─ data/destinos.ts         # 16 destinos: preço, região, foto, título na Wikipédia
├─ services/
│  ├─ http.ts               # instâncias wiki/api, interceptors (token + 401)
│  ├─ auth.ts               # POST /auth/login e GET /auth/me
│  ├─ contaDemo.ts          # conta local admin/admin@123 (não passa pela API)
│  ├─ desejos.ts            # listar, criar, atualizar, excluir em /todos
│  ├─ destinos.ts           # GET /page/summary/:titulo com Promise.allSettled
│  ├─ tarefas.ts            # POST /todos/add e um GET que dá 404 de propósito
│  └─ registro.ts           # "mini Network": histórico das requisições
├─ components/
│  ├─ Layout, Header, DesejoItem
│  ├─ Hero, Regioes, Filtros, ListaDestinos, CardDestino
│  └─ MinhaViagem, LabDom, LabAxios, Rodape, Icones
└─ utils/
   ├─ formato.ts            # brl() com Intl
   └─ erros.ts              # mensagemDeErro(err) por status
public/img/destinos/        # 16 fotos (Wikimedia Commons, otimizadas em 1000px)
```

### Aula 8 — Bloco 1: DOM

- O **título da aba** (`document.title`) é atualizado por um `useEffect` que observa quantos
  destinos estão visíveis: `"16 destinos · FlyNow"` → `"1 destino · FlyNow"`.
- O painel **“Bloco 1 · DOM ao vivo”** tem um alvo real (`#alvo-dom`) e botões que usam
  `querySelector`, `textContent` e `classList`. O botão “Devolver ao React” muda o **estado**,
  e aí o React reescreve o texto por cima: a fonte da verdade é o estado, não o DOM.

### Aula 8 — Bloco 2: HOF

- `filter` nos filtros (região, preço, busca).
- `map` para renderizar cards e para alterar a quantidade de viajantes.
- `reduce` para o total da lista visível, o total da viagem, o número de viajantes e o
  menor preço por região.
- `sort` sempre em uma **cópia** do array (`[...filtrados].sort(...)`), nunca no array do estado.
- Estado imutável: `[...viagem, novo]`, `.map(...)`, `.filter(...)`, `.reduce(...)` — sem `push`.
- `key={destino.id}` em todos os `map`.

**Desafio da aula (escolhe um) — os dois estão feitos:**

- **A. Ordenar por preço sem mutar o estado** → select de ordenação em `Filtros.tsx`
  (menor preço, maior preço, melhor avaliados, nome) usando `[...filtrados].sort(...)`.
- **B. Busca por nome com `includes` em minúsculas** → campo de busca do `Hero` +
  `filter` com `termo = busca.trim().toLowerCase()`.

### Aula 8 — Bloco 3: Axios

- `src/services/http.ts` cria duas instâncias a partir do `.env`:
  `wiki` (`VITE_WIKI_URL`) e `api` (`VITE_API_URL`). O prefixo `VITE_` é obrigatório.
- Interceptors de request/response medem o tempo e alimentam o **mini Network**.
- `GET` na Wikipédia REST: `/page/summary/:titulo` (16 chamadas em paralelo).
- `POST` no DummyJSON: `/todos/add`.
- Erro 404 de propósito (`/404/nao-achei`) para mostrar `err.response?.status` — no Axios
  4xx/5xx caem no `catch`; no `fetch` não cairiam.

> O `.env` aponta para `pt.wikipedia.org` (em vez de `en.wikipedia.org` do PDF) para os
> resumos saírem em português. Trocar a URL é só editar o `.env`.

### Aula 8 — Bloco 4: useEffect

- `useEffect(..., [])` busca os destinos ao montar, com os três estados:
  `carregando`, `erro` e `destinos`.
- `try / catch / finally` e um **cleanup** (`let ativo = true` + `return () => { ativo = false }`)
  para não atualizar estado depois que o componente saiu.
- Estados de tela: **esqueleto** durante o carregamento, **erro** com botão “Tentar de novo”
  (incrementa um contador que está nas dependências do efeito) e **vazio** quando o filtro
  não retorna nada.
- Os resumos usam `Promise.allSettled`: se a Wikipédia falhar em um destino, a página inteira
  não cai — aquele card usa o resumo local de reserva.

### Aula 9 — Router, Context e login

- **Router:** `main.tsx` envolve o app em `BrowserRouter`; `App.tsx` só tem `Routes`/`Route`.
  `Layout` = `Header` + `<Outlet />`; `Header` usa `NavLink` (`end` na raiz) para marcar a
  página atual. O 404 é `path="*"`.
- **Context:** `AuthContext` expõe `usuario`, `token`, `carregando`, `login` e `logout`; o hook
  `useAuth()` falha com mensagem clara se faltar o `AuthProvider`.
- **Login com token:** `POST /auth/login` (30 min) → `localStorage['flynow.token']` → estado.
  Ao abrir o app, `GET /auth/me` com `Authorization: Bearer …` restaura a sessão; token
  inválido (401) é apagado e a pessoa cai no login.
- **Rota protegida:** `ProtectedRoute` espera o `carregando`, redireciona com
  `<Navigate to="/login" replace />` e libera o `<Outlet />` quando há usuário.

### Aula 10 — CRUD, erros e responsivo

- **CRUD em `/todos`** (`services/desejos.ts`): `GET /todos/user/{id}`, `POST /todos/add`,
  `PATCH /todos/{id}`, `DELETE /todos/{id}`.
- **Quatro estados na tela:** carregando → erro (com “Tentar de novo”) → vazio → lista.
- **Criar:** formulário controlado, validação de 3 a 80 letras, `preventDefault`, botão
  desabilitado com “Salvando…”, `[...lista, novo]` no sucesso.
- **Marcar como feito:** `PATCH` + `map` com `{ ...x, completed: … }`; **excluir:** confirmação
  (`window.confirm`) + `DELETE` + `filter`. A tela só muda depois que a API responde.
- **Item recém-criado:** a API de treino não grava, então `PATCH`/`DELETE` dariam 404. O app
  guarda os ids criados em `useRef(new Set())` e, para eles, atualiza só o estado local.
- **Erros:** `utils/erros.ts` traduz o status em frase (400, 401, 404, 5xx, sem rede, timeout)
  e a mensagem aparece com `role="alert"`.
- **Interceptors:** o de request carimba o token em toda chamada da `api`; o de response trata
  401 chamando o `logout` do Context (exceto em `/auth/login`) e sempre devolve
  `Promise.reject(err)`.
- **Responsivo:** base mobile-first (1 coluna), `@media (min-width: …)` para 2 e 3 colunas,
  campos e botões com ≥ 44 px, testado em 375 px sem rolagem lateral.

---

## Filtros

- **Região**: América do Sul, América do Norte, Europa, Ásia (chips ou cards de região).
- **Só até R$ 650**: o filtro do enunciado — deixa o Salvador (R$ 600).
- **Busca** por destino ou país, no hero.
- **Ordenação**: menor preço, maior preço, melhor avaliados, nome.

## Destinos

| Região | Destinos |
| --- | --- |
| América do Sul | Rio de Janeiro (R$ 800), Salvador (R$ 600), Buenos Aires, Lima |
| América do Norte | Nova York, Toronto, Cidade do México, Cancún |
| Europa | Lisboa (R$ 2.400), Madri, Roma, Paris |
| Ásia | Tóquio (R$ 3.200), Seul, Osaka, Singapura |

Os quatro do enunciado (Rio, Salvador, Lisboa, Tóquio) aparecem com o selo **destaque FlyNow**.

## Créditos

- Resumos: [Wikipédia em português — API REST](https://pt.wikipedia.org/api/rest_v1/)
- Login, desejos e POST de treino: [DummyJSON](https://dummyjson.com)
- Fotos: [Wikimedia Commons](https://commons.wikimedia.org) — cards em 1000px, hero em 2000px
  (licenças CC BY e CC BY-SA; créditos nas páginas de origem).
