interface PokemonCardProps {
  id: number
  name: string
  types: string[]
  sprite: string | null
}

const typeColors: Record<string, string> = {
  grass: 'bg-gradient-to-r from-green-400 to-green-600',
  poison: 'bg-gradient-to-r from-purple-400 to-purple-600',
  fire: 'bg-gradient-to-r from-orange-400 to-orange-600',
  water: 'bg-gradient-to-r from-blue-400 to-blue-600',
  bug: 'bg-gradient-to-r from-lime-400 to-lime-600',
  normal: 'bg-gradient-to-r from-gray-400 to-gray-600',
  flying: 'bg-gradient-to-r from-sky-400 to-sky-600',
}

export function PokemonCard({ id, name, types, sprite }: PokemonCardProps) {
  const mainType = types[0] || 'normal'
  const backgroundClass = typeColors[mainType] || typeColors.normal

  return (
    <div
      className={`rounded-lg p-4 text-white flex flex-col items-center justify-center shadow-md ${backgroundClass}`}
      style={{ minWidth: '180px' }}
    >
      <p className="text-sm font-bold">#{id}</p>
      {sprite ? (
        <img
          src={sprite}
          alt={name}
          className="w-24 h-24 object-contain mb-2"
        />
      ) : (
        <div className="w-24 h-24 bg-gray-200 mb-2 flex items-center justify-center text-black">
          No image
        </div>
      )}
      <h3 className="text-lg font-bold capitalize">{name}</h3>
      <div className="flex space-x-2 mt-2">
        {types.map(type => (
          <span
            key={type}
            className="text-xs font-semibold px-2 py-1 bg-black bg-opacity-30 rounded-full capitalize"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  )
}
