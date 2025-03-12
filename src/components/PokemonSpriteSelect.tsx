import { CaretDown, Gear } from '@phosphor-icons/react'
import { useCallback, useEffect, useState } from 'react'
import { usePokemonSpriteStore } from '../store/pokemonStore'
import type {
  SpriteGame,
  SpriteGeneration,
  SpriteOther,
  SpriteVariant,
} from '../types/pokemon'

export function PokemonSpriteSelect() {
  const [isOpen, setIsOpen] = useState(false)

  const {
    selectedOther,
    selectedGeneration,
    selectedVariant,
    selectedGame,
    setOther,
    setGeneration,
    setVariant,
    setGame,
  } = usePokemonSpriteStore()

  const others: { value: SpriteOther; label: string }[] = [
    { value: 'official-artwork', label: 'Official Artwork' },
    { value: 'showdown', label: 'Showdown' },
    { value: 'home', label: 'HOME' },
    { value: 'dream_world', label: 'Dream World' },
  ]

  const variants: { value: SpriteVariant; label: string }[] = [
    { value: 'front_default', label: 'Front Default' },
    { value: 'back_default', label: 'Back Default' },
    { value: 'front_shiny', label: 'Front Shiny' },
    { value: 'back_shiny', label: 'Back Shiny' },
  ]

  const generations: {
    value: SpriteGeneration
    label: string
    games: { value: SpriteGame; label: string }[]
  }[] = [
    {
      value: 'generation-i',
      label: 'Generation I',
      games: [
        { value: 'red-blue', label: 'Red / Blue' },
        { value: 'yellow', label: 'Yellow' },
      ],
    },
    {
      value: 'generation-ii',
      label: 'Generation II',
      games: [
        { value: 'gold', label: 'Gold' },
        { value: 'silver', label: 'Silver' },
        { value: 'crystal', label: 'Crystal' },
      ],
    },
    {
      value: 'generation-iii',
      label: 'Generation III',
      games: [
        { value: 'ruby-sapphire', label: 'Ruby / Sapphire' },
        { value: 'emerald', label: 'Emerald' },
        { value: 'firered-leafgreen', label: 'FireRed / LeafGreen' },
      ],
    },
    {
      value: 'generation-iv',
      label: 'Generation IV',
      games: [
        { value: 'diamond-pearl', label: 'Diamond / Pearl' },
        { value: 'heartgold-soulsilver', label: 'HeartGold / SoulSilver' },
      ],
    },
    {
      value: 'generation-v',
      label: 'Generation V',
      games: [
        { value: 'black-white', label: 'Black / White' },
        { value: 'animated', label: 'Animated' },
      ],
    },
    {
      value: 'generation-vi',
      label: 'Generation VI',
      games: [
        {
          value: 'omegaruby-alphasapphire',
          label: 'Omega Ruby / Alpha Sapphire',
        },
        { value: 'x-y', label: 'X / Y' },
      ],
    },
    {
      value: 'generation-vii',
      label: 'Generation VII',
      games: [
        { value: 'ultra-sun-ultra-moon', label: 'Ultra Sun / Ultra Moon' },
        { value: 'icons', label: 'icons' },
      ],
    },
  ]

  const isGameValidForGeneration = useCallback(() => {
    if (!selectedGeneration) return false
    const currentGen = generations.find(g => g.value === selectedGeneration)
    return currentGen?.games.some(game => game.value === selectedGame)
  }, [selectedGeneration, selectedGame])

  useEffect(() => {
    if (!selectedGeneration && !selectedOther) {
      setOther('official-artwork')
    }

    if (selectedGeneration && !isGameValidForGeneration()) {
      const currentGen = generations.find(g => g.value === selectedGeneration)
      if (currentGen) setGame(currentGen.games[0].value)
    }

    if (!selectedVariant) {
      setVariant('front_default')
    }
  }, [
    selectedGeneration,
    selectedOther,
    selectedVariant,
    setGame,
    setOther,
    setVariant,
    isGameValidForGeneration,
  ])

  const allowedVariants = new Set<string>()

  if (selectedOther === 'official-artwork') {
    allowedVariants.add('front_default').add('front_shiny')
  } else if (selectedOther === 'dream_world') {
    allowedVariants.add('front_default')
  } else if (selectedGame === 'emerald') {
    allowedVariants.add('front_default').add('front_shiny')
  } else if (selectedGame === 'ultra-sun-ultra-moon') {
    allowedVariants.add('front_default').add('front_shiny')
  } else if (selectedGame === 'icons') {
    allowedVariants.add('front_default')
  }

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="md:w-full max-w-md mx-auto bg-white rounded-lg shadow-md mb-6 overflow-hidden transition-all duration-300">
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        className="flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={toggleAccordion}
      >
        <Gear
          size={22}
          className={`text-blue-600 mr-2 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
        />
        <h3 className="text-lg font-bold text-gray-800">Sprite Settings</h3>

        <CaretDown
          className={`ml-auto w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {/* Content - shown/hidden based on isOpen state */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-4 pt-0 space-y-4 bg-gray-50 mx-2 mb-2 rounded-lg">
          <div>
            <label
              htmlFor="spriteType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Model
            </label>
            <select
              id="spriteType"
              value={selectedOther || selectedGeneration || ''}
              onChange={e => {
                const value = e.target.value
                if (others.some(o => o.value === value)) {
                  setOther(value as SpriteOther)
                  setGeneration(null)
                  setGame(null)
                } else {
                  setGeneration(value as SpriteGeneration)
                  setOther(null)
                }
              }}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <optgroup label="Game Versions">
                {generations.map(gen => (
                  <option key={gen.value} value={gen.value}>
                    {gen.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Other Sprites">
                {others.map(other => (
                  <option key={other.value} value={other.value}>
                    {other.label}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {selectedGeneration && (
            <div>
              <label
                htmlFor="game"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Game
              </label>
              <select
                id="game"
                value={selectedGame || ''}
                onChange={e => setGame(e.target.value as SpriteGame)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {generations
                  .find(g => g.value === selectedGeneration)
                  ?.games.map(game => (
                    <option key={game.value} value={game.value}>
                      {game.label}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <div>
            <label
              htmlFor="variant"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Variant
            </label>
            <select
              id="variant"
              value={selectedVariant}
              onChange={e => setVariant(e.target.value as SpriteVariant)}
              className="w-full px-3 py-2 bg-white border border-gray-300 
                rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            >
              {variants.map(variant => {
                const isAllowed =
                  allowedVariants.size === 0 ||
                  allowedVariants.has(variant.value)

                return isAllowed ? (
                  <option key={variant.value} value={variant.value}>
                    {variant.label}
                  </option>
                ) : null
              })}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonSpriteSelect
