import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPokemonDetail } from '../services/pokeAPI'
import type { PokemonDetail } from '../types/pokemon'

export function usePokemonSearch(identifier: string) {
  const queryClient = useQueryClient()

  return useQuery<PokemonDetail, Error>({
    queryKey: ['pokemonDetail', identifier],
    queryFn: async () => {
      if (!identifier) {
        throw new Error('Identifier is missing')
      }

      const cachedData = queryClient.getQueryData<PokemonDetail>([
        'pokemonDetail',
        identifier,
      ])
      if (cachedData) {
        return cachedData
      }

      const data = await getPokemonDetail(identifier)

      queryClient.setQueryData(['pokemonDetail', identifier], data)

      return data
    },
    enabled: Boolean(identifier),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  })
}
