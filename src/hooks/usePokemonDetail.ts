import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getPokemonDetail } from '../services/pokeAPI'
import type { PokemonDetail } from '../types/pokemon'

export function usePokemonDetail() {
  const { identifier } = useParams<{ identifier: string }>()
  const queryClient = useQueryClient()

  const cachedData = queryClient.getQueryData<PokemonDetail>([
    'pokemonDetail',
    identifier,
  ])

  return useQuery<PokemonDetail, Error>({
    queryKey: ['pokemonDetail', identifier],
    queryFn: async () => {
      if (cachedData) {
        return cachedData
      }

      if (!identifier) {
        throw new Error('Identifier is missing')
      }
      const data = await getPokemonDetail(identifier)
      return data
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
}
