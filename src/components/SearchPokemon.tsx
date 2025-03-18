import { MagnifyingGlass, XCircle } from '@phosphor-icons/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { usePokemonSearch } from '../hooks/usePokemonSearch'
import { getPokemonDetail } from '../services/pokeAPI'
import type { PokemonDetail } from '../types/pokemon'

interface SearchPokemonProps {
  onResult: (data: PokemonDetail | null) => void
}

export function SearchPokemon({ onResult }: SearchPokemonProps) {
  const [searchInput, setSearchInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const {
    data: allPokemon,
    isLoading,
    error,
  } = usePokemonSearch({
    enabled: searchInput.trim().length > 1,
  })

  const filteredPokemon = useMemo(() => {
    if (!allPokemon || !searchInput.trim()) return []
    const term = searchInput.trim().toLowerCase().replace(/\s+/g, '-')
    return allPokemon.filter(name => name.toLowerCase().includes(term))
  }, [allPokemon, searchInput])

  const exactMatch = useMemo(() => {
    if (!filteredPokemon.length) return null
    const term = searchInput.trim().toLowerCase().replace(/\s+/g, '-')
    return filteredPokemon.find(name => name.toLowerCase() === term) || null
  }, [filteredPokemon, searchInput])

  useEffect(() => {
    if (!searchInput.trim()) {
      onResult(null)
    }
  }, [searchInput, onResult])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && exactMatch) {
      handleSelectPokemon(exactMatch)
      inputRef.current?.blur()
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      inputRef.current?.blur()
    } else if (
      e.key === 'ArrowDown' &&
      showSuggestions &&
      filteredPokemon.length > 0
    ) {
      e.preventDefault()
      const firstOption =
        suggestionsRef.current?.querySelector<HTMLDivElement>('[role="option"]')
      firstOption?.focus()
    }
  }

  const handleSuggestionKeyDown = (e: React.KeyboardEvent, name: string) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSelectPokemon(name)
      inputRef.current?.focus()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const currentIndex = Array.from(
        suggestionsRef.current?.querySelectorAll('[role="option"]') || []
      ).indexOf(e.currentTarget as HTMLDivElement)
      const nextOption =
        suggestionsRef.current?.querySelectorAll<HTMLDivElement>(
          '[role="option"]'
        )[currentIndex + 1]
      nextOption?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const currentIndex = Array.from(
        suggestionsRef.current?.querySelectorAll('[role="option"]') || []
      ).indexOf(e.currentTarget as HTMLDivElement)

      if (currentIndex === 0) {
        inputRef.current?.focus()
      } else {
        const prevOption =
          suggestionsRef.current?.querySelectorAll<HTMLDivElement>(
            '[role="option"]'
          )[currentIndex - 1]
        prevOption?.focus()
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      inputRef.current?.focus()
    }
  }

  const handleSelectPokemon = async (name: string) => {
    setSearchInput(name.replace(/-/g, ' '))
    const pokemonDetails = await getPokemonDetail(name)
    onResult(pokemonDetails)
    setShowSuggestions(false)
  }

  const handleClearInput = () => {
    setSearchInput('')
    onResult(null)
    inputRef.current?.focus()
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="mt-6 flex flex-col items-center w-full px-4 md:px-0">
      <div ref={containerRef} className="relative w-full max-w-md">
        <div
          className={`
          flex items-center w-full relative
            ${showSuggestions && filteredPokemon.length > 0 ? 'rounded-t-lg shadow-lg' : 'rounded-full shadow-sm'}
            border border-gray-300 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-300
            bg-white transition-all
          `}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by name or ID"
            value={searchInput}
            onChange={e => {
              setSearchInput(e.target.value)
              setShowSuggestions(!!e.target.value.trim())
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => searchInput.trim() && setShowSuggestions(true)}
            aria-label="Search Pokémon"
            aria-controls="pokemon-suggestions"
            aria-expanded={showSuggestions}
            className="px-4 py-3 w-full pr-16 rounded-l-full outline-none
              text-gray-800 font-semibold bg-transparent"
          />
          <div className="absolute right-4 flex items-center gap-2">
            {searchInput && (
              <button
                type="button"
                onClick={handleClearInput}
                className="text-gray-400 hover:text-gray-600 focus:outline-none 
                  focus:ring-2 focus:ring-blue-300 rounded-full"
                aria-label="Clear search"
              >
                <XCircle size={18} weight="fill" />
              </button>
            )}
            <MagnifyingGlass className="text-gray-400" size={18} />
          </div>
        </div>

        {!isLoading && filteredPokemon.length > 0 && showSuggestions && (
          <div
            ref={suggestionsRef}
            id="pokemon-suggestions"
            className="w-full z-10 bg-white shadow-lg border-x border-b border-gray-300 
              rounded-b-lg"
            aria-label="Pokémon suggestions"
          >
            <div className="max-h-60 overflow-y-auto bg-white rounded-b-lg p-2">
              {filteredPokemon.slice(0, 8).map(name => (
                <div
                  key={name}
                  onClick={() => handleSelectPokemon(name)}
                  onKeyDown={e => handleSuggestionKeyDown(e, name)}
                  className="p-2 hover:bg-gray-100 rounded cursor-pointer flex
                    items-center gap-2 outline-none focus:bg-gray-100 focus:ring-2 focus:ring-blue-300"
                  // biome-ignore lint/a11y/useSemanticElements: <explanation>
                  role="option"
                  tabIndex={0}
                  aria-selected={name === searchInput}
                >
                  <MagnifyingGlass size={16} className="text-gray-400" />
                  <span className="font-medium capitalize">
                    {name.replace(/-/g, ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div
          className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg shadow-md flex 
            items-center gap-1 w-full max-w-md"
          role="alert"
        >
          <XCircle size={24} weight="fill" />
          <p className="font-bold">Oops! Couldn't load Pokémon data!</p>
        </div>
      )}
    </div>
  )
}
