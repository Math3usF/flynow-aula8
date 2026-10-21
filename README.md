# FlyNow — Minha Lista de Viagem

Site de viagens construído como projeto da **Aula 8 — DOM · HOF · Axios · useEffect**
(Laboratório de Programação Front End · 2026.2).

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

## O que tem no projeto

### Estrutura

```
src/
├─ App.tsx                 # estado único, useEffect da busca, filtros e derivados
├─ main.tsx
├─ types.ts
├─ styles.css              # design system completo (areia + marinho + coral)
├─ data/destinos.ts        # 16 destinos: preço, região, foto, título na Wikipédia
├─ services/
│  ├─ http.ts              # as duas instâncias do Axios (wiki e api) + interceptors
│  ├─ destinos.ts          # GET /page/summary/:titulo com Promise.allSettled
│  ├─ tarefas.ts           # POST /todos/add e um GET que dá 404 de propósito
│  └─ registro.ts          # "mini Network": histórico das requisições
├─ components/
│  ├─ Cabecalho, Hero, Regioes, Filtros, ListaDestinos, CardDestino
│  ├─ MinhaViagem, LabDom, LabAxios, Rodape, Icones
└─ utils/formato.ts        # brl() com Intl
public/img/destinos/       # 16 fotos (Wikimedia Commons, otimizadas em 1000px)
```

### Bloco 1 — DOM

- O **título da aba** (`document.title`) é atualizado por um `useEffect` que observa quantos
  destinos estão visíveis: `"16 destinos · FlyNow"` → `"1 destino · FlyNow"`.
- O painel **“Bloco 1 · DOM ao vivo”** tem um alvo real (`#alvo-dom`) e botões que usam
  `querySelector`, `textContent` e `classList` — exatamente os comandos do material.
  O botão “Devolver ao React” muda o **estado**, e aí o React reescreve o texto por cima:
  é a demonstração de que a fonte da verdade é o estado, não o DOM.

### Bloco 2 — HOF

- `filter` nos filtros (região, preço, busca).
- `map` para renderizar cards e para alterar a quantidade de viajantes.
- `reduce` para o total da lista visível, o total da viagem, o número de viajantes e o
  menor preço por região.
- `sort` sempre em uma **cópia** do array (`[...filtrados].sort(...)`), nunca no array do estado.
- Estado imutável: `[...viagem, novo]`, `.map(...)`, `.filter(...)`, `.reduce(...)` — sem `push`.
- `key={destino.id}` em todos os `map`.

### Bloco 3 — Axios

- `src/services/http.ts` cria duas instâncias a partir do `.env`:
  `wiki` (`VITE_WIKI_URL`) e `api` (`VITE_API_URL`). O prefixo `VITE_` é obrigatório.
- Interceptors de request/response medem o tempo e alimentam o **mini Network**.
- `GET` na Wikipédia REST: `/page/summary/:titulo` (16 chamadas em paralelo).
- `POST` no DummyJSON: `/todos/add`.
- Erro 404 de propósito (`/404/nao-achei`) para mostrar `err.response?.status` — no Axios
  4xx/5xx caem no `catch`; no `fetch` não cairiam.

> O `.env` aponta para `pt.wikipedia.org` (em vez de `en.wikipedia.org` do PDF) para os
> resumos saírem em português. Trocar a URL é só editar o `.env`.

### Bloco 4 — useEffect

- `useEffect(..., [])` busca os destinos ao montar, com os três estados:
  `carregando`, `erro` e `destinos`.
- `try / catch / finally` e um **cleanup** (`let ativo = true` + `return () => { ativo = false }`)
  para não atualizar estado depois que o componente saiu.
- Estados de tela: **esqueleto** durante o carregamento, **erro** com botão “Tentar de novo”
  (incrementa um contador que está nas dependências do efeito) e **vazio** quando o filtro
  não retorna nada.
- Os resumos usam `Promise.allSettled`: se a Wikipédia falhar em um destino, a página inteira
  não cai — aquele card usa o resumo local de reserva.

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
- POST de treino: [DummyJSON](https://dummyjson.com)
- Fotos: [Wikimedia Commons](https://commons.wikimedia.org) — cards em 1000px, hero em 2000px
  (licenças CC BY e CC BY-SA; créditos nas páginas de origem).
