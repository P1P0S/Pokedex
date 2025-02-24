// PokemonDetailPage.tsx
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { PokemonBasicInfo } from '../components/PokemonBasicInfo'
import { PokemonDetailHeader } from '../components/PokemonDetailHeader'
import { PokemonMainImage } from '../components/PokemonImage'
import { PokemonSprites } from '../components/PokemonSprites'
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
  if (error || !data) {
    return <p>Erro ao carregar os detalhes do Pokémon</p>
  }

  const mainType = data?.types[0] || 'normal'
  const backgroundClass = typeColors[mainType]?.card ?? typeColors.normal.card
  const pillClass = typeColors[mainType]?.pill ?? typeColors.normal.pill

  return (
    <div className="flex flex-col items-center gap-6">
      <PokemonDetailHeader pillClass={pillClass} />
      <main className="w-[90%] rounded-2xl overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
        <PokemonBasicInfo
          data={data}
          backgroundClass={backgroundClass}
          typeColors={typeColors}
        />
        <PokemonMainImage data={data} />
        <PokemonSprites data={data} />
      </main>
    </div>
  )
}
