import { Lightning, Target } from '@phosphor-icons/react'
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

  const mainType = data?.types[0]?.type.name || 'normal'
  const backgroundClass = typeColors[mainType]?.card ?? typeColors.normal.card
  const pillClass = typeColors[mainType]?.pill ?? typeColors.normal.pill

  return (
    <div className="p-5 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl gap-2 font-bold mb-6 text-green-600 flex items-center pb-3">
        <Lightning weight="fill" size={24} />
        Pokémon Moves
      </h2>

      <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100 pr-2 rounded-md shadow-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-separate border-spacing-0">
            <thead className="sticky top-0">
              <tr
                className={`bg-gradient-to-bl from-[${backgroundClass} to-[${pillClass}]] text-white`}
              >
                <th className="px-4 py-3 text-left font-bold">PP</th>
                <th className="px-4 py-3 text-left font-bold">Move</th>
                <th className="px-4 py-3 text-left font-bold">Type</th>
                <th className="px-4 py-3 text-left font-bold">Category</th>
                <th className="px-4 py-3 text-left font-bold">Power</th>
                <th className="px-4 py-3 text-left font-bold">Accuracy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.moves.map(({ move }) => {
                const {
                  data: moveDetails,
                  isLoading: moveLoading,
                  error: moveError,
                } = usePokemonDetailMove(move.name)

                if (moveLoading) {
                  return (
                    <tr key={move.name}>
                      <td
                        colSpan={6}
                        className="px-4 py-3 text-center text-gray-500"
                      >
                        Loading details...
                      </td>
                    </tr>
                  )
                }

                if (moveError || !moveDetails) {
                  return (
                    <tr key={move.name}>
                      <td
                        colSpan={6}
                        className="px-4 py-3 text-center text-red-500"
                      >
                        Error loading move details
                      </td>
                    </tr>
                  )
                }

                const moveType = moveDetails.type?.name || 'normal'
                const movePillClass =
                  typeColors[moveType]?.pill ?? typeColors.normal.pill

                return (
                  <tr
                    key={move.name}
                    className="transition-all duration-200 hover:bg-blue-50 even:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-center font-bold text-amber-600">
                      {moveDetails.pp}
                    </td>
                    <td className="px-4 py-3 font-bold text-gray-800">
                      {formatMoveName(move.name)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex ${movePillClass} items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-gray-100 uppercase`}
                      >
                        {moveDetails.type?.name}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex ${moveStatusColors[moveDetails.damage_class?.name || 'normal']?.pill || 'bg-gray-500'} items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-gray-100 uppercase`}
                      >
                        {moveDetails.damage_class?.name || 'No Status'}
                      </span>
                    </td>
                    <td className="px-4 flex flex-row items-center gap-1 py-3 font-bold text-orange-600">
                      {moveDetails.power || '—'}
                    </td>
                    <td className="px-4 py-3 font-bold text-green-600">
                      {moveDetails.accuracy || '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
