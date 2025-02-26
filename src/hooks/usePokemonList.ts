import { useQuery } from '@tanstack/react-query'
import { listPokemonFrontPage } from '../functions/listPokemonFrontPage'
import type { PokemonCardData } from '../utils/parsePokemonFrontPage'

export function usePokemonList(page: number) {
  return useQuery<PokemonCardData[], Error>({
    queryKey: ['listPokemonFrontPage', page],
    queryFn: () => listPokemonFrontPage(page),
    staleTime: 1000 * 60 * 5,
  })
}
