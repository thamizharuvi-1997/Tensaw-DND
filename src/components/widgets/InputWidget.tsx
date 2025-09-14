type Props = { placeholder?: string }

export function InputWidget({ placeholder = 'Type here' }: Props) {
  return (
    <input
      placeholder={placeholder}
      style={{ width: '100%', height: '100%', background: 'var(--panel)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 10, padding: '0 10px', boxSizing: 'border-box' }}
    />
  )
}


