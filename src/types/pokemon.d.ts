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
  sprites: PokemonSprites
  base_experience: number
  stats: Array<{ base_stat: number; stat: { name: string; url: string } }>
  height: number
  weight: number
  abilities: Array<{ ability: { name: string }; is_hidden: boolean }>
  cries: {
    latest: string
    legacy: string
  }
  moves: Array<{ move: { name: string } }>
}

export interface PokemonMoveDetails {
  type?: { name: string }
  damage_class?: { name: string }
  power?: number | null
  accuracy?: number | null
  pp?: number | null
}

export type PokemonSprites = {
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
        animated?: Record<string, string | null>
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

export type PokemonSpecies = {
  base_happiness?: number
  capture_rate?: number
  name?: string
  evolution_chain?: {
    url?: string
  }
  evolves_from_species?: {
    name?: string
    url?: string
  }
  flavor_text_entries?: Array<{
    flavor_text?: string
    language?: {
      name?: string
    }
  }>
  generation?: {
    name?: string
  }
  growth_rate?: {
    name?: string
  }
  habitat?: {
    name?: string
  }
  evolution_chain?: {
    url?: string
  }
}

export type PokemonChain = {
  evolution_details: never[]
  id: number
  species: { name: string; url: string }
  evolves_to: EvolutionNode[]
  chain: Array
}

export type EvolutionDetail = {
  trigger?: { name: string }
  min_level?: number | null
  item?: { name: string }
  held_item?: { name: string }
  min_happiness?: number | null
  min_beauty?: number | null
  min_affection?: number | null
  location?: { name: string }
  known_move?: { name: string }
  known_move_type?: { name: string }
  time_of_day?: string
  gender?: number | null
  trade_species?: { name: string }
  turn_upside_down?: boolean
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

export interface PokemonDetailProps {
  sprites: PokemonSprites
}
