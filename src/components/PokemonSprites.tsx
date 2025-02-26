import { usePokemonStore } from '../store/pokemonStore'

export function PokemonSprites() {
  const { selectedSprite, setSelectedSprite, sprites } = usePokemonStore()

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
    <div className="w-full">
      <div className="flex flex-row gap-2 justify-center items-center p-4">
        {renderSpriteButton(sprites?.front_default)}
        {renderSpriteButton(sprites?.back_default)}
        {renderSpriteButton(sprites?.front_shiny)}
        {renderSpriteButton(sprites?.back_shiny)}
      </div>
    </div>
  )
}
