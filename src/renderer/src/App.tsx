import { useState } from 'react'
import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'

interface JournalData {
  success: boolean
  data?: any
  error?: string
  filePath?: string
}

function App(): React.JSX.Element {
  const [journalData, setJournalData] = useState<JournalData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  async function handleSelectJournal() {
    setIsLoading(true)
    try {
      const result = await window.electron.ipcRenderer.invoke('selectJournal')
      setJournalData(result)
      
      if (result && result.success) {
        console.log('Journal loaded successfully:', result.data)
      } else if (result && !result.success) {
        console.error('Error loading journal:', result.error)
      } else {
        console.log('User cancelled file selection')
      }
    } catch (error) {
      console.error('Failed to select journal:', error)
      setJournalData({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      })
    } finally {
      setIsLoading(false)
    }
  }

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

      {journalData && (
        <div className="journal-status">
          {journalData.success ? (
            <div style={{ color: 'green' }}>
              <p>✅ Journal loaded successfully!</p>
              <p>File: {journalData.filePath}</p>
              <p>Entries: {journalData.data?.entries?.length || 'Unknown'}</p>
            </div>
          ) : (
            <div style={{ color: 'red' }}>
              <p>❌ Error loading journal</p>
              <p>Error: {journalData.error}</p>
              {journalData.filePath && <p>File: {journalData.filePath}</p>}
            </div>
          )}
        </div>
      )}

      <Versions></Versions>
    </>
  )
}

export default App
