import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PokemonDetail } from '../types/pokemon'

export type SpriteOther =
  | 'showdown'
  | 'home'
  | 'dream_world'
  | 'official-artwork'

export type SpriteVariant =
  | 'front_default'
  | 'back_default'
  | 'front_shiny'
  | 'back_shiny'

interface PokemonSpriteStore {
  selectedOther: SpriteOther
  selectedVariant: SpriteVariant

  setGeneration: (generation: SpriteOther) => void
  setVariant: (variant: SpriteVariant) => void

  getSpriteUrl: (sprites: PokemonDetail['sprites'] | null) => string | null
}

export const usePokemonSpriteStore = create<PokemonSpriteStore>()(
  persist(
    (set, get) => ({
      selectedOther: 'official-artwork',
      selectedVariant: 'front_default',

      setGeneration: generation => set({ selectedOther: generation }),
      setVariant: variant => set({ selectedVariant: variant }),

      getSpriteUrl: sprites => {
        if (!sprites) return null

        const { selectedOther, selectedVariant } = get()

        const otherSprites =
          sprites.other?.[selectedOther as keyof typeof sprites.other]

        return (
          otherSprites?.[selectedVariant] ||
          otherSprites?.front_default ||
          sprites.front_default
        )
      },
    }),
    {
      name: 'pokemon-sprite-settings',
    }
  )
)
