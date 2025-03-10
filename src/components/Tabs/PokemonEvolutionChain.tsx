import { Lightning } from '@phosphor-icons/react'
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
    <div className="p-5 bg-white rounded-lg shadow-lg">
      <h2 className="capitalize text-xl gap-2 font-bold mb-4 text-green-600 flex items-center">
        <Lightning weight="fill" size={24} />
        {speciesData.name} Evolution Chain
      </h2>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 gap-4 justify-items-center">
          {evolutionNames.map(name => (
            <EvolutionCard key={name} name={name} />
          ))}
        </div>
      </div>
    </div>
  )
}
