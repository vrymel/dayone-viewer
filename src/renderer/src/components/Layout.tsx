import { Outlet, Link, useLocation } from 'react-router';

interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps): React.JSX.Element {
  const location = useLocation()
  
  return (
    <div className="app-layout">
      <nav className="app-navigation">
        <Link 
          to="/" 
          className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
        >
          Home
        </Link>
        <Link 
          to="/about" 
          className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}
        >
          About
        </Link>
        <Link 
          to="/journal" 
          className={location.pathname === '/journal' ? 'nav-link active' : 'nav-link'}
        >
          Journal
        </Link>
      </nav>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout