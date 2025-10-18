import { useState, useEffect } from 'react'

interface JournalEntry {
  uuid: string
  text?: string
  creationDate: string
  modifiedDate?: string
  timeZone?: string
  starred?: boolean
  tags?: string[]
  weather?: any
  location?: any
  photos?: any[]
}

interface JournalData {
  success: boolean
  data?: {
    entries: JournalEntry[]
    metadata?: any
  }
  error?: string
  filePath?: string
}

interface JournalViewerProps {
  journalData: JournalData
  onBack: () => void
}

function JournalViewer({ journalData, onBack }: JournalViewerProps): React.JSX.Element {
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredEntries, setFilteredEntries] = useState<JournalEntry[]>([])

  useEffect(() => {
    if (journalData?.data?.entries) {
      const filtered = journalData.data.entries.filter(entry =>
        entry.text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      setFilteredEntries(filtered)
    }
  }, [journalData, searchTerm])

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  const truncateText = (text: string | undefined, maxLength: number = 100) => {
    if (!text) return 'No content'
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  if (!journalData.success) {
    return (
      <div style={{ padding: '20px' }}>
        <button onClick={onBack} style={{ marginBottom: '20px' }}>
          ← Back to Home
        </button>
        <div style={{ color: 'red' }}>
          <h2>❌ Error loading journal</h2>
          <p>Error: {journalData.error}</p>
          {journalData.filePath && <p>File: {journalData.filePath}</p>}
        </div>
      </div>
    )
  }

  const entries = journalData.data?.entries || []

  return (
    <div style={{ padding: '20px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={onBack} style={{ marginBottom: '10px' }}>
          ← Back to Home
        </button>
        <h1>Journal Viewer</h1>
        <p><strong>File:</strong> {journalData.filePath}</p>
        <p><strong>Total Entries:</strong> {entries.length}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search entries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      <div style={{ display: 'flex', flex: 1, gap: '20px', overflow: 'hidden' }}>
        {/* Entry List */}
        <div style={{ 
          width: '40%', 
          borderRight: '1px solid #ccc', 
          paddingRight: '20px',
          overflow: 'auto'
        }}>
          <h3>Entries ({filteredEntries.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredEntries.map((entry) => (
              <div
                key={entry.uuid}
                onClick={() => setSelectedEntry(entry)}
                style={{
                  padding: '15px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: selectedEntry?.uuid === entry.uuid ? '#f0f8ff' : '#fff',
                  transition: 'background-color 0.2s'
                }}
              >
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                  {formatDate(entry.creationDate)}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  {truncateText(entry.text)}
                </div>
                {entry.tags && entry.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {entry.tags.map((tag, index) => (
                      <span
                        key={index}
                        style={{
                          fontSize: '12px',
                          backgroundColor: '#e3f2fd',
                          color: '#1976d2',
                          padding: '2px 6px',
                          borderRadius: '12px'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {entry.starred && (
                  <div style={{ marginTop: '5px', color: '#ffa000' }}>
                    ⭐ Starred
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Entry Detail */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          {selectedEntry ? (
            <div>
              <h3>Entry Details</h3>
              <div style={{ marginBottom: '20px' }}>
                <p><strong>Created:</strong> {formatDate(selectedEntry.creationDate)}</p>
                {selectedEntry.modifiedDate && (
                  <p><strong>Modified:</strong> {formatDate(selectedEntry.modifiedDate)}</p>
                )}
                {selectedEntry.timeZone && (
                  <p><strong>Time Zone:</strong> {selectedEntry.timeZone}</p>
                )}
              </div>

              {selectedEntry.tags && selectedEntry.tags.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <strong>Tags:</strong>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '5px' }}>
                    {selectedEntry.tags.map((tag, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: '#e3f2fd',
                          color: '#1976d2',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '14px'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ 
                backgroundColor: '#f9f9f9', 
                padding: '20px', 
                borderRadius: '8px',
                whiteSpace: 'pre-wrap',
                lineHeight: '1.6'
              }}>
                {selectedEntry.text || 'No content available'}
              </div>

              {selectedEntry.weather && (
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
                  <strong>Weather:</strong>
                  <pre style={{ marginTop: '10px', fontSize: '12px' }}>
                    {JSON.stringify(selectedEntry.weather, null, 2)}
                  </pre>
                </div>
              )}

              {selectedEntry.location && (
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0fff0', borderRadius: '8px' }}>
                  <strong>Location:</strong>
                  <pre style={{ marginTop: '10px', fontSize: '12px' }}>
                    {JSON.stringify(selectedEntry.location, null, 2)}
                  </pre>
                </div>
              )}

              {selectedEntry.photos && selectedEntry.photos.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                  <strong>Photos:</strong> {selectedEntry.photos.length} attached
                </div>
              )}
            </div>
          ) : (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              color: '#666'
            }}>
              Select an entry to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default JournalViewer