import { create } from 'zustand'
import type { PokemonDetail } from '../types/pokemon'

interface PokemonStore {
  selectedSprite: string | null
  sprites: PokemonDetail['sprites'] | null
  setSelectedSprite: (sprite: string) => void
  setPokemonSprites: (sprites: PokemonDetail['sprites']) => void
}

export const usePokemonStore = create<PokemonStore>(set => ({
  selectedSprite: null,
  sprites: null,
  setSelectedSprite: (sprite: string) => set({ selectedSprite: sprite }),
  setPokemonSprites: (sprites: PokemonDetail['sprites']) =>
    set({ sprites, selectedSprite: sprites?.front_default ?? null }),
}))
