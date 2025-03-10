import type { PokemonChain } from '../types/pokemon'

export function extractEvolutionNames(chain: PokemonChain): string[] {
  const names: string[] = []

  function traverse(node: PokemonChain) {
    if (!node) return
    names.push(node.species.name)
    node.evolves_to.forEach(traverse)
  }

  traverse(chain)
  return names
}
