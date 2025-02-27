import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getPokemonDetail } from '../services/pokeAPI'
import type { PokemonDetail } from '../types/pokemon'

export function usePokemonDetail() {
  const { identifier } = useParams<{ identifier: string }>()

  return useQuery<PokemonDetail, Error>({
    queryKey: ['pokemonDetail', identifier],
    queryFn: async () => {
      if (!identifier) {
        throw new Error('Identifier is missing')
      }
      const data = await getPokemonDetail(identifier.replace(' ', '-'))
      return data
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  })
}
