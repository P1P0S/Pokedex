import { useQuery } from '@tanstack/react-query'
import { getPokemonDetailMoves } from '../services/pokeAPI'
import type { PokemonMoveDetails } from '../types/pokemon'

export function usePokemonDetailMove(moveKey: string) {
  return useQuery<PokemonMoveDetails, Error>({
    queryKey: ['pokemonMove', moveKey],
    queryFn: async () => await getPokemonDetailMoves(moveKey),
    staleTime: 1000 * 60 * 5,
  })
}
