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
  stats: Array<{ stat: { name: string }; base_stat: number }>
  height: number
  weight: number
  abilities: Array<{ ability: { name: string } }>
  cries: {
    latest: string
    legacy?: string
  }
  base_experience: number
  moves: Array<{ move: { name: string } }>
}

export function parsePokemonDetailPage(
  detail: PokemonDetail
): PokemonDetailProps {
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
      front_shiny:
        detail.sprites.other?.showdown?.front_shiny ??
        detail.sprites.front_shiny ??
        null,
      back_shiny:
        detail.sprites.other?.showdown?.back_shiny ??
        detail.sprites.back_shiny ??
        null,
    },
    stats: detail.stats,
    height: detail.height,
    weight: detail.weight,
    abilities: detail.abilities,
    cries: detail.cries,
    base_experience: detail.base_experience,
    moves: detail.moves.map(m => ({ move: { name: m.move.name } })),
  }
}
