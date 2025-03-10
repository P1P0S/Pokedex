import { useParams } from 'react-router-dom'
import { usePokemonAbout } from '../../hooks/usePokemonAbout'
import { usePokemonEvolutionChain } from '../../hooks/usePokemonEvolutionChain'
import { extractEvolutionNames } from '../../utils/pokemonChainEvolutionNames'
import { EvolutionCard } from '../PokemonEvolutionChainCard'

export function PokemonEvolutionChain() {
  const { identifier } = useParams<{ identifier: string }>()

  const {
    data: speciesData,
    isLoading: isSpeciesLoading,
    error: speciesError,
  } = usePokemonAbout(identifier || '')

  const evolutionChainId = speciesData?.evolution_chain?.url
    ?.split('/')
    .slice(-2, -1)[0]

  const {
    data: evolutionData,
    isLoading: isEvolutionLoading,
    error: evolutionError,
  } = usePokemonEvolutionChain(
    evolutionChainId ? Number(evolutionChainId) : undefined
  )

  if (isSpeciesLoading || isEvolutionLoading) return <div>Loading...</div>

  if (speciesError || !speciesData)
    return <div>Error loading Pokémon species</div>
  if (evolutionError || !evolutionData)
    return <div>Error loading evolution chain</div>

  const evolutionNames = extractEvolutionNames(evolutionData.chain)

  return (
    <div>
      <h2>{speciesData.name} Evolution Chain</h2>
      <div className="flex gap-4">
        {evolutionNames.map(name => (
          <EvolutionCard key={name} name={name} />
        ))}
      </div>
    </div>
  )
}
