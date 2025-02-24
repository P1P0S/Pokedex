import { ArrowLeft } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

type PokemonDetailHeaderProps = {
  pillClass: string
}

export function PokemonDetailHeader({ pillClass }: PokemonDetailHeaderProps) {
  return (
    <header className={`p-4 w-full ${pillClass}`}>
      <Link to="/" className="font-bold flex flex-row items-center text-white">
        <ArrowLeft size={24} className="inline mr-2 text-white" weight="bold" />
        Voltar
      </Link>
    </header>
  )
}
