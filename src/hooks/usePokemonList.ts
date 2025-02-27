import { useQuery } from '@tanstack/react-query'
import { listPokemonFrontPage } from '../functions/listPokemonFrontPage'
import type { PokemonDetail } from '../types/pokemon'

export function usePokemonList(page: number) {
  return useQuery<PokemonDetail[], Error>({
    queryKey: ['pokemonList', page],
    queryFn: () => listPokemonFrontPage(page),
    staleTime: 1000 * 60 * 5,
    placeholderData: previousData => previousData ?? [],
  })
}
