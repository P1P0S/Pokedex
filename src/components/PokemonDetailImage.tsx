import { usePokemonSpriteStore } from '../store/pokemonStore'
import type { PokemonDetailProps, SpriteVariant } from '../types/pokemon'

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
        aria-label={`Selecionar sprite ${spriteType}`}
        className={`w-16 h-16 border-2 rounded-xl flex items-center justify-center ${
          isSelected
            ? 'border-green-500 bg-green-100'
            : 'border-white bg-transparent'
        }`}
      >
        <img
          src={spriteUrl}
          alt={`Sprite ${spriteType}`}
          className="object-contain w-full h-full cursor-pointer"
        />
      </button>
    )
  }

  return (
    <div className="relative w-full bg-gradient-to-br from-[#a8dadc] to-[#457b9d]">
      <div className="flex p-8 flex-col items-center relative">
        <span className="absolute bg-white/90 w-full h-1 top-50" />
        <img
          src={selectedSprite || undefined}
          alt="Pokémon"
          className="mt-4 w-64 h-64 object-contain z-10 transition-transform transform hover:-translate-y-1"
        />
      </div>
      <div className="flex flex-wrap gap-2 justify-center items-center p-4 z-20">
        {spriteVariants.map(renderSpriteButton)}
      </div>
    </div>
  )
}
