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
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-green-600 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
            clipRule="evenodd"
          />
        </svg>
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

export default PokemonMoves
