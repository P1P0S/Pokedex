import { useState } from 'react'
import { PokemonCard } from '../components/PokemonCard'
import { PokemonGrid } from '../components/PokemonGrid'
import { PokemonSpriteSelect } from '../components/PokemonSpriteSelect'
import { SearchPokemon } from '../components/SearchPokemon'
import type { PokemonDetail } from '../types/pokemon'

export function Home() {
  const [searchedPokemon, setSearchedPokemon] = useState<PokemonDetail | null>(
    null
  )

  return (
    <div className="pt-4 flex flex-col justify-center items-center">
      <a
        href="/"
        rel="noopener noreferrer"
        className="mb-4 transition-transform duration-200 hover:scale-105"
      >
        <img
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          alt="pokéapi"
        />
      </a>
      <PokemonSpriteSelect />
      <SearchPokemon onResult={setSearchedPokemon} />
      {searchedPokemon ? (
        <div className="flex flex-col items-center justify-center mt-12">
          <PokemonCard {...searchedPokemon} />
        </div>
      ) : (
        <PokemonGrid />
      )}
    </div>
  )
}
