import { useState } from 'react'
import { PokemonCard } from '../components/PokemonCard'
import { PokemonGrid } from '../components/PokemonGrid'
import { SearchPokemon } from '../components/SearchPokemon'
import type { PokemonCardData } from '../utils/parsePokemonFrontPage'

export function Home() {
  const [searchedPokemon, setSearchedPokemon] =
    useState<PokemonCardData | null>(null)

  return (
    <div className="pt-4 flex flex-col justify-center items-center">
      <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          alt="pokéapi"
        />
      </a>

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
