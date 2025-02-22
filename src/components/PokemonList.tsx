import { useAllPokemon } from '../hooks/useAllPokemon'
import type { Pokemon } from '../types/pokemon'

export function PokemonList() {
  const { data, isLoading, error } = useAllPokemon()

  if (isLoading) return <p>Carregando...</p>
  if (error) return <p>Erro ao buscar Pokémon</p>

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Lista de Pokémon</h2>
      <ul className="list-disc list-inside">
        {data?.results.map((pokemon: Pokemon) => (
          <li key={pokemon.name} className="capitalize">
            {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
