import type { PokemonChain } from '../types/pokemon'

export function extractEvolutionsNames(chain: PokemonChain) {
  const levels: PokemonChain[][] = []
  let currentLevel: PokemonChain[] = [chain]

  while (currentLevel.length > 0) {
    levels.push(currentLevel)
    const nextLevel: PokemonChain[] = []
    // biome-ignore lint/complexity/noForEach: <explanation>
    currentLevel.forEach(evo => {
      if (evo.evolves_to && evo.evolves_to.length > 0) {
        nextLevel.push(...evo.evolves_to)
      }
    })
    currentLevel = nextLevel
  }

  return levels
}
