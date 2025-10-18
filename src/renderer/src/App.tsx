import { useState } from 'react'
import Versions from './components/Versions'
import JournalViewer from './components/JournalViewer'
import electronLogo from './assets/electron.svg'

interface JournalData {
  success: boolean
  data?: any
  error?: string
  filePath?: string
}

type AppView = 'home' | 'journal'

function App(): React.JSX.Element {
  const [journalData, setJournalData] = useState<JournalData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentView, setCurrentView] = useState<AppView>('home')

  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  async function handleSelectJournal() {
    setIsLoading(true)
    try {
      const result = await window.electron.ipcRenderer.invoke('selectJournal')
      setJournalData(result)
      
      if (result && result.journalPath) {
        console.log('Journal loaded successfully:', result.data)
        setCurrentView('journal')
      } 
      // else if (result && !result.success) {
      //   console.error('Error loading journal:', result.error)
      //   setCurrentView('journal') // Show error page
      // } else {
      //   console.log('User cancelled file selection')
      // }
    } catch (error) {
      console.error('Failed to select journal:', error)
      setJournalData({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      })
      setCurrentView('journal') // Show error page
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setJournalData(null)
  }

  // Render journal viewer if we have data and are on journal view
  if (currentView === 'journal' && journalData) {
    return <JournalViewer journalData={journalData} onBack={handleBackToHome} />
  }

  // Render home view
  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>

        <button onClick={handleSelectJournal} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Select Journal'}
        </button>
      </div>

      <Versions></Versions>
    </>
  )
}

export default App
