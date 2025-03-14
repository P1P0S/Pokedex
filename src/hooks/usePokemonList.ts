import { useQuery, useQueryClient } from '@tanstack/react-query'
import { listPokemonFrontPage } from '../functions/listPokemonFrontPage'
import type { PokemonDetail } from '../types/pokemon'

export function usePokemonList(page: number) {
  const queryClient = useQueryClient()

  return useQuery<PokemonDetail[], Error>({
    queryKey: ['pokemonList', page],
    queryFn: async () => {
      const data = await listPokemonFrontPage(page)

      for (let i = 0; i < data.length; i++) {
        const pokemon = data[i]
        queryClient.setQueryData(['pokemonDetail', pokemon.name], pokemon)
      }

      return data
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    placeholderData: previousData => previousData ?? [],
  })
}
