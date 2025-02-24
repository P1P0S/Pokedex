import { useQuery } from '@tanstack/react-query'
import { getPokemonDetail, getPokemonList } from '../services/pokemon'
import type { PokemonDetail } from '../types/pokemon'

interface PokemonCardData {
  id: number
  name: string
  types: string[]
  sprite: string | null
}

async function fetchPokemonListWithDetails(page: number) {
  const limit = 20
  const offset = page * limit

  const list = await getPokemonList(offset, limit)

  const detailPromises = list.results.map(item => getPokemonDetail(item.name))
  const details = await Promise.all(detailPromises)

  const pokemonData: PokemonCardData[] = details.map(
    (detail: PokemonDetail) => {
      return {
        id: detail.id,
        name: detail.name,
        types: detail.types.map(t => t.type.name),
        sprite: detail.sprites.other.showdown.front_default,
      }
    }
  )

  return pokemonData
}

export function usePokemonList(page: number) {
  return useQuery<PokemonCardData[], Error>({
    queryKey: ['pokemonListWithDetails', page],
    queryFn: () => fetchPokemonListWithDetails(page),
    staleTime: 1000 * 60 * 5,
  })
}
