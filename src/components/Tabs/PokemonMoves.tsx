import { Lightning } from '@phosphor-icons/react'
import { usePokemonDetail } from '../../hooks/usePokemonDetail'
import { usePokemonDetailMove } from '../../hooks/usePokemonMoves'
import { moveStatusColors, typeColors } from '../../utils/pokemonTypeColors'

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
    <div className="p-3 sm:p-5 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg sm:text-xl gap-1 sm:gap-2 font-bold mb-4 sm:mb-6 text-green-600 flex items-center pb-2 sm:pb-3 border-b border-gray-200">
        <Lightning weight="fill" size={20} className="sm:w-6 sm:h-6" />
        Pokémon Moves
      </h2>

      <div className="max-h-80 sm:max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100 pr-1 rounded-md">
        {data.moves.map(({ move }) => {
          const {
            data: moveDetails,
            isLoading: moveLoading,
            error: moveError,
          } = usePokemonDetailMove(move.name)

          if (moveLoading) {
            return (
              <div key={move.name} className="p-3 text-center text-gray-500">
                Loading details...
              </div>
            )
          }

          if (moveError || !moveDetails) {
            return (
              <div key={move.name} className="p-3 text-center text-red-500">
                Error loading move details
              </div>
            )
          }

          const moveType = moveDetails.type?.name || 'normal'
          const movePillClass =
            typeColors[moveType]?.pill ?? typeColors.normal.pill

          return (
            <div
              key={move.name}
              className="mb-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100"
            >
              <div className="flex justify-between items-center px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-100">
                <h3 className="font-bold text-sm sm:text-base text-gray-800">
                  {formatMoveName(move.name)}
                </h3>
                <span className="px-2 py-0.5 sm:py-1 bg-amber-100 text-amber-600 rounded-full text-xs sm:text-sm font-bold">
                  PP {moveDetails.pp}
                </span>
              </div>

              <div className="px-2 sm:px-4 py-2 sm:py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`${movePillClass} px-2 py-0.5 sm:py-1 rounded-md text-xs font-medium text-gray-100 uppercase`}
                  >
                    {moveDetails.type?.name || 'Normal'}
                  </span>

                  <span
                    className={`${moveStatusColors[moveDetails.damage_class?.name || 'normal']?.pill || 'bg-gray-500'} px-2 py-0.5 sm:py-1 rounded-md text-xs font-medium text-gray-100 uppercase`}
                  >
                    {moveDetails.damage_class?.name || 'Status'}
                  </span>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 sm:ml-auto mt-2 sm:mt-0">
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-orange-600 text-base sm:text-lg">
                      {moveDetails.power || '—'}
                    </span>
                    <span className="text-xs text-gray-500">Power</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="font-bold text-green-600 text-base sm:text-lg">
                      {moveDetails.accuracy || '—'}
                    </span>
                    <span className="text-xs text-gray-500">Accuracy</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
