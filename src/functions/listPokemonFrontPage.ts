import { getPokemonDetail, getPokemonList } from '../services/pokeAPI'
import {
  type PokemonCardData,
  parsePokemonFrontPage,
} from '../utils/parsePokemonFrontPage'

export async function listPokemonFrontPage(page: number) {
  const limit = 20
  const offset = page * limit

  const list = await getPokemonList(offset, limit)

  const detailPromises = list.results.map(item => getPokemonDetail(item.name))
  const details = await Promise.all(detailPromises)

  const pokemonData: PokemonCardData[] = details.map(parsePokemonFrontPage)

  return pokemonData
}
