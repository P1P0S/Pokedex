import { Lightning } from '@phosphor-icons/react'
import { usePokemonDetail } from '../../hooks/usePokemonDetail'

export function PokemonMoves() {
  const { data, isLoading, error } = usePokemonDetail()

  if (isLoading)
    return <div className="p-4 text-center text-gray-500">Loading moves...</div>
  if (error || !data) {
    return (
      <div className="p-4 text-center text-red-500">
        Error while fetching moves
      </div>
    )
  }

  const formatMoveName = (name: string): string => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-xl gap-2 font-bold mb-4 text-green-600 flex items-center">
        <Lightning weight="fill" />
        Pokémon Moves
      </h2>

      <div className="max-h-60 overflow-y-auto pr-2 rounded-md">
        <div className="grid grid-cols-2 gap-2">
          {data.moves.map(({ move }) => (
            <div
              key={move.name}
              className={
                'px-3 py-2 rounded-md text-sm font-medium border transition-all duration-200 hover:shadow-md bg-gray-100 text-gray-800 border-gray-200'
              }
            >
              {formatMoveName(move.name)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
