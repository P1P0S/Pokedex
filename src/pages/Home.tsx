import { PokemonGrid } from '../components/PokemonGrid'

export function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-4">Pokédex</h1>
      <PokemonGrid />
    </div>
  )
}
