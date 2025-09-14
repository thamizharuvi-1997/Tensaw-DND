import { useRef } from 'react'
import { useDrop } from 'react-dnd'
import { Rnd } from 'react-rnd'
import { useWidgetStore } from '../store/widgets'
import type { Widget, WidgetType } from '../types'
import { ButtonWidget } from './widgets/ButtonWidget'
import { InputWidget } from './widgets/InputWidget'
import { TableWidget } from './widgets/TableWidget'
import './canvas.css'

function renderWidget(widget: Widget) {
  switch (widget.type) {
    case 'button':
      return <ButtonWidget label={(widget.data as { label?: string })?.label ?? 'Click me'} />
    case 'input':
      return <InputWidget placeholder={(widget.data as { placeholder?: string })?.placeholder ?? 'Enter text'} />
    case 'table':
      return <TableWidget rows={(widget.data as { rows?: number })?.rows ?? 6} />
    default:
      return null
  }
}

export function Canvas() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const widgets = useWidgetStore((s) => s.widgets)
  const selectedId = useWidgetStore((s) => s.selectedId)
  const selectWidget = useWidgetStore((s) => s.selectWidget)
  const addWidget = useWidgetStore((s) => s.addWidget)
  const updateWidget = useWidgetStore((s) => s.updateWidget)
  const deleteWidget = useWidgetStore((s) => s.deleteWidget)

  const [, dropRef] = useDrop(
    () => ({
      accept: 'WIDGET_PALETTE',
      drop: (_item: { widgetType: WidgetType }, monitor) => {
        const client = monitor.getSourceClientOffset()
        const container = containerRef.current
        if (!client || !container) return
        const rect = container.getBoundingClientRect()
        const x = client.x - rect.left
        const y = client.y - rect.top
        addWidget(_item.widgetType, Math.max(0, x), Math.max(0, y))
      },
    }),
    [addWidget],
  )

  dropRef(containerRef)

  return (
    <main className="canvas" ref={containerRef}>
      {widgets.map((w) => (
        <Rnd
          key={w.id}
          default={{ x: w.x, y: w.y, width: w.width, height: w.height }}
          position={{ x: w.x, y: w.y }}
          size={{ width: w.width, height: w.height }}
          bounds="parent"
          minWidth={120}
          minHeight={60}
          dragHandleClassName="widget-chrome"
          cancel=".widget-body, .widget-body *"
          onDragStop={(_e, data) => updateWidget(w.id, { x: data.x, y: data.y })}
          onResizeStop={(_e, _dir, ref, _delta, pos) =>
            updateWidget(w.id, { width: ref.offsetWidth, height: ref.offsetHeight, x: pos.x, y: pos.y })
          }
          className="widget-wrapper"
        >
          <div className="widget-chrome" onMouseDown={() => selectWidget(w.id)}>
            <div className="drag-handle">⋮⋮</div>
            <button className="delete-btn" onClick={() => deleteWidget(w.id)} aria-label="Delete widget">×</button>
          </div>
          <div className="widget-body" onMouseDown={(e) => { e.stopPropagation(); selectWidget(w.id) }} style={selectedId === w.id ? { outline: '2px solid var(--brand)' } : undefined}>{renderWidget(w)}</div>
        </Rnd>
      ))}
    </main>
  )
}


