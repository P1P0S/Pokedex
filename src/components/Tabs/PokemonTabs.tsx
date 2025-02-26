import { useTabStore } from '../../store/pokemonStore'
import { PokemonMoves } from './PokemonMoves'
import { PokemonStatus } from './PokemonStatus'

export function PokemonTabs() {
  const { activeTab, setActiveTab } = useTabStore()

  return (
    <div className="w-full">
      <nav className="relative flex gap-6 mb-4 border-b border-slate-300">
        <button
          type="button"
          onClick={() => setActiveTab('status')}
          className={`pb-1 px-2 font-bold cursor-pointer
            ${
              activeTab === 'status'
                ? 'text-green-600 border-b-4 border-green-600 -mb-[2px]'
                : 'text-gray-500 border-b-4 border-transparent'
            }
          `}
        >
          Status
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('moves')}
          className={`pb-1 px-2 font-bold cursor-pointer
            ${
              activeTab === 'moves'
                ? 'text-green-600 border-b-4 border-green-600 -mb-[2px]'
                : 'text-gray-500 border-b-4 border-transparent'
            }
          `}
        >
          Moves
        </button>
      </nav>

      {activeTab === 'status' && <PokemonStatus />}
      {activeTab === 'moves' && <PokemonMoves />}
    </div>
  )
}
