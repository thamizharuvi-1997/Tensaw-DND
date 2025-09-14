type Props = { label?: string }

export function ButtonWidget({ label = 'Button' }: Props) {
  return (
    <button style={{ width: '100%', height: '100%', borderRadius: 10, background: 'linear-gradient(180deg, var(--brand), var(--brand-600))', borderColor: 'transparent' }}>
      {label}
    </button>
  )
}


