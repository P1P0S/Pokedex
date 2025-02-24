import type { PokemonDetail } from '../types/pokemon'

export interface PokemonCardData {
  id: number
  name: string
  types: string[]
  sprite: string | null
  base_experience: number
}

export function parsePokemonDetail(detail: PokemonDetail): PokemonCardData {
  return {
    id: detail.id,
    name: detail.name,
    types: detail.types.map(t => t.type.name),
    base_experience: detail.base_experience,
    sprite:
      detail.sprites.other?.showdown?.front_default ??
      detail.sprites.front_default,
  }
}
