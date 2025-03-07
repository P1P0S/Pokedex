import { useQuery } from '@tanstack/react-query'
import { getPokemonDetail } from '../services/pokeAPI'
import type { PokemonDetail } from '../types/pokemon'

export function usePokemonSearch(searchKey: string) {
  return useQuery<PokemonDetail, Error>({
    queryKey: ['pokemonSearch', searchKey],
    queryFn: async () => {
      if (!searchKey.trim()) throw new Error('No search key provided')
      return await getPokemonDetail(searchKey.trim())
    },
    retry: 2,
    enabled: !!searchKey,
  })
}
