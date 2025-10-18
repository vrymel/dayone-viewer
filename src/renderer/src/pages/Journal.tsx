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
  return (
    <div className="text-red-700">journal page</div>
  )
}

export default Journal