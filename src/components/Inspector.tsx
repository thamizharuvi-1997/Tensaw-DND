import './inspector.css'
import { useWidgetStore } from '../store/widgets'
import type { Widget } from '../types'

export function Inspector() {
  const widgets = useWidgetStore((s) => s.widgets)
  const selectedId = useWidgetStore((s) => s.selectedId)
  const updateWidgetData = useWidgetStore((s) => s.updateWidgetData)

  const selected: Widget | undefined = widgets.find((w) => w.id === selectedId)

  if (!selected) {
    return <aside className="inspector"><div className="inspector-empty">Select a widget</div></aside>
  }

  return (
    <aside className="inspector">
      <div className="inspector-title">Inspector</div>
      <div className="inspector-section">
        <div className="field">
          <label>ID</label>
          <input value={selected.id} disabled />
        </div>
        <div className="field-flex">
          <div className="field"><label>X</label><input value={selected.x} disabled /></div>
          <div className="field"><label>Y</label><input value={selected.y} disabled /></div>
          <div className="field"><label>W</label><input value={selected.width} disabled /></div>
          <div className="field"><label>H</label><input value={selected.height} disabled /></div>
        </div>
      </div>

      {selected.type === 'button' && (
        <div className="inspector-section">
          <div className="section-title">Button</div>
          <div className="field">
            <label>Label</label>
            <input
              value={(selected.data as any)?.label ?? ''}
              onChange={(e) => updateWidgetData(selected.id, { ...(selected.data as any), label: e.target.value })}
            />
          </div>
        </div>
      )}

      {selected.type === 'input' && (
        <div className="inspector-section">
          <div className="section-title">Input</div>
          <div className="field">
            <label>Placeholder</label>
            <input
              value={(selected.data as any)?.placeholder ?? ''}
              onChange={(e) => updateWidgetData(selected.id, { ...(selected.data as any), placeholder: e.target.value })}
            />
          </div>
        </div>
      )}

      {selected.type === 'table' && (
        <div className="inspector-section">
          <div className="section-title">Table</div>
          <div className="field">
            <label>Rows</label>
            <input
              type="number"
              min={1}
              max={50}
              value={(selected.data as any)?.rows ?? 6}
              onChange={(e) => updateWidgetData(selected.id, { ...(selected.data as any), rows: Number(e.target.value || 0) })}
            />
          </div>
        </div>
      )}
    </aside>
  )
}


