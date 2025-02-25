import { useQuery } from '@tanstack/react-query'
import { getPokemonDetail, getPokemonList } from '../services/pokeAPI'
import {
  type PokemonCardData,
  parsePokemonFrontPage,
} from '../utils/parsePokemonFrontPage'

async function listPokemonFrontPage(page: number) {
  const limit = 20
  const offset = page * limit

  const list = await getPokemonList(offset, limit)

  const detailPromises = list.results.map(item => getPokemonDetail(item.name))
  const details = await Promise.all(detailPromises)

  const pokemonData: PokemonCardData[] = details.map(parsePokemonFrontPage)

  return pokemonData
}

export function usePokemonList(page: number) {
  return useQuery<PokemonCardData[], Error>({
    queryKey: ['listPokemonFrontPage', page],
    queryFn: () => listPokemonFrontPage(page),
    staleTime: 1000 * 60 * 5,
  })
}
