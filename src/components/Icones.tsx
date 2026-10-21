type Props = { className?: string }

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
}

export function IconeAviao({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden focusable="false">
      <path d="M21.6 2.4 2.9 9.6c-.9.35-.86 1.65.06 1.94l6.06 1.9 1.9 6.05c.29.92 1.59.96 1.94.06l7.2-18.7c.32-.84-.5-1.66-1.36-1.45ZM9.9 12.6l8.2-8.2-5.4 10.9-2.8-2.7Z" />
    </svg>
  )
}

export function IconeMala({ className }: Props) {
  return (
    <svg className={className} {...base}>
      <rect x="3" y="7.5" width="18" height="13" rx="2.5" />
      <path d="M9 7.5V5.6A1.6 1.6 0 0 1 10.6 4h2.8A1.6 1.6 0 0 1 15 5.6v1.9M3 13h18" />
    </svg>
  )
}

export function IconePino({ className }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  )
}

export function IconeBusca({ className }: Props) {
  return (
    <svg className={className} {...base}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  )
}

export function IconeEstrela({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden focusable="false">
      <path d="m12 2.6 2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.45 6.2 20.5l1.1-6.45-4.7-4.6 6.5-.95L12 2.6Z" />
    </svg>
  )
}

export function IconeMais({ className }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function IconeMenos({ className }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="M5 12h14" />
    </svg>
  )
}

export function IconeCheck({ className }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="m4.5 12.5 5 5L19.5 7" />
    </svg>
  )
}

export function IconeLixeira({ className }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="M4 7h16M9.5 7V5.5A1.5 1.5 0 0 1 11 4h2a1.5 1.5 0 0 1 1.5 1.5V7M6.5 7l.8 12.1A2 2 0 0 0 9.3 21h5.4a2 2 0 0 0 2-1.9L17.5 7M10 11v6M14 11v6" />
    </svg>
  )
}

export function IconeGlobo({ className }: Props) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
    </svg>
  )
}

export function IconeTerminal({ className }: Props) {
  return (
    <svg className={className} {...base}>
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="m7 9.5 3 2.5-3 2.5M13 15h4" />
    </svg>
  )
}
