export type WidgetType = 'button' | 'input' | 'table'

export type ButtonData = { label?: string }
export type InputData = { placeholder?: string }
export type TableData = { rows?: number }

export type WidgetData = ButtonData | InputData | TableData | undefined

export type Widget = {
  id: string
  type: WidgetType
  x: number
  y: number
  width: number
  height: number
  data?: WidgetData
}


