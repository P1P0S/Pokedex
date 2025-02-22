import { useQuery } from '@tanstack/react-query'
import { getAllPokemon } from '../services/pokemon'
import type { PokemonListResponse } from '../types/pokemon'

export function useAllPokemon() {
  return useQuery<PokemonListResponse, Error>({
    queryKey: ['allPokemon'],
    queryFn: () => getAllPokemon(),
    staleTime: 1000 * 60,
  })
}
