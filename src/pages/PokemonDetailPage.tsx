import { ArrowLeft } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { getPokemonDetail } from '../services/pokemon'
import {
  type PokemonCardData,
  parsePokemonDetail,
} from '../utils/pokemonParser'
import { typeColors } from '../utils/pokemonTypeColors'

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

  const mainType = data?.types[0] || 'normal'
  const backgroundClass = typeColors[mainType]?.card ?? typeColors.normal.card
  const pillClass = typeColors[mainType]?.pill ?? typeColors.normal.pill

  return (
    <div className="flex flex-col items-center gap-6">
      <header className={`p-4 w-full ${pillClass}`}>
        <Link
          to="/"
          className="font-bold flex flex-row items-center text-white"
        >
          <ArrowLeft
            size={24}
            className="inline mr-2 text-white"
            weight="bold"
          />
          Voltar
        </Link>
      </header>

      <main className="w-[90%] rounded-2xl overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
        <header className={`${backgroundClass}`}>
          <div className="flex flex-col gap-2 p-4">
            <div className="text-slate-50 font-bold text-md">#{data?.id}</div>

            <div className="text-slate-50 font-bold text-3xl capitalize">{`${data?.name}`}</div>

            <div className="flex flex-row gap-2">
              {data?.types.map(type => {
                const pillClass =
                  typeColors[type]?.pill ?? typeColors.normal.pill
                return (
                  <span
                    key={type}
                    className={`text-slate-50 ${pillClass} font-bold text-sm px-2 py-1 rounded-2xl uppercase`}
                  >
                    {type}
                  </span>
                )
              })}
            </div>
          </div>
        </header>

        <div className="w-full bg-slate-300">
          <div className="flex flex-col items-center">
            <img
              src={data?.sprite?.front_default || ''}
              alt={data?.name}
              className="mt-4 w-48 h-48"
            />
          </div>
        </div>
      </main>
    </div>
  )
}
