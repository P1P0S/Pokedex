import { useState } from 'react'
import { PokemonCard } from '../components/PokemonCard'
import { PokemonGrid } from '../components/PokemonGrid'
import { SearchPokemon } from '../components/SearchPokemon'
import type { PokemonCardData } from '../utils/pokemonParser'

export function Home() {
  const [searchedPokemon, setSearchedPokemon] =
    useState<PokemonCardData | null>(null)

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-4">Pokédex</h1>

      <SearchPokemon onResult={setSearchedPokemon} />

      {searchedPokemon ? (
        <div className="flex flex-col items-center justify-center mt-8">
          <PokemonCard
            id={searchedPokemon.id}
            name={searchedPokemon.name}
            types={searchedPokemon.types}
            sprite={searchedPokemon.sprite}
          />
        </div>
      ) : (
        <PokemonGrid />
      )}
    </div>
  )
}
