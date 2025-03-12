import { useSinglePokemonDetail } from '../hooks/usePokemonEvolutionChain'
import { PokemonCard } from './PokemonCard'

export function EvolutionCard({ name }: { name: string }) {
  const { data, isLoading, error } = useSinglePokemonDetail(name)

  if (isLoading) {
    return <div className="p-4 text-gray-500">Loading {name}...</div>
  }

  if (error || !data) {
    return <div className="p-4 text-red-500">Error loading {name}</div>
  }

  return (
    <div className="flex flex-col items-center">
      <PokemonCard {...data} />
      {name !== data.name && (
        <span className="mt-1 text-xs text-gray-500">{name}</span>
      )}
    </div>
  )
}
