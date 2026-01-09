import { PowerButton } from './components/PowerButton'
import { useFocusMode } from './hooks/useFocusMode'
import './App.css'

function App() {
    const { isEnabled, isLoading, toggleFocusMode } = useFocusMode();

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="app">
            <header className="app-header">
                <h1>Focus Mode</h1>
            </header>
            <main className="app-main">
                <div className="power-section">
                    <PowerButton isEnabled={isEnabled} onToggle={toggleFocusMode} />
                    <p className="status-text">
                        Focus mode is <strong>{isEnabled ? 'ON' : 'OFF'}</strong>
                    </p>
                </div>
            </main>
        </div>
    )
}

export default App;
