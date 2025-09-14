import { create } from 'zustand'
import type { Widget, WidgetType, WidgetData } from '../types'

type WidgetStore = {
  widgets: Widget[]
  selectedId?: string
  addWidget: (type: WidgetType, x: number, y: number) => void
  updateWidget: (id: string, updates: Partial<Pick<Widget, 'x' | 'y' | 'width' | 'height'>>) => void
  updateWidgetData: (id: string, data: WidgetData) => void
  deleteWidget: (id: string) => void
  selectWidget: (id?: string) => void
}

let nextId = 1

export const useWidgetStore = create<WidgetStore>((set) => ({
  widgets: [],
  selectedId: undefined,
  addWidget: (type, x, y) =>
    set((state) => ({
      widgets: [
        ...state.widgets,
        {
          id: String(nextId++),
          type,
          x: Math.round(x),
          y: Math.round(y),
          width: type === 'table' ? 400 : 200,
          height: type === 'table' ? 200 : 80,
          data:
            type === 'button' ? { label: 'Click me' } :
            type === 'input' ? { placeholder: 'Enter text' } :
            { rows: 6 },
        },
      ],
    })),
  updateWidget: (id, updates) =>
    set((state) => ({
      widgets: state.widgets.map((w) => (w.id === id ? { ...w, ...updates } : w)),
    })),
  updateWidgetData: (id, data) =>
    set((state) => ({
      widgets: state.widgets.map((w) => (w.id === id ? { ...w, data } : w)),
    })),
  deleteWidget: (id) =>
    set((state) => ({
      widgets: state.widgets.filter((w) => w.id !== id),
    })),
  selectWidget: (id) => set({ selectedId: id }),
}))


