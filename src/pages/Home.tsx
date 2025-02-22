import { PokemonList } from '../components/PokemonList'

export function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Página Inicial</h1>
      <PokemonList />
    </div>
  )
}
