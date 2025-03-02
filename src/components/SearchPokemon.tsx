import { MagnifyingGlass } from '@phosphor-icons/react'
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
    if (!normalizedInput) {
      setSearchKey('')
      onResult(null)
      return
    }
    setSearchKey(normalizedInput)
  }

  return (
    <div className="mt-6 flex flex-col items-center w-full mb-2">
      <div className="relative w-[64%]">
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          className="border-2 border-yellow-500 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-400
            px-4 py-3 w-full pr-20 rounded-full shadow-md transition-all outline-none text-gray-800 font-semibold"
        />

        <button
          type="button"
          onClick={handleSearch}
          disabled={isLoading}
          className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-2 px-6 py-2 
            bg-blue-500 text-white font-bold rounded-full shadow-md active:scale-95 hover:bg-blue-700 
            border border-white cursor-pointer disabled:opacity-50 transition-all"
        >
          <MagnifyingGlass size={18} />
          Buscar
        </button>
      </div>

      {error && (
        <p className="text-red-600 font-bold mt-2">Pokémon não encontrado</p>
      )}
      {isLoading && (
        <p className="text-gray-600 font-semibold mt-2">Carregando...</p>
      )}
    </div>
  )
}
