import type { PokemonListResponse } from '../../types/pokemon'

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon/'

export async function getAllPokemon(
  offset = 0,
  limit = 20
): Promise<PokemonListResponse> {
  const allPokemonUrl = `${POKEMON_API_URL}?offset=${offset}$limit=${limit}`
  const res = await fetch(allPokemonUrl)

  if (!res.ok) {
    throw new Error('An error occurred while fetching the pokemon')
  }
  return res.json()
}

export async function getPokemonById(id: number) {
  const res = await fetch(`${POKEMON_API_URL}${id}`)

  if (!res.ok) {
    throw new Error('An error occurred while fetching the pokemon')
  }

  return res.json()
}

export async function getPokemonByName(name: string) {
  const res = await fetch(`${POKEMON_API_URL}${name}`)

  if (!res.ok) {
    throw new Error('An error occurred while fetching the pokemon')
  }

  return res.json()
}
