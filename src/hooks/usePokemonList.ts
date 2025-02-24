import { useQuery } from '@tanstack/react-query'
import { getPokemonDetail, getPokemonList } from '../services/pokemon'
import {
  type PokemonCardData,
  parsePokemonDetail,
} from '../utils/pokemonParser'

async function fetchPokemonListWithDetails(page: number) {
  const limit = 20
  const offset = page * limit

  const list = await getPokemonList(offset, limit)

  const detailPromises = list.results.map(item => getPokemonDetail(item.name))
  const details = await Promise.all(detailPromises)

  const pokemonData: PokemonCardData[] = details.map(parsePokemonDetail)

  return pokemonData
}

export function usePokemonList(page: number) {
  return useQuery<PokemonCardData[], Error>({
    queryKey: ['pokemonListWithDetails', page],
    queryFn: () => fetchPokemonListWithDetails(page),
    staleTime: 1000 * 60 * 5,
  })
}
