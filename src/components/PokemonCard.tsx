import { Link } from 'react-router-dom'
import { typeColors } from '../utils/pokemonTypeColors'

interface PokemonCardProps {
  id: number
  name: string
  types: string[]
  sprite: string | null
}

export function PokemonCard({ id, name, types, sprite }: PokemonCardProps) {
  const mainType = types[0] || 'normal'
  const backgroundClass = typeColors[mainType]?.card ?? typeColors.normal.card

  return (
    <Link to={`/pokemon/${name}`}>
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
          {types.map(type => {
            const pillClass = typeColors[type]?.pill ?? typeColors.normal.pill
            return (
              <span
                key={type}
                className={`text-xs font-semibold px-2 py-1 ${pillClass} rounded-full capitalize`}
              >
                {type}
              </span>
            )
          })}
        </div>
      </div>
    </Link>
  )
}
