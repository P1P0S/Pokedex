import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getPokemonDetail } from '../services/pokemon'
import {
  type PokemonCardData,
  parsePokemonDetail,
} from '../utils/pokemonParser'

interface SearchPokemonProps {
  onResult: (data: PokemonCardData | null) => void
}

export function SearchPokemon({ onResult }: SearchPokemonProps) {
  const [searchInput, setSearchInput] = useState('')

  const {
    data: searchData,
    refetch,
    isLoading,
    error,
  } = useQuery<PokemonCardData, Error>({
    queryKey: ['pokemonSearch'],
    queryFn: async () => {
      const detail = await getPokemonDetail(searchInput.trim())
      return parsePokemonDetail(detail)
    },
    retry: 2,
    enabled: false,
  })

  useEffect(() => {
    if (isLoading) return
    if (error) {
      onResult(null)
      return
    }
    if (searchData) {
      onResult(searchData)
    }
  }, [searchData, error, isLoading, onResult])

  function handleSearch() {
    if (!searchInput.trim()) return
    refetch()
  }

  function handleClear() {
    setSearchInput('')
    onResult(null)
  }

  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="mb-4 w-[500px]">
        <input
          type="text"
          placeholder="Search by name or id"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          className="border p-2 w-full rounded-sm"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="mt-2 p-2 bg-blue-500 text-white rounded-md"
        >
          Search
        </button>
        {searchInput && (
          <button
            className="mt-2 ml-1 p-2 bg-red-600 text-white rounded-md"
            onClick={handleClear}
            type="button"
          >
            Clear
          </button>
        )}
      </div>
      {error && <p className="text-red-600">Error while searching Pokémon</p>}
      {isLoading && <p>Loading...</p>}
    </div>
  )
}
