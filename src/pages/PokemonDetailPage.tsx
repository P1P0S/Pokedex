import { useEffect } from 'react'
import { PokemonBasicInfo } from '../components/PokemonBasicInfo'
import { PokemonDetailHeader } from '../components/PokemonDetailHeader'
import { PokemonMainImage } from '../components/PokemonImage'
import { PokemonSprites } from '../components/PokemonSprites'
import { PokemonTabs } from '../components/Tabs/PokemonTabs'
import { usePokemonDetail } from '../hooks/usePokemonDetail'
import { usePokemonStore } from '../store/pokemonStore'
import { typeColors } from '../utils/pokemonTypeColors'

export function PokemonDetailPage() {
  const { data, isLoading, error } = usePokemonDetail()
  const { setPokemonSprites } = usePokemonStore()

  useEffect(() => {
    if (data?.sprite) {
      setPokemonSprites(data.sprite)
    }
  }, [data, setPokemonSprites])

  if (isLoading) return <p>Loading...</p>
  if (error || !data) return <p>Error while fetching Pokémon</p>

  const mainType = data?.types[0] || 'normal'
  const backgroundClass = typeColors[mainType]?.card ?? typeColors.normal.card
  const pillClass = typeColors[mainType]?.pill ?? typeColors.normal.pill

  return (
    <div className="flex flex-col items-center gap-6">
      <PokemonDetailHeader pillClass={`${pillClass}`} />
      <main className="w-[90%] md:w-[50%] lg:w-[50%] max-w-auto rounded-2xl overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
        <PokemonBasicInfo
          data={data}
          backgroundClass={backgroundClass}
          typeColors={typeColors}
        />
        <PokemonMainImage />
        <PokemonSprites />
        <PokemonTabs />
      </main>
    </div>
  )
}
