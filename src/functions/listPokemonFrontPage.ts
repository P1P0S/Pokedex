import { getPokemonDetail, getPokemonList } from '../services/pokeAPI'

export async function listPokemonFrontPage(page: number) {
  const limit = 20
  const offset = page * limit

  const list = await getPokemonList(offset, limit)

  const pokemonData = await Promise.all(
    list.results.map(item => getPokemonDetail(item.name))
  )

  return {
    count: list.count,
    next: list.next,
    previous: list.previous,
    pokemonData,
  }
}
