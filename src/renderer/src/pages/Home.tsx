import { useState } from 'react'
import { useNavigate } from 'react-router'
import Versions from '../components/Versions'
import electronLogo from '../assets/electron.svg'

function Home(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  async function handleSelectJournal() {
    setIsLoading(true)
    try {
      const result = await window.electron.ipcRenderer.invoke('selectJournal')
      
      if (result && result.journalPath) {
        console.log('Journal loaded successfully:', result.data)
        // Navigate to journal page with the journal data
        navigate('/journal', { state: { journalData: result } })
      } 
    } catch (error) {
      console.error('Failed to select journal:', error)
      // Navigate to journal page with error data
      navigate('/journal', { 
        state: { 
          journalData: {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
          }
        }
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

      <Versions></Versions>
    </>
  )
}

export default Home