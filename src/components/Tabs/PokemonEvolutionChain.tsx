import {
  ArrowDown,
  ArrowDownLeft,
  ArrowDownRight,
  Lightning,
} from '@phosphor-icons/react'
import { useParams } from 'react-router-dom'
import { renderEvolutionDetails } from '../../functions/renderEvolutionDetail'
import { usePokemonAbout } from '../../hooks/usePokemonAbout'
import { usePokemonEvolutionChain } from '../../hooks/usePokemonEvolutionChain'
import { extractEvolutionsNames } from '../../utils/pokemonChainEvolutionNames'
import { EvolutionCard } from '../PokemonEvolutionChainCard'
import { PokemonEvolutionChainSkeleton } from '../skeleton/PokemonEvolutionChainSkeleton'

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
  } = usePokemonEvolutionChain(evolutionChainId ? Number(evolutionChainId) : 1)

  if (isSpeciesLoading || isEvolutionLoading) {
    return <PokemonEvolutionChainSkeleton />
  }

  if (speciesError || !speciesData) {
    return <div>Error loading Pokémon species</div>
  }

  if (evolutionError || !evolutionData) {
    return <div>Error loading evolution chain</div>
  }

  const evolutionLevels = extractEvolutionsNames(evolutionData.chain)
  const basePokemon = evolutionLevels[0]?.[0]
  const remainingLevels = evolutionLevels.slice(1)
  const firstEvolutionLevel = remainingLevels[0] || []

  return (
    <div className="p-5 bg-white rounded-lg shadow-lg">
      <h2 className="capitalize text-xl gap-2 font-bold mb-4 text-green-600 flex items-center">
        <Lightning weight="fill" size={24} />
        {speciesData.name} Evolution Chain
      </h2>

      <div className="flex flex-col items-center gap-8">
        {basePokemon && (
          <div className="flex flex-col justify-center items-center">
            <EvolutionCard name={basePokemon.speciesName} />

            {basePokemon.evolutionDetails.length > 0 &&
              renderEvolutionDetails({
                details: basePokemon.evolutionDetails,
              })}

            {firstEvolutionLevel.length > 0 && (
              <div>
                {firstEvolutionLevel.length === 1 ? (
                  <div className="flex justify-center mt-6">
                    <ArrowDown size={32} weight="bold" />
                  </div>
                ) : (
                  <div className="flex flex-row justify-between mt-6">
                    <ArrowDownLeft
                      className="self-start"
                      size={32}
                      weight="bold"
                    />
                    {firstEvolutionLevel.length > 2 && (
                      <ArrowDown size={32} weight="bold" className="mx-2" />
                    )}
                    <ArrowDownRight size={32} weight="bold" />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {remainingLevels.length > 0 && (
          <div className="flex flex-row flex-wrap justify-center gap-6">
            {remainingLevels.flat().map(evo => (
              <ul
                className="list-none h-fit rounded-lg overflow-hidden bg-gray-50 border border-gray-200 text-gray-700 text-sm"
                key={evo.speciesName}
              >
                <div className="flex flex-col items-center">
                  <div className="pt-4">
                    <EvolutionCard name={evo.speciesName} />
                  </div>

                  {evo.evolutionDetails.length > 0 &&
                    renderEvolutionDetails({ details: evo.evolutionDetails })}
                </div>
              </ul>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
