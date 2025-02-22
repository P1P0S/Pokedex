import { useQuery } from '@tanstack/react-query'
import type { PokemonDetail } from '..//types/pokemon'
import { getPokemonDetail, getPokemonList } from '../services/pokemon'

interface PokemonCardData {
  id: number
  name: string
  types: string[]
  sprite: string | null
}

async function fetchPokemonListWithDetails() {
  // 1) Busca lista de 20 Pokémon
  const list = await getPokemonList(58, 20)

  // 2) Pra cada Pokémon, busca detalhes (em paralelo com Promise.all)
  const detailPromises = list.results.map(item => getPokemonDetail(item.name))
  const details = await Promise.all(detailPromises)

  // 3) Mapeia para um formato amigável ao componente
  const pokemonData: PokemonCardData[] = details.map(
    (detail: PokemonDetail) => {
      return {
        id: detail.id,
        name: detail.name,
        types: detail.types.map(t => t.type.name), // ["grass", "poison"], etc
        sprite: detail.sprites.other.showdown.front_default,
      }
    }
  )

  return pokemonData
}

export function usePokemonList() {
  return useQuery<PokemonCardData[], Error>({
    queryKey: ['pokemonListWithDetails'],
    queryFn: fetchPokemonListWithDetails,
    staleTime: 1000 * 60 * 5, // Cache de 5 minutos
  })
}
