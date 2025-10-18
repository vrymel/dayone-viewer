import { useLocation, useNavigate } from 'react-router'
import { useEffect } from 'react'
import JournalViewer from '../components/JournalViewer'

interface JournalData {
  success: boolean
  data?: any
  error?: string
  filePath?: string
}

function Journal(): React.JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Get journal data from navigation state
  const journalData = location.state?.journalData as JournalData | null

  const handleBackToHome = () => {
    navigate('/')
  }

  // If no journal data, redirect to home
  useEffect(() => {
    if (!journalData) {
      navigate('/')
    }
  }, [journalData, navigate])

  // Show loading while redirecting
  if (!journalData) {
    return <div>Redirecting to home...</div>
  }

  return (
    <JournalViewer 
      journalData={journalData} 
      onBack={handleBackToHome} 
    />
  )
}

export default Journal