import { useState } from 'react'
import { usePokemonList } from '../hooks/usePokemonList'
import { Pagination } from './Pagination'
import { PokemonCard } from './PokemonCard'

export function PokemonGrid() {
  const [page, setPage] = useState(0)
  const { data, isLoading, error } = usePokemonList(page)

  if (isLoading) return <p className="text-center mt-8">Carregando...</p>
  if (error)
    return <p className="text-center mt-8">Error while fetching pokémon</p>

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {data?.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            types={pokemon.types}
            sprite={pokemon.sprite}
          />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} />
    </>
  )
}
