import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'   // 👈 import Footer
import Markets from './pages/Markets'
import Market from './pages/Market'
import CreateMarket from './pages/CreateMarket'
import Profile from './pages/Profile'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container" style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
        <Navbar />
        <main style={{flex: 1}}>
          <Routes>
            <Route path="/" element={<Markets />} />
            <Route path="/m/:id" element={<Market />} />
            <Route path="/create" element={<CreateMarket />} />
            <Route path="/me" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}