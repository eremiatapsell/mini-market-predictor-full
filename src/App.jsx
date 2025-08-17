import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Markets from './pages/Markets'
import Market from './pages/Market'
import CreateMarket from './pages/CreateMarket'
import Profile from './pages/Profile'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Markets />} />
        <Route path="/m/:id" element={<Market />} />
        <Route path="/create" element={<CreateMarket />} />
        <Route path="/me" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}
