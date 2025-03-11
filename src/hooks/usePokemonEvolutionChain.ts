import { useQuery } from '@tanstack/react-query'
import { getPokemonEvolutionChain } from '../services/pokeAPI'
import { getPokemonDetail } from '../services/pokeAPI'
import type { PokemonChain } from '../types/pokemon'
import type { PokemonDetail } from '../types/pokemon'

export function usePokemonEvolutionChain(id?: number) {
  return useQuery<PokemonChain, Error>({
    queryKey: ['pokemonEvolutionChain', id],
    queryFn: async () => {
      if (!id) throw new Error('Evolution Chain ID is missing')
      return getPokemonEvolutionChain(id)
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })
}

export function useSinglePokemonDetail(name: string) {
  return useQuery<PokemonDetail, Error>({
    queryKey: ['pokemonDetail', name],
    queryFn: async () => {
      if (!name) throw new Error('Pokemon name is missing')
      return getPokemonDetail(name.replace(' ', '-'))
    },
    enabled: !!name,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })
}
