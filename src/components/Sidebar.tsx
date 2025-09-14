import { useDrag } from 'react-dnd'
import type { WidgetType } from '../types'
import './sidebar.css'

type PaletteItemProps = {
  type: WidgetType
  label: string
}

function PaletteItem({ type, label }: PaletteItemProps) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'WIDGET_PALETTE',
    item: { widgetType: type },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }))

  return (
    <div ref={dragRef} className="palette-item" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {label}
    </div>
  )
}

export function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Widgets</h2>
      <div className="palette">
        <PaletteItem type="button" label="Button" />
        <PaletteItem type="input" label="Input" />
        <PaletteItem type="table" label="Table" />
      </div>
    </aside>
  )
}


