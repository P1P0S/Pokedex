import { create } from 'zustand'

interface PokemonStore {
  selectedSprite: string
  setSelectedSprite: (sprite: string) => void
}

type TabType = 'status' | 'moves'

export const usePokemonStore = create<PokemonStore>(set => ({
  selectedSprite: '',
  setSelectedSprite: (sprite: string) => set({ selectedSprite: sprite }),
}))

interface TabStore {
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
}

export const useTabStore = create<TabStore>(set => ({
  activeTab: 'status',
  setActiveTab: tab => set({ activeTab: tab }),
}))
