import { useQuery } from '@tanstack/react-query'
import { getPokemonSpecies } from '../services/pokeAPI'
import type { PokemonSpecies } from '../types/pokemon'

export function usePokemonAbout(specie: string) {
  return useQuery<PokemonSpecies, Error>({
    queryKey: ['pokemonSpecies', specie],
    queryFn: async () => await getPokemonSpecies(specie),
    staleTime: 1000 * 60 * 5,
  })
}
