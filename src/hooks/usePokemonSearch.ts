import { useQuery } from '@tanstack/react-query'
import { getPokemonList } from '../services/pokeAPI'

export function usePokemonSearch(options = { enabled: true }) {
  return useQuery({
    queryKey: ['allPokemon'],
    queryFn: async (): Promise<string[]> => {
      const list = await getPokemonList(0, 9999)
      return list.results.map(item => item.name)
    },
    staleTime: 1000 * 60 * 5,
    enabled: options.enabled,
    refetchOnWindowFocus: false,
  })
}
