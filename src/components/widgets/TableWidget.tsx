import { useMemo } from 'react'

export function TableWidget({ rows = 6 }: { rows?: number }) {
  // Generate stable data that doesn't change on every render
  const tableData = useMemo(() => {
    return Array.from({ length: rows }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      value: Math.round(Math.random() * 100)
    }))
  }, [rows])

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
        <thead>
          <tr>
            {['ID', 'Name', 'Value'].map((h) => (
              <th key={h} style={{ position: 'sticky', top: 0, background: 'var(--panel-2)', color: 'var(--muted)', textAlign: 'left', fontWeight: 700, fontSize: 12, letterSpacing: '.06em', textTransform: 'uppercase', padding: '10px 10px', borderBottom: '1px solid var(--border)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td style={{ padding: '10px', borderBottom: '1px solid var(--border)' }}>{row.id}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid var(--border)' }}>{row.name}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid var(--border)' }}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


