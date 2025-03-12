import { PokemonBasicInfo } from '../components/PokemonBasicInfo'
import { PokemonDetailHeader } from '../components/PokemonDetailHeader'
import { PokemonDetailImage } from '../components/PokemonDetailImage'
import { PokemonTabs } from '../components/Tabs/PokemonTabs'
import { PokemonDetailSkeleton } from '../components/skeleton/PokemonDetailSkeleton'
import { usePokemonDetail } from '../hooks/usePokemonDetail'
import { typeColors } from '../utils/pokemonTypeColors'

export function PokemonDetailPage() {
  const { data, isLoading, error } = usePokemonDetail()

  if (isLoading) {
    return <PokemonDetailSkeleton />
  }

  if (error || !data) return <p>Error while fetching Pokémon</p>

  const mainType = data?.types[0]?.type.name || 'normal'
  const backgroundClass = typeColors[mainType]?.card ?? typeColors.normal.card
  const pillClass = typeColors[mainType]?.pill ?? typeColors.normal.pill

  return (
    <div className="flex flex-col items-center gap-6">
      <PokemonDetailHeader pillClass={pillClass} />
      <main className="w-[90%] md:w-[50%] lg:w-[50%] max-w-auto rounded-2xl overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
        <PokemonBasicInfo
          data={data}
          backgroundClass={backgroundClass}
          typeColors={typeColors}
        />
        <PokemonDetailImage
          pillClass={pillClass}
          bgClass={backgroundClass}
          sprites={data?.sprites}
        />
        <PokemonTabs />
      </main>
    </div>
  )
}
