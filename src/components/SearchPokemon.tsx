import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getPokemonDetail } from '../services/pokeAPI'
import {
  type PokemonCardData,
  parsePokemonFrontPage,
} from '../utils/parsePokemonFrontPage'

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
      return parsePokemonFrontPage(detail)
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
    const normalizeInput = searchInput.replace(' ', '-').toLowerCase()
    if (!normalizeInput.trim()) return
    setSearchInput(normalizeInput)
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
          className="mt-2 p-2 bg-blue-500 text-white rounded-md cursor-pointer"
        >
          Search
        </button>
        {(searchInput || searchData) && (
          <button
            className="mt-2 ml-1 p-2 bg-red-600 text-white rounded-md cursor-pointer"
            onClick={handleClear}
            type="button"
          >
            Clear
          </button>
        )}
      </div>
      {error && <p className="text-red-600">Pokémon not found</p>}
      {isLoading && <p>Loading...</p>}
    </div>
  )
}
