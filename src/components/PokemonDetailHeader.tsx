import { ArrowLeft } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

type PokemonDetailHeaderProps = {
  pillClass: string
}

export function PokemonDetailHeader({ pillClass }: PokemonDetailHeaderProps) {
  return (
    <header
      className={`p-4 w-full ${pillClass} flex items-center justify-between shadow-md`}
    >
      <Link
        to="/"
        className="flex items-center gap-2 text-white font-semibold text-lg transition-all duration-200 hover:opacity-80"
      >
        <ArrowLeft size={28} className="text-white" weight="bold" />
        <span className="hidden sm:inline">Back</span>
      </Link>

      <a
        href="https://pokeapi.co/"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform duration-200 hover:scale-110"
      >
        <img
          className="w-20 sm:w-24 drop-shadow-lg"
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          alt="PokeAPI"
        />
      </a>
    </header>
  )
}
