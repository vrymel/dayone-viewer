import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Journal from './pages/Journal'
import About from './pages/About'

function App(): React.JSX.Element {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </Router>
  )
}

export default App
