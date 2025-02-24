import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { getPokemonDetail } from '../services/pokemon'
import {
  type PokemonCardData,
  parsePokemonDetail,
} from '../utils/pokemonParser'

export function PokemonDetailPage() {
  const { identifier } = useParams<{ identifier: string }>()

  const { data, isLoading, error } = useQuery<PokemonCardData, Error>({
    queryKey: ['pokemonDetail', identifier],
    queryFn: async () => {
      if (!identifier) {
        throw new Error('Identificador não informado')
      }
      const detail = await getPokemonDetail(identifier)
      return parsePokemonDetail(detail)
    },
  })

  if (isLoading) return <p>Carregando...</p>
  if (error) return <p>Erro ao carregar os detalhes do Pokémon</p>

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-500 underline">
        Voltar
      </Link>
      <h1 className="text-2xl font-bold mt-4">
        {data?.name} (#{data?.id})
      </h1>
      <img
        src={data?.sprite || ''}
        alt={data?.name}
        className="mt-4 w-48 h-48"
      />
      <p className="mt-4">Tipos: {data?.types.join(', ')}</p>
    </div>
  )
}
