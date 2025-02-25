import type { PokemonDetail, PokemonListResponse } from '../../types/pokemon'

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon'

export async function getPokemonList(
  offset = 0,
  limit = 20
): Promise<PokemonListResponse> {
  const url = `${POKEMON_API_URL}?offset=${offset}&limit=${limit}`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('An error occurred while fetching pokemon list')
  }

  return res.json()
}

export async function getPokemonDetail(
  nameOrId: string | number
): Promise<PokemonDetail> {
  const url = `${POKEMON_API_URL}/${nameOrId}`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`An error occurred while fetching Pokémon ${nameOrId}`)
  }

  return res.json()
}
