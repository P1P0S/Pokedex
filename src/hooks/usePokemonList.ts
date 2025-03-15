import { useQuery, useQueryClient } from '@tanstack/react-query'
import { listPokemonFrontPage } from '../functions/listPokemonFrontPage'
import type { PokemonDetail } from '../types/pokemon'

interface PokemonListResponse {
  count: number
  next?: string | null
  previous?: string | null
  pokemonData: PokemonDetail[]
}

export function usePokemonList(page: number) {
  const queryClient = useQueryClient()

  return useQuery<PokemonListResponse, Error>({
    queryKey: ['pokemonList', page],
    queryFn: async () => {
      const data = await listPokemonFrontPage(page)

      for (let i = 0; i < data.pokemonData.length; i++) {
        const pokemon = data.pokemonData[i]
        queryClient.setQueryData(['pokemonDetail', pokemon.name], pokemon)
      }

      return data
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    placeholderData: previousData =>
      previousData ?? { count: 0, next: null, previous: null, pokemonData: [] },
  })
}
