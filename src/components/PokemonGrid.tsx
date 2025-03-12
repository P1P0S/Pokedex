import { useState } from 'react'
import { usePokemonList } from '../hooks/usePokemonList'
import { Pagination } from './Pagination'
import { PokemonCard } from './PokemonCard'
import { PokemonGridSkeleton } from './skeleton/PokemonGridSekelton'

export function PokemonGrid() {
  const [page, setPage] = useState(0)
  const { data, isFetching, error } = usePokemonList(page)

  if (isFetching && (!data || data.length === 0)) return <PokemonGridSkeleton />

  if (error)
    return (
      <p className="text-center mt-8 text-red-600 font-bold">
        Error while fetching Pokémon
      </p>
    )

  return (
    <>
      <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {data?.map(pokemon => (
          <PokemonCard key={pokemon.id} {...pokemon} />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} />
    </>
  )
}
