import { ArrowLeft } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

type PokemonDetailHeaderProps = {
  pillClass: string
}

export function PokemonDetailHeader({ pillClass }: PokemonDetailHeaderProps) {
  return (
    <header className={`p-4 w-full ${pillClass} flex flex-row justify-between`}>
      <Link to="/" className="font-bold flex flex-row items-center text-white">
        <ArrowLeft size={24} className="inline mr-2 text-white" weight="bold" />
        Back
      </Link>

      <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">
        <img
          className="w-16"
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          alt="pokeapi"
        />
      </a>
    </header>
  )
}
