import { usePokemonStore } from '../store/pokemonStore'
import type { PokemonCardData } from '../utils/parsePokemonFrontPage'

type PokemonMainImageProps = {
  data: PokemonCardData
}

export function PokemonMainImage({ data }: PokemonMainImageProps) {
  const { selectedSprite } = usePokemonStore()

  return (
    <div className="w-full bg-slate-300">
      <div className="flex p-8 flex-col items-center">
        <img
          src={selectedSprite || data.sprite?.front_default || ''}
          alt={data.name}
          className="mt-4 w-48 h-48"
        />
      </div>
    </div>
  )
}
