import type {
  PokemonChain,
  PokemonDetail,
  PokemonListResponse,
  PokemonMoveDetails,
  PokemonSpecies,
} from '../../types/pokemon'

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/'

export async function getPokemonList(
  offset = 0,
  limit = 20
): Promise<PokemonListResponse> {
  const url = `${POKEMON_API_URL}pokemon?offset=${offset}&limit=${limit}`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('An error occurred while fetching pokemon list')
  }

  return res.json()
}

export async function getPokemonDetail(
  nameOrId: string | number
): Promise<PokemonDetail> {
  const url = `${POKEMON_API_URL}pokemon/${nameOrId}`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`An error occurred while fetching Pokémon ${nameOrId}`)
  }

  return res.json()
}

export async function getPokemonDetailMoves(
  nameOrId: string | number
): Promise<PokemonMoveDetails> {
  const url = `${POKEMON_API_URL}move/${nameOrId}`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(
      `An error occurred while fetching Pokémon Moves ${nameOrId}`
    )
  }

  return res.json()
}

export async function getPokemonSpecies(
  nameOrId: string | number
): Promise<PokemonSpecies> {
  const url = `${POKEMON_API_URL}pokemon-species/${nameOrId}`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(
      `An error occurred while fetching Pokémon Species ${nameOrId}`
    )
  }

  return res.json()
}

export async function getPokemonEvolutionChain(
  id: number
): Promise<PokemonChain> {
  const url = `${POKEMON_API_URL}evolution-chain/${id}`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`An error occurred while fetching Pokémon Chain ${id}`)
  }

  return res.json()
}
