import { Link } from 'react-router-dom'
import { usePokemonSpriteStore } from '../store/pokemonStore'
import type { PokemonDetail } from '../types/pokemon'
import { typeColors } from '../utils/pokemonTypeColors'

export function PokemonCard({ id, name, types, sprites }: PokemonDetail) {
  const mainType = types[0]?.type.name || 'normal'
  const backgroundClass = typeColors[mainType]?.card ?? typeColors.normal.card

  const { getSpriteUrl } = usePokemonSpriteStore()
  const spriteUrl = getSpriteUrl(sprites)

  return (
    <Link to={`/pokemon/${name}`}>
      <div
        className={`rounded-lg p-4 text-white flex flex-col items-center justify-center 
            shadow-md transition-transform transform hover:-translate-y-1
            hover:shadow-lg ${backgroundClass}`}
        style={{ minWidth: '180px' }}
      >
        <p className="text-sm font-bold">{`#${String(id).padStart(4, '0')}`}</p>

        {spriteUrl ? (
          <img
            src={spriteUrl}
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
          {types.map(({ type }) => {
            const pillClass =
              typeColors[type.name]?.pill ?? typeColors.normal.pill
            return (
              <span
                key={type.name}
                className={`text-xs font-semibold px-2 py-1 ${pillClass} rounded-full capitalize`}
              >
                {type.name}
              </span>
            )
          })}
        </div>
      </div>
    </Link>
  )
}
