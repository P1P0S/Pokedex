import { useState } from 'react'
import { PokemonAbout } from './PokemonAbout'
import { PokemonMoves } from './PokemonMoves'
import { PokemonStats } from './PokemonStats'

export function PokemonTabs() {
  const [activeTab, setActiveTab] = useState<'stats' | 'moves' | 'about'>(
    'stats'
  )

  return (
    <div className="w-full">
      <nav className="flex gap-6 border-b border-slate-300">
        <button
          type="button"
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 text-lg font-bold cursor-pointer
            ${
              activeTab === 'stats'
                ? 'text-green-600 border-b-4 border-green-600 -mb-[1px]'
                : 'text-gray-500 border-b-4 border-transparent -mb-[1px]'
            }
          `}
        >
          Stats
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('moves')}
          className={`px-4 py-2 text-lg font-bold cursor-pointer
            ${
              activeTab === 'moves'
                ? 'text-green-600 border-b-4 border-green-600 -mb-[1px]'
                : 'text-gray-500 border-b-4 border-transparent -mb-[1px]'
            }
          `}
        >
          Moves
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('about')}
          className={`px-4 py-2 text-lg font-bold cursor-pointer
            ${
              activeTab === 'about'
                ? 'text-green-600 border-b-4 border-green-600 -mb-[1px]'
                : 'text-gray-500 border-b-4 border-transparent -mb-[1px]'
            }
          `}
        >
          About
        </button>
      </nav>

      {activeTab === 'stats' && <PokemonStats />}
      {activeTab === 'moves' && <PokemonMoves />}
      {activeTab === 'about' && <PokemonAbout />}
    </div>
  )
}
