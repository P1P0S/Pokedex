import {
  type SpriteVariant,
  usePokemonSpriteStore,
} from '../store/pokemonStore'

interface PokemonDetailProps {
  sprites: {
    front_default?: string | null
    back_default?: string | null
    front_shiny?: string | null
    back_shiny?: string | null
    other?: Record<
      string,
      Partial<{
        front_default: string | null
        back_default: string | null
        front_shiny: string | null
        back_shiny: string | null
      }>
    >
  }
}

export function PokemonDetailImage({ sprites }: PokemonDetailProps) {
  const { selectedOther, selectedVariant, setVariant, getSpriteUrl } =
    usePokemonSpriteStore()

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const selectedSprite = getSpriteUrl(sprites as any)

  function renderSpriteButton(
    spriteType: SpriteVariant,
    spriteUrl?: string | null
  ) {
    if (!spriteUrl) {
      return (
        <div className="w-16 h-16 border-4 border-white rounded flex items-center justify-center select-none">
          (x)
        </div>
      )
    }

    const isSelected = selectedVariant === spriteType

    return (
      <button
        type="button"
        onClick={() => setVariant(spriteType)}
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
          src={selectedSprite || undefined}
          alt="Pokémon"
          className="mt-4 w-48 h-48"
        />
      </div>
      <div className="flex flex-row gap-2 justify-center items-center p-4">
        {renderSpriteButton(
          'front_default',
          selectedOther
            ? sprites.other?.[selectedOther]?.front_default
            : sprites.front_default
        )}
        {renderSpriteButton(
          'back_default',
          selectedOther
            ? sprites.other?.[selectedOther]?.back_default
            : sprites.back_default
        )}
        {renderSpriteButton(
          'front_shiny',
          selectedOther
            ? sprites.other?.[selectedOther]?.front_shiny
            : sprites.front_shiny
        )}
        {renderSpriteButton(
          'back_shiny',
          selectedOther
            ? sprites.other?.[selectedOther]?.back_shiny
            : sprites.back_shiny
        )}
      </div>
    </div>
  )
}
