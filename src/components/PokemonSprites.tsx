import { usePokemonStore } from '../store/pokemonStore'
import type { PokemonCardData } from '../utils/pokemonParser'

interface PokemonSpritesProps {
  data: PokemonCardData
}

export function PokemonSprites({ data }: PokemonSpritesProps) {
  const { selectedSprite, setSelectedSprite } = usePokemonStore()

  function renderSpriteButton(spriteUrl?: string | null) {
    if (!spriteUrl) {
      return (
        <div className="w-16 h-16 border-4 border-white rounded flex items-center justify-center">
          (x)
        </div>
      )
    }

    const isSelected = selectedSprite === spriteUrl

    return (
      <button
        type="button"
        onClick={() => setSelectedSprite(spriteUrl)}
        className={`w-16 h-16 border-4 rounded flex items-center justify-center
          ${isSelected ? 'border-green-500 bg-green-100' : 'border-white bg-white'}`}
      >
        <img
          src={spriteUrl}
          alt={spriteUrl || 'Imagem de um pokémon'}
          className="object-contain w-full h-full cursor-pointer"
        />
      </button>
    )
  }

  return (
    <div className="w-full">
      <div className="flex flex-row gap-2 justify-center items-center p-4">
        {renderSpriteButton(data.sprite?.front_default)}
        {renderSpriteButton(data.sprite?.back_default)}
        {renderSpriteButton(data.sprite?.front_shiny)}
        {renderSpriteButton(data.sprite?.back_shiny)}
      </div>
    </div>
  )
}
