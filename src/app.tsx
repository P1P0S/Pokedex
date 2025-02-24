import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { PokemonDetailPage } from './pages/PokemonDetailPage'

export function App() {
  return (
    <main className="main-h-screen bg-gray-50">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:identifier" element={<PokemonDetailPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}
