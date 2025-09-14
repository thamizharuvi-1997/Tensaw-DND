# UI Builder (Drag-and-Drop Widgets)

A minimal Retool/n8n-like canvas where you can drag widgets from a sidebar and drop them onto a central canvas. Widgets are movable and resizable.

## Setup

```bash
npm install
npm run dev
```

Open the URL printed by the dev server.

## Features

- Sidebar with draggable widgets: Button, Input, Table
- Canvas accepts drops and places widgets at the drop position
- Move and resize widgets within the canvas (snaps are bounded to parent)
- Delete widgets
- State managed with Zustand

## Libraries Used

- react-dnd + react-dnd-html5-backend: Dragging from the sidebar to canvas
- react-rnd: Move/resize behavior of placed widgets
- zustand: Lightweight global store for widget list and positions

## Project Structure

- `src/components/Sidebar.tsx`: Draggable palette
- `src/components/Canvas.tsx`: Drop zone and widget rendering
- `src/store/widgets.ts`: Zustand store for widget layout
- `src/components/widgets/*`: Simple Button, Input, and Table widgets

## Notes

- This example uses pixel-based layout with parent bounds. You could adapt to a 12-column grid by quantizing the x/y/width/height values when updating the store.
- Add more widgets by extending `WidgetType` in `src/types.ts`, creating a widget component, and updating the sidebar and renderer.
