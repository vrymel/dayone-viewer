import { useLocation, useNavigate } from 'react-router'
import { useEffect } from 'react'
import { Button } from '@renderer/components/ui/button';

interface JournalData {
  success: boolean
  data?: any
  error?: string
  filePath?: string
}

function Journal(): React.JSX.Element {
  return (
    <div>
      <h1>journal page</h1>
      <Button variant="default" size="lg">
        ShadCN Button
      </Button>
    </div>
  )
}

export default Journal