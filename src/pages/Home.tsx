import { useState } from 'react'
import { PokemonCard } from '../components/PokemonCard'
import { PokemonGrid } from '../components/PokemonGrid'
import { SearchPokemon } from '../components/SearchPokemon'
import type { PokemonCardData } from '../utils/parsePokemonFrontPage'

export function Home() {
  const [searchedPokemon, setSearchedPokemon] =
    useState<PokemonCardData | null>(null)

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-center pt-4">Pokédex</h1>

      <SearchPokemon onResult={setSearchedPokemon} />

      {searchedPokemon ? (
        <div className="flex flex-col items-center justify-center mt-8">
          <PokemonCard {...searchedPokemon} />
        </div>
      ) : (
        <PokemonGrid />
      )}
    </div>
  )
}
