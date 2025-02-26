import type { PokemonDetail } from '../types/pokemon'

export interface PokemonDetailProps {
  id: number
  name: string
  types: string[]
  sprite?: {
    front_default: string | null
    back_default?: string | null
    front_shiny: string | null
    back_shiny?: string | null
  }
  base_experience: number
}

export function parsePokemonDetailPage(
  detail: PokemonDetail
): PokemonDetailProps {
  return {
    id: detail.id,
    name: detail.name,
    types: detail.types.map(t => t.type.name),
    sprite: {
      front_default:
        detail.sprites.other?.showdown?.front_default ??
        detail.sprites.front_default ??
        null,
      back_default:
        detail.sprites.other?.showdown?.back_default ??
        detail.sprites.back_default ??
        null,
      front_shiny:
        detail.sprites.other?.showdown?.front_shiny ??
        detail.sprites.front_shiny ??
        null,
      back_shiny:
        detail.sprites.other?.showdown?.back_shiny ??
        detail.sprites.back_shiny ??
        null,
    },
    base_experience: detail.base_experience,
  }
}
