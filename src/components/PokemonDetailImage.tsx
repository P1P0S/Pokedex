import { useEffect, useState } from 'react'

interface PokemonDetailProps {
  sprites: {
    front_default?: string | null
    back_default?: string | null
    front_shiny?: string | null
    back_shiny?: string | null
  }
}

export function PokemonDetailImage({ sprites }: PokemonDetailProps) {
  const [selectedSprite, setSelectedSprite] = useState<string | null>(null)

  useEffect(() => {
    const initialSprite =
      sprites.front_default ||
      sprites.back_default ||
      sprites.front_shiny ||
      sprites.back_shiny ||
      null
    setSelectedSprite(initialSprite)
  }, [sprites])

  function renderSpriteButton(spriteUrl?: string | null) {
    if (!spriteUrl) {
      return (
        <div className="w-16 h-16 border-4 border-white rounded flex items-center justify-center select-none">
          (x)
        </div>
      )
    }

    const isSelected = selectedSprite === spriteUrl

    return (
      <button
        type="button"
        onClick={() => setSelectedSprite(spriteUrl)}
        className={`w-16 h-16 border-4 rounded flex items-center justify-center ${
          isSelected
            ? 'border-green-500 bg-green-100'
            : 'border-white bg-transparent'
        }`}
      >
        <img
          src={spriteUrl}
          alt="Pokémon Sprite"
          className="object-contain w-full h-full cursor-pointer"
        />
      </button>
    )
  }

  return (
    <div className="w-full bg-slate-300">
      <div className="flex p-8 flex-col items-center">
        <img
          src={selectedSprite || sprites?.front_default || undefined}
          alt="Pokémon"
          className="mt-4 w-48 h-48"
        />
      </div>
      <div className="flex flex-row gap-2 justify-center items-center p-4">
        {renderSpriteButton(sprites.front_default)}
        {renderSpriteButton(sprites.back_default)}
        {renderSpriteButton(sprites.front_shiny)}
        {renderSpriteButton(sprites.back_shiny)}
      </div>
    </div>
  )
}
