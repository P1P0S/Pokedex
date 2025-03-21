import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PokemonSpriteStore } from '../types/pokemon'

export const usePokemonSpriteStore = create<PokemonSpriteStore>()(
  persist(
    (set, get) => ({
      selectedOther: null,
      selectedVariant: 'front_default',
      selectedGeneration: null,
      selectedGame: null,

      setOther: other => set({ selectedOther: other }),
      setVariant: variant => set({ selectedVariant: variant }),
      setGeneration: generation => set({ selectedGeneration: generation }),
      setGame: game => set({ selectedGame: game }),

      getSpriteUrl: sprites => {
        if (!sprites) return null

        const {
          selectedOther,
          selectedGeneration,
          selectedGame,
          selectedVariant,
        } = get()

        const otherKey: string | null = selectedOther || selectedGeneration

        if (otherKey && sprites.other && otherKey in sprites.other) {
          const spriteOther =
            sprites.other[otherKey as keyof typeof sprites.other]

          const url =
            (typeof spriteOther === 'object' && spriteOther !== null
              ? spriteOther[selectedVariant as keyof typeof spriteOther]
              : null) ||
            spriteOther?.front_default ||
            sprites.front_default

          return typeof url === 'string' ? url : null
        }

        if (
          selectedGeneration &&
          selectedGame &&
          sprites.versions &&
          selectedGeneration in sprites.versions
        ) {
          const genSprites = sprites.versions[selectedGeneration]

          if (genSprites) {
            let gameSprites =
              genSprites[selectedGame as keyof typeof genSprites] || null

            if (
              selectedGeneration === 'generation-v' &&
              selectedGame === 'animated'
            ) {
              gameSprites = genSprites['black-white']?.animated || gameSprites
            }

            const url =
              gameSprites?.[selectedVariant as keyof typeof gameSprites] ||
              gameSprites?.front_default ||
              sprites.front_default

            return typeof url === 'string' ? url : null
          }
        }

        return typeof sprites.front_default === 'string'
          ? sprites.front_default
          : null
      },
    }),
    { name: 'pokemon-sprite-settings' }
  )
)
