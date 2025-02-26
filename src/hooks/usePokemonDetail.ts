import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getPokemonDetail } from '../services/pokeAPI'
import {
  type PokemonDetailProps,
  parsePokemonDetailPage,
} from '../utils/parsePokemonDetailPage'

export function usePokemonDetail() {
  const { identifier } = useParams<{ identifier: string }>()

  return useQuery<PokemonDetailProps, Error>({
    queryKey: ['pokemonDetail', identifier],
    queryFn: async () => {
      if (!identifier) {
        throw new Error('Identifier is missing')
      }
      const detail = await getPokemonDetail(identifier)
      return parsePokemonDetailPage(detail)
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  })
}
