import { usePokemonSpriteStore } from '../store/pokemonStore'
import type { SpriteVariant } from '../types/pokemon'

interface PokemonDetailProps {
  sprites: {
    front_default?: string | null
    back_default?: string | null
    front_shiny?: string | null
    back_shiny?: string | null
    versions?: Record<
      string,
      Record<
        string,
        Partial<{
          front_default: string | null
          back_default: string | null
          front_shiny: string | null
          back_shiny: string | null
        }>
      >
    >
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
  const {
    selectedOther,
    selectedGeneration,
    selectedVariant,
    selectedGame,
    setVariant,
    getSpriteUrl,
  } = usePokemonSpriteStore()

  const selectedSprite = getSpriteUrl({
    ...sprites,
    other: sprites.other ?? {},
  })

  const spriteVariants: SpriteVariant[] = [
    'front_default',
    'back_default',
    'front_shiny',
    'back_shiny',
  ]

  function getSpriteUrlForVariant(variant: SpriteVariant) {
    if (selectedOther) {
      return sprites.other?.[selectedOther]?.[variant] ?? null
    }

    if (selectedGeneration && selectedGame) {
      return (
        sprites.versions?.[selectedGeneration]?.[selectedGame]?.[variant] ??
        null
      )
    }

    return sprites[variant] ?? null
  }

  function renderSpriteButton(spriteType: SpriteVariant) {
    const spriteUrl = getSpriteUrlForVariant(spriteType)

    if (!spriteUrl) {
      return
    }

    const isSelected = selectedVariant === spriteType

    return (
      <button
        key={spriteType}
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
        {spriteVariants.map(renderSpriteButton)}
      </div>
    </div>
  )
}
