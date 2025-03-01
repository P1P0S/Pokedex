import { MagnifyingGlass, X } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { usePokemonSearch } from '../hooks/usePokemonSearch'
import type { PokemonDetail } from '../types/pokemon'

interface SearchPokemonProps {
  onResult: (data: PokemonDetail | null) => void
}

export function SearchPokemon({ onResult }: SearchPokemonProps) {
  const [searchInput, setSearchInput] = useState('')
  const [searchKey, setSearchKey] = useState('')

  const { data: searchData, isLoading, error } = usePokemonSearch(searchKey)

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
    const normalizedInput = searchInput.replace(' ', '-').toLowerCase()
    if (!normalizedInput.trim()) return
    setSearchKey(normalizedInput)
  }

  function handleClear() {
    setSearchInput('')
    setSearchKey('')
    onResult(null)
  }

  return (
    <div className="mt-6 flex flex-col items-center">
      <div className="relative flex items-center w-[500px]">
        <input
          type="text"
          placeholder="Search by name or ID"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          className="border-2 border-yellow-500 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-400
            px-4 py-2 w-full rounded-full shadow-md transition-all outline-none text-gray-800 font-semibold"
        />
      </div>

      <div className="mt-4 flex space-x-3">
        <button
          type="button"
          onClick={handleSearch}
          disabled={isLoading}
          className="flex flex-row items-center gap-1 px-6 py-2 bg-red-500 text-white font-bold rounded-full shadow-lg
            active:scale-95 hover:bg-red-600 border-4 border-white cursor-pointer disabled:opacity-50"
        >
          <MagnifyingGlass size={18} />
          Search
        </button>

        {searchData && (
          <button
            className="flex flex-row items-center gap-1 px-6 py-2 bg-gray-700 text-white font-bold rounded-full shadow-lg
              active:scale-95 hover:bg-gray-800 border-4 border-white cursor-pointer"
            onClick={handleClear}
            type="button"
          >
            <X size={18} className="text-red-600" />
            Clear
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-600 font-bold mt-2">Pokémon not found</p>
      )}
      {isLoading && (
        <p className="text-gray-600 font-semibold mt-2">Loading...</p>
      )}
    </div>
  )
}
