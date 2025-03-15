import { MagnifyingGlass, XCircle } from '@phosphor-icons/react'
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
    const normalizedInput = searchInput.trim().replace(' ', '-').toLowerCase()
    if (!normalizedInput) {
      setSearchKey('')
      onResult(null)
      return
    }
    setSearchKey(normalizedInput)
  }

  return (
    <div className="mt-6 flex flex-col items-center md:w-full mb-2">
      <div className="relative w-full max-w-lg md:w-[64%]">
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          className="border border-gray-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-300
            px-4 py-3 w-full pr-16 rounded-full shadow-sm transition-all outline-none text-gray-800 font-semibold"
        />
        <button
          type="button"
          onClick={handleSearch}
          disabled={isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 px-5 py-2
           bg-blue-500 text-white font-bold rounded-full shadow-md active:scale-95 hover:bg-blue-600
           border border-gray-200 cursor-pointer disabled:opacity-50 transition-all duration-200"
        >
          <MagnifyingGlass size={18} />
          <span className="hidden md:block">Search</span>
        </button>
      </div>
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg shadow-md flex items-center gap-1">
          <XCircle size={24} weight="fill" />
          <p className="font-bold">Oops! That Pokémon ran away!</p>
        </div>
      )}
      {isLoading && (
        <div className="flex flex-col items-center mt-6">
          <div className="w-20 h-20 relative animate-bounce">
            <div className="w-full h-full rounded-full bg-gradient-to-b from-red-500 to-white relative overflow-hidden border-4 border-white shadow-lg">
              <div className="absolute top-1/2 w-full h-2 bg-gray-800" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-4 border-gray-800" />
            </div>
          </div>
          <p className="text-gray-700 font-bold mt-4 animate-pulse">
            Catching Pokémon...
          </p>
        </div>
      )}
    </div>
  )
}
