import { Link } from 'react-router'

function About(): React.JSX.Element {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>About Day One Viewer</h1>
      <p>This is a simple Electron application for viewing Day One journal files.</p>
      <p>Built with React, TypeScript, and Electron.</p>
      
      <div style={{ marginTop: '2rem' }}>
        <Link to="/" style={{ 
          color: 'var(--vt-c-brand)', 
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

export default About