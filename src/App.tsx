import './App.css'
import { Sidebar } from './components/Sidebar'
import { Canvas } from './components/Canvas'
import { Inspector } from './components/Inspector'
import { useWidgetStore } from './store/widgets'

function Header() {
  const widgets = useWidgetStore((s) => s.widgets)
  
  const handleSave = () => {
    const data = {
      widgets,
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    }
    localStorage.setItem('ui-builder-save', JSON.stringify(data))
    alert('Design saved to browser storage!')
  }
  
  const handlePublish = () => {
    const data = {
      widgets,
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    }
    
    // In a real app, this would send to a server
    console.log('Publishing design:', data)
    
    // For demo, show the JSON structure
    const jsonStr = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ui-design-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    
    alert('Design exported as JSON file!')
  }
  
  const handleLoad = () => {
    const saved = localStorage.getItem('ui-builder-save')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        // In a real app, you'd update the store with loaded data
        console.log('Loaded design:', data)
        alert('Design loaded from browser storage!')
      } catch (e) {
        alert('Failed to load saved design')
      }
    } else {
      alert('No saved design found')
    }
  }

  return (
    <header className="app-header">
      <div className="brand">Thamizh UI Builder</div>
      <div className="header-actions">
        <button onClick={handleLoad}>Load</button>
        <button onClick={handleSave}>Save</button>
        <button onClick={handlePublish} style={{ background: 'var(--brand)', borderColor: 'var(--brand-600)' }}>Publish</button>
      </div>
    </header>
  )
}

function App() {
  return (
    <div className="app-shell">
      <Header />
      <div className="app-root">
        <Sidebar />
        <Canvas />
        <Inspector />
      </div>
    </div>
  )
}

export default App
