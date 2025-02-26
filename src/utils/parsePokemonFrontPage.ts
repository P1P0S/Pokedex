import type { PokemonDetail } from '../types/pokemon'

export interface PokemonCardData {
  id: number
  name: string
  types: string[]
  sprite?: {
    front_default: string | null
    back_default?: string | null
  }
}

export function parsePokemonFrontPage(detail: PokemonDetail): PokemonCardData {
  const normalizePokeName = detail.name.replace('-', ' ')

  return {
    id: detail.id,
    name: normalizePokeName,
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
    },
  }
}
