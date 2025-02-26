import { create } from 'zustand'
import type { PokemonDetailProps } from '../utils/parsePokemonDetailPage'

interface PokemonStore {
  selectedSprite: string | null
  sprites: PokemonDetailProps['sprite'] | null
  setSelectedSprite: (sprite: string) => void
  setPokemonSprites: (sprites: PokemonDetailProps['sprite']) => void
}

type TabType = 'stats' | 'moves'

interface TabStore {
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
}

export const usePokemonStore = create<PokemonStore>(set => ({
  selectedSprite: null,
  sprites: null,
  setSelectedSprite: (sprite: string) => set({ selectedSprite: sprite }),
  setPokemonSprites: (sprites: PokemonDetailProps['sprite']) =>
    set({ sprites, selectedSprite: sprites?.front_default ?? null }),
}))

export const useTabStore = create<TabStore>(set => ({
  activeTab: 'stats',
  setActiveTab: tab => set({ activeTab: tab }),
}))
