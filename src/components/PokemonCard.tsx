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
        className={`relative rounded-xl p-4 text-white flex flex-col items-center 
          shadow-md transition-transform transform hover:-translate-y-1 
          hover:shadow-lg ${backgroundClass} w-44 overflow-hidden border-white/10`}
      >
        <p className="text-sm font-bold">{`#${String(id).padStart(4, '0')}`}</p>

        <img
          src={spriteUrl || undefined}
          alt={name}
          className="w-24 h-24 object-contain mb-2 z-10 
            transition-transform duration-200 hover:scale-105"
        />

        <div className="absolute h-28 bottom-0 w-full bg-white/90 rounded-t-xl p-3 flex flex-col items-center" />
        <h3
          className="z-10 text-lg font-bold capitalize text-gray-800 
            overflow-hidden text-ellipsis whitespace-nowrap max-w-full px-2 text-center"
        >
          {name.replace('-', ' ')}
        </h3>
        <div className="z-10 flex gap-1 mt-2">
          {types.map(({ type }) => {
            const pillClass =
              typeColors[type.name]?.pill ?? typeColors.normal.pill
            return (
              <span
                key={type.name}
                className={`text-xs font-semibold px-2 py-1 ${pillClass} 
                  rounded-full uppercase`}
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
