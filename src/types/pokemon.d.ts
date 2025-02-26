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
}
