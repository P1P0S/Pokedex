import { useQuery } from '@tanstack/react-query'
import { getPokemonList } from '../services/pokemon'
import type { PokemonListResponse } from '../types/pokemon'

export function useAllPokemon() {
  return useQuery<PokemonListResponse, Error>({
    queryKey: ['allPokemon'],
    queryFn: () => getPokemonList(),
    staleTime: 1000 * 60 * 5,
  })
}
