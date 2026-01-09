import { PowerButton } from './components/PowerButton'
import { BlockedUrlList } from './components/BlockedUrlList'
import { AddUrlForm } from './components/AddUrlForm'
import { useFocusMode } from './hooks/useFocusMode'
import './App.css'

function App() {
  const { 
    isEnabled, 
    blockedUrls, 
    isLoading, 
    toggleFocusMode,
    addBlockedUrl,
    removeBlockedUrl 
  } = useFocusMode();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Focus Mode</h1>
      </header>
      
      <main className="app-main">
        {/* Power Button Section */}
        <div className="power-section">
          <PowerButton isEnabled={isEnabled} onToggle={toggleFocusMode} />
          <p className="status-text">
            Focus mode is <strong>{isEnabled ? 'ON' : 'OFF'}</strong>
          </p>
        </div>

        {/* URL Management Section */}
        <div className="url-section">
          <BlockedUrlList 
            urls={blockedUrls} 
            onRemove={removeBlockedUrl} 
          />
          
          <div className="divider"></div>
          
          <AddUrlForm onAdd={addBlockedUrl} />
        </div>
      </main>
    </div>
  )
}

export default App;