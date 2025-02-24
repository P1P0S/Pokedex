import type { PokemonCardData } from '../utils/pokemonParser'

type PokemonSpritesProps = {
  data: PokemonCardData
}

export function PokemonSprites({ data }: PokemonSpritesProps) {
  return (
    <div className="w-full bg-slate-300">
      <div className="flex flex-row gap-2 justify-center items-center p-4">
        <button
          type="button"
          className="w-16 h-16 border-4 border-green-500 rounded flex items-center justify-center"
        >
          {data?.sprite?.front_default ? (
            <img
              src={data.sprite.front_default}
              alt={data.sprite.front_default || 'Imagem de um pokémon'}
              className="object-contain w-full h-full"
            />
          ) : (
            <div className="bg-gray-200 text-gray-500 flex items-center justify-center w-full h-full">
              (x)
            </div>
          )}
        </button>

        <div className="w-16 h-16 border-4 border-white rounded flex items-center justify-center">
          {data?.sprite?.back_default ? (
            <img
              src={data.sprite.back_default}
              alt={data.sprite.back_default || 'Imagem de um pokémon'}
              className="object-contain w-full h-full"
            />
          ) : (
            <div className="bg-gray-200 text-gray-500 flex items-center justify-center w-full h-full">
              (x)
            </div>
          )}
        </div>

        <div className="w-16 h-16 border-4 border-white rounded flex items-center justify-center">
          {data?.sprite?.front_shiny ? (
            <img
              src={data.sprite.front_shiny}
              alt={data.sprite.front_shiny || 'Imagem de um pokémon'}
              className="object-contain w-full h-full"
            />
          ) : (
            <div className="bg-gray-200 text-gray-500 flex items-center justify-center w-full h-full">
              (x)
            </div>
          )}
        </div>

        <div className="w-16 h-16 border-4 border-white rounded flex items-center justify-center">
          {data?.sprite?.back_shiny ? (
            <img
              src={data.sprite.back_shiny}
              alt={data.sprite.back_shiny || 'Imagem de um pokémon'}
              className="object-contain w-full h-full"
            />
          ) : (
            <div className="bg-gray-200 text-gray-500 flex items-center justify-center w-full h-full">
              (x)
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
