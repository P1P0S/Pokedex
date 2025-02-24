import type { PokemonCardData } from '../utils/pokemonParser'

type PokemonMainImageProps = {
  data: PokemonCardData
}

export function PokemonMainImage({ data }: PokemonMainImageProps) {
  return (
    <div className="w-full bg-slate-300">
      <div className="flex flex-col items-center">
        <img
          src={data?.sprite?.front_default || ''}
          alt={data?.name}
          className="mt-4 w-48 h-48"
        />
      </div>
    </div>
  )
}
