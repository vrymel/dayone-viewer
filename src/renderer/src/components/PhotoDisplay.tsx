import { useState, useEffect } from 'react'

interface PhotoDisplayProps {
  filename: string
}

export function PhotoDisplay({ filename }: PhotoDisplayProps) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadPhoto = async (imageFilename: string): Promise<void> => {
    if (!imageFilename.trim()) {
      setError('No filename provided')
      setPhotoUrl(null)
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      const result = await window.api.getPhoto(imageFilename.trim())
      
      if (result) {
        setPhotoUrl(result)
      } else {
        setError('Failed to load photo. Check if the file exists and is a valid image.')
        setPhotoUrl(null)
      }
    } catch (err) {
      setError('Error loading photo: ' + (err instanceof Error ? err.message : 'Unknown error'))
      setPhotoUrl(null)
    } finally {
      setLoading(false)
    }
  }

  // Load photo when filename prop changes
  useEffect(() => {
    loadPhoto(filename)
  }, [filename])

  return (
    <div className="space-y-4">
      {loading && (
        <div className="p-3 text-blue-600 bg-blue-50 border border-blue-200 rounded">
          Loading photo...
        </div>
      )}

      {error && (
        <div className="p-3 text-red-600 bg-red-50 border border-red-200 rounded">
          {error}
        </div>
      )}

      {photoUrl && !loading && (
        <div className="border rounded-lg overflow-hidden">
          <img
            src={photoUrl}
            alt={filename}
            className="max-w-full h-auto"
            onError={() => setError('Failed to display image')}
          />
        </div>
      )}
    </div>
  )
}