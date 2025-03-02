export interface Pokemon {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

export interface PokemonDetail {
  id: number
  name: string
  types: Array<{
    slot: number
    type: { name: string; url: string }
  }>
  sprites: {
    other: {
      showdown: {
        front_default: string | null
        back_default?: string | null
        front_shiny?: string | null
        back_shiny?: string | null
      }
    }
    front_default: string | null
    back_default: string | null
    front_shiny: string | null
    back_shiny: string | null
    [key: string]: string | null
  }
  base_experience: number
  stats: Array<{ base_stat: number; stat: { name: string; url: string } }>
  height: number
  weight: number
  abilities: Array<{ ability: { name: string } }>
  cries: {
    latest: string
    legacy: string
  }
  moves: Array<{ move: { name: string } }>
}

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

export type SpriteGeneration =
  | 'generation-i'
  | 'generation-ii'
  | 'generation-iii'
  | 'generation-iv'
  | 'generation-v'
  | 'generation-vi'
  | 'generation-vii'
  | 'generation-viii'

export type SpriteGame =
  | 'red-blue'
  | 'yellow'
  | 'gold'
  | 'silver'
  | 'crystal'
  | 'ruby-sapphire'
  | 'emerald'
  | 'firered-leafgreen'
  | 'diamond-pearl'
  | 'heartgold-soulsilver'
  | 'black-white'
  | 'animated'
  | 'omegaruby-alphasapphire'
  | 'x-y'
  | 'x-y'
  | 'ultra-sun-ultra-moon'
  | 'icons'

interface PokemonSpriteStore {
  selectedOther: SpriteOther | null
  selectedVariant: SpriteVariant
  selectedGeneration: SpriteGeneration | null
  selectedGame: SpriteGame | null

  setOther: (other: SpriteOther | null) => void
  setVariant: (variant: SpriteVariant) => void
  setGeneration: (generation: SpriteGeneration | null) => void
  setGame: (game: SpriteGame | null) => void

  getSpriteUrl: (sprites: PokemonDetail['sprites'] | null) => string | null
}

interface PokemonDetailProps {
  sprites: {
    front_default?: string | null
    back_default?: string | null
    front_shiny?: string | null
    back_shiny?: string | null
    versions?: Record<
      string,
      Record<
        string,
        Partial<{
          front_default: string | null
          back_default: string | null
          front_shiny: string | null
          back_shiny: string | null
        }>
      >
    >
    other?: Record<
      string,
      Partial<{
        front_default: string | null
        back_default: string | null
        front_shiny: string | null
        back_shiny: string | null
      }>
    >
  }
}
