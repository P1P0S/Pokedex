import { Gear } from '@phosphor-icons/react'
import {
  type SpriteOther,
  type SpriteVariant,
  usePokemonSpriteStore,
} from '../store/pokemonStore'

export function PokemonSpriteSelect() {
  const { selectedOther, selectedVariant, setOther, setVariant } =
    usePokemonSpriteStore()

  const generations: { value: SpriteOther; label: string }[] = [
    { value: 'official-artwork', label: 'Official Artwork' },
    { value: 'showdown', label: 'Showdown Sprites' },
    { value: 'home', label: 'HOME' },
    { value: 'dream_world', label: 'Dream World' },
  ]

  const variants: { value: SpriteVariant; label: string }[] = [
    { value: 'front_default', label: 'Front Default' },
    { value: 'back_default', label: 'Back Default' },
    { value: 'front_shiny', label: 'Front Shiny' },
    { value: 'back_shiny', label: 'Back Shiny' },
  ]

  // Determine if variant selection should be disabled
  const isVariantDisabled =
    selectedOther === 'dream_world' ||
    (selectedOther === 'official-artwork' &&
      !['front_default', 'front_shiny'].includes(selectedVariant))

  return (
    <div className="w-full max-w-md mx-auto bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex items-center mb-3">
        <Gear size={22} className="text-blue-600 mr-2" />
        <h3 className="text-lg font-bold text-gray-800">Sprite Settings</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="generation"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Sprite Generation
          </label>
          <select
            id="generation"
            value={selectedOther}
            onChange={e => setOther(e.target.value as SpriteOther)}
            className="w-full px-3 py-2 bg-white border border-gray-300 
            rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
            focus:border-blue-500"
          >
            {generations.map(gen => (
              <option key={gen.value} value={gen.value}>
                {gen.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="variant"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Sprite Variant
          </label>
          <select
            id="variant"
            value={selectedVariant}
            onChange={e => setVariant(e.target.value as SpriteVariant)}
            disabled={isVariantDisabled}
            className="w-full px-3 py-2 bg-white border border-gray-300 
              rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
          >
            {variants.map(variant => {
              // For official-artwork, only show front_default and front_shiny
              if (
                selectedOther === 'official-artwork' &&
                !['front_default', 'front_shiny'].includes(variant.value)
              ) {
                return null
              }

              // For dream_world, only show front_default
              if (
                selectedOther === 'dream_world' &&
                variant.value !== 'front_default'
              ) {
                return null
              }

              // For home, only show front_default and front_shiny
              if (
                selectedOther === 'home' &&
                !['front_default', 'front_shiny'].includes(variant.value)
              ) {
                return null
              }

              return (
                <option key={variant.value} value={variant.value}>
                  {variant.label}
                </option>
              )
            })}
          </select>
        </div>
      </div>
    </div>
  )
}
