import { create } from 'zustand'
import type { PokemonDetailProps } from '../utils/parsePokemonDetailPage'

interface PokemonStore {
  selectedSprite: string | null
  sprites: PokemonDetailProps['sprite'] | null
  setSelectedSprite: (sprite: string) => void
  setPokemonSprites: (sprites: PokemonDetailProps['sprite']) => void
}

export const usePokemonStore = create<PokemonStore>(set => ({
  selectedSprite: null,
  sprites: null,
  setSelectedSprite: (sprite: string) => set({ selectedSprite: sprite }),
  setPokemonSprites: (sprites: PokemonDetailProps['sprite']) =>
    set({ sprites, selectedSprite: sprites?.front_default ?? null }),
}))
