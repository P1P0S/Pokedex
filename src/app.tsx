import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { PokemonDetailPage } from './pages/PokemonDetailPage'

export function App() {
  return (
    <main className="min-h-svh bg-slate-100 pb-12">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:identifier" element={<PokemonDetailPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}
