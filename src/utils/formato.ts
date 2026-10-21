export const brl = (valor: number) =>
  valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  })

export const numero = (valor: number) => valor.toLocaleString('pt-BR')
