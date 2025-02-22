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
    front_default: string | null
    [key: string]: string | null
  }
}
