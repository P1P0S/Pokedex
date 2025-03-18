import type { EvolutionDetail, PokemonChain } from '../types/pokemon'

export interface EvolutionLevelItem {
  speciesName: string
  evolutionDetails: EvolutionDetail[]
}

export function extractEvolutionsNames(
  chain: PokemonChain
): EvolutionLevelItem[][] {
  const levels: EvolutionLevelItem[][] = []
  let currentLevel: PokemonChain[] = [chain]

  while (currentLevel.length > 0) {
    const currentLevelData: EvolutionLevelItem[] = currentLevel.map(evo => ({
      speciesName: evo.species.name,
      evolutionDetails: evo.evolution_details ?? [],
    }))

    levels.push(currentLevelData)

    currentLevel = currentLevel.flatMap(evo => evo.evolves_to ?? [])
  }

  return levels
}
