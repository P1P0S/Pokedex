import { create } from 'zustand'

interface PokemonStore {
  selectedSprite: string
  setSelectedSprite: (sprite: string) => void
}

export const usePokemonStore = create<PokemonStore>(set => ({
  selectedSprite: '',
  setSelectedSprite: (sprite: string) => set({ selectedSprite: sprite }),
}))
