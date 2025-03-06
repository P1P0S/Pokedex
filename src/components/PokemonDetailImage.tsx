import { usePokemonSpriteStore } from '../store/pokemonStore'
import type { PokemonDetailProps, SpriteVariant } from '../types/pokemon'

interface PokemonBgProps {
  pillClass: string
  bgClass: string
}

export function PokemonDetailImage({
  sprites,
  pillClass,
  bgClass,
}: PokemonDetailProps & PokemonBgProps) {
  const {
    selectedOther,
    selectedGeneration,
    selectedVariant,
    selectedGame,
    setVariant,
  } = usePokemonSpriteStore()

  const selectedSprite = getSpriteUrlForVariant(selectedVariant)

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

    const availableGeneration =
      selectedGeneration && typeof selectedGeneration === 'string'
        ? selectedGeneration
        : 'official-artwork'

    const availableGame =
      selectedGame && typeof selectedGame === 'string' ? selectedGame : null

    let spriteUrl =
      availableGame &&
      sprites.versions?.[availableGeneration]?.[availableGame]?.[variant]

    if (!spriteUrl) {
      spriteUrl = sprites[variant] ?? null
    }

    if (selectedGame === 'animated') {
      spriteUrl =
        sprites.versions?.[availableGeneration]?.['black-white']?.[
          selectedGame
        ]?.[variant] ??
        sprites.other?.['official-artwork']?.[variant] ??
        null
    }

    return spriteUrl
  }

  function renderSpriteButton(spriteType: SpriteVariant) {
    const spriteUrl = getSpriteUrlForVariant(spriteType)
    const isSelected = selectedVariant === spriteType

    if (!spriteUrl) return null

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
    <div
      className={`w-full bg-gradient-to-b from-[${bgClass}] to-[${pillClass}]`}
    >
      <div className="flex p-8 flex-col items-center relative">
        <img
          src={selectedSprite || undefined}
          alt="Pokémon"
          className="mt-4 w-64 h-64 object-contain z-10 transition-transform transform hover:-translate-y-1"
        />
      </div>
      <div className="flex flex-row gap-2 justify-center items-center p-4 z-20">
        {spriteVariants.map(renderSpriteButton)}
      </div>
    </div>
  )
}
