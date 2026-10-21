import type { Destino, Regiao } from '../types'

/** Metadados locais: preço, região, foto e o título usado na Wikipédia. */
export type DestinoBase = Omit<Destino, 'resumo'> & { resumoReserva: string }

export const DESTINOS_BASE: DestinoBase[] = [
  {
    id: 'rio-de-janeiro',
    nome: 'Rio de Janeiro',
    pais: 'Brasil',
    regiao: 'sul',
    preco: 800,
    dias: 5,
    nota: 4.9,
    imagem: '/img/destinos/rio-de-janeiro.jpg',
    wiki: 'Rio de Janeiro',
    destaque: true,
    resumoReserva:
      'Capital fluminense entre o mar e a montanha: Pão de Açúcar, Cristo Redentor e as praias de Ipanema e Copacabana.',
  },
  {
    id: 'salvador',
    nome: 'Salvador',
    pais: 'Brasil',
    regiao: 'sul',
    preco: 600,
    dias: 4,
    nota: 4.8,
    imagem: '/img/destinos/salvador.jpg',
    wiki: 'Salvador',
    destaque: true,
    resumoReserva:
      'Primeira capital do Brasil, no Recôncavo Baiano: Pelourinho, Elevador Lacerda e axé o ano inteiro.',
  },
  {
    id: 'buenos-aires',
    nome: 'Buenos Aires',
    pais: 'Argentina',
    regiao: 'sul',
    preco: 1200,
    dias: 6,
    nota: 4.7,
    imagem: '/img/destinos/buenos-aires.jpg',
    wiki: 'Buenos Aires',
    resumoReserva:
      'A Paris da América do Sul: tango em San Telmo, cafés de corredor e a arquitetura art déco do centro.',
  },
  {
    id: 'lima',
    nome: 'Lima',
    pais: 'Peru',
    regiao: 'sul',
    preco: 1400,
    dias: 5,
    nota: 4.6,
    imagem: '/img/destinos/lima.jpg',
    wiki: 'Lima',
    resumoReserva:
      'Capital do Peru entre o Pacífico e os Andes: gastronomia premiada, Miraflores e o centro histórico colonial.',
  },
  {
    id: 'nova-york',
    nome: 'Nova York',
    pais: 'Estados Unidos',
    regiao: 'norte',
    preco: 3400,
    dias: 7,
    nota: 4.8,
    imagem: '/img/destinos/nova-york.jpg',
    wiki: 'Nova Iorque',
    resumoReserva:
      'Manhattan, Central Park, Times Square e museus que ocupam quarteirões inteiros. A cidade que nunca dorme.',
  },
  {
    id: 'toronto',
    nome: 'Toronto',
    pais: 'Canadá',
    regiao: 'norte',
    preco: 3100,
    dias: 6,
    nota: 4.6,
    imagem: '/img/destinos/toronto.jpg',
    wiki: 'Toronto',
    resumoReserva:
      'Maior cidade do Canadá: CN Tower, ilhas na baía e bairros multiculturais como o Kensington Market.',
  },
  {
    id: 'cidade-do-mexico',
    nome: 'Cidade do México',
    pais: 'México',
    regiao: 'norte',
    preco: 1900,
    dias: 5,
    nota: 4.7,
    imagem: '/img/destinos/cidade-do-mexico.jpg',
    wiki: 'Cidade do México',
    resumoReserva:
      'Capital asteca e colonial: Zócalo, Museu de Antropologia e a melhor comida de rua do continente.',
  },
  {
    id: 'cancun',
    nome: 'Cancún',
    pais: 'México',
    regiao: 'norte',
    preco: 2600,
    dias: 5,
    nota: 4.5,
    imagem: '/img/destinos/cancun.jpg',
    wiki: 'Cancún',
    resumoReserva:
      'Caribe mexicano: areia branca, mar turquesa e as ruínas maias de Chichén Itzá a poucas horas de estrada.',
  },
  {
    id: 'lisboa',
    nome: 'Lisboa',
    pais: 'Portugal',
    regiao: 'europa',
    preco: 2400,
    dias: 7,
    nota: 4.9,
    imagem: '/img/destinos/lisboa.jpg',
    wiki: 'Lisboa',
    destaque: true,
    resumoReserva:
      'A capital mais ocidental da Europa: bondes, miradouros, fado em Alfama e pastéis de nata saindo do forno.',
  },
  {
    id: 'madri',
    nome: 'Madri',
    pais: 'Espanha',
    regiao: 'europa',
    preco: 2500,
    dias: 6,
    nota: 4.7,
    imagem: '/img/destinos/madri.jpg',
    wiki: 'Madrid',
    resumoReserva:
      'Coração da Espanha: Museu do Prado, Plaza Mayor, tapas até tarde e o melhor futebol do mundo.',
  },
  {
    id: 'roma',
    nome: 'Roma',
    pais: 'Itália',
    regiao: 'europa',
    preco: 2900,
    dias: 6,
    nota: 4.8,
    imagem: '/img/destinos/roma.jpg',
    wiki: 'Roma',
    resumoReserva:
      'A cidade eterna: Coliseu, Fontana di Trevi, Vaticano e uma trattoria em cada esquina.',
  },
  {
    id: 'paris',
    nome: 'Paris',
    pais: 'França',
    regiao: 'europa',
    preco: 3300,
    dias: 6,
    nota: 4.9,
    imagem: '/img/destinos/paris.jpg',
    wiki: 'Paris',
    resumoReserva:
      'A cidade-luz: Torre Eiffel, Louvre, Montmartre e croissants de manhã cedo na esquina.',
  },
  {
    id: 'toquio',
    nome: 'Tóquio',
    pais: 'Japão',
    regiao: 'asia',
    preco: 3200,
    dias: 9,
    nota: 4.9,
    imagem: '/img/destinos/toquio.jpg',
    wiki: 'Tóquio',
    destaque: true,
    resumoReserva:
      'Metrópole de 37 milhões: cruzamento de Shibuya, templo Senso-ji, ramen de balcão e trens que não atrasam.',
  },
  {
    id: 'seul',
    nome: 'Seul',
    pais: 'Coreia do Sul',
    regiao: 'asia',
    preco: 3000,
    dias: 8,
    nota: 4.7,
    imagem: '/img/destinos/seul.jpg',
    wiki: 'Seul',
    resumoReserva:
      'Palácios da dinastia Joseon, bairros futuristas de Gangnam e churrasco coreano até tarde da noite.',
  },
  {
    id: 'osaka',
    nome: 'Osaka',
    pais: 'Japão',
    regiao: 'asia',
    preco: 2900,
    dias: 7,
    nota: 4.6,
    imagem: '/img/destinos/osaka.jpg',
    wiki: 'Osaka',
    resumoReserva:
      'A cozinha do Japão: takoyaki, okonomiyaki e o castelo iluminado no meio da cidade.',
  },
  {
    id: 'singapura',
    nome: 'Singapura',
    pais: 'Singapura',
    regiao: 'asia',
    preco: 3500,
    dias: 6,
    nota: 4.8,
    imagem: '/img/destinos/singapura.jpg',
    wiki: 'Singapura',
    resumoReserva:
      'Cidade-Estado tropical: Marina Bay, jardins suspensos, hawker centres e um dos melhores aeroportos do mundo.',
  },
]

export type InfoRegiao = {
  id: Regiao
  nome: string
  descricao: string
  imagem: string
}

export const REGIOES: InfoRegiao[] = [
  {
    id: 'sul',
    nome: 'América do Sul',
    descricao: 'Perto de casa, preço de bolso',
    imagem: '/img/destinos/rio-de-janeiro.jpg',
  },
  {
    id: 'norte',
    nome: 'América do Norte',
    descricao: 'Metrópoles e Caribe',
    imagem: '/img/destinos/nova-york.jpg',
  },
  {
    id: 'europa',
    nome: 'Europa',
    descricao: 'História em cada esquina',
    imagem: '/img/destinos/lisboa.jpg',
  },
  {
    id: 'asia',
    nome: 'Ásia',
    descricao: 'Do outro lado do mundo',
    imagem: '/img/destinos/toquio.jpg',
  },
]

export const ROTULO_REGIAO: Record<Regiao, string> = {
  sul: 'América do Sul',
  norte: 'América do Norte',
  europa: 'Europa',
  asia: 'Ásia',
}

export const COR_REGIAO: Record<Regiao, string> = {
  sul: '#dd6b4d',
  norte: '#b98a2f',
  europa: '#3f6ea8',
  asia: '#0f7a5a',
}
