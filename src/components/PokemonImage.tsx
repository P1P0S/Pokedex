import { usePokemonStore } from '../store/pokemonStore'

export function PokemonMainImage() {
  const { selectedSprite, sprites } = usePokemonStore()

  return (
    <div className="w-full bg-slate-300">
      <div className="flex p-8 flex-col items-center">
        <img
          src={selectedSprite || sprites?.front_default || undefined}
          alt="Pokémon"
          className="mt-4 w-48 h-48"
        />
      </div>
    </div>
  )
}
