import { Play } from '@phosphor-icons/react'
import { usePokemonDetail } from '../../hooks/usePokemonDetail'

export function PokemonStats() {
  const { data, isLoading, error } = usePokemonDetail()

  if (isLoading) return <p>Loading stats...</p>
  if (error || !data) {
    return <p>Error while fetching stats</p>
  }

  const maxStat = 255

  const heightInMeters = data.height / 10
  const weightInKg = data.weight / 10

  const statColors: Record<string, string> = {
    hp: 'bg-red-400',
    attack: 'bg-orange-400',
    defense: 'bg-yellow-400',
    'special-attack': 'bg-blue-400',
    'special-defense': 'bg-green-400',
    speed: 'bg-pink-400',
  }

  const statLabels: Record<string, string> = {
    'special-attack': 'Sp. Attack',
    'special-defense': 'Sp. Defense',
    hp: 'HP',
  }

  const handlePlaySound = () => {
    if (!data?.cries.latest) return

    const audio = new Audio(data.cries.latest)
    audio.play()
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-bold mb-4 text-green-600 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
            clipRule="evenodd"
          />
        </svg>
        Pokémon Stats
      </h2>
      <div className="space-y-2">
        {data.stats.map(({ stat, base_stat }) => {
          const widthPercent = (base_stat / maxStat) * 100

          return (
            <div
              key={stat.name}
              className="flex items-center gap-2 font-bold capitalize text-base text-slate-700"
            >
              <span className="w-1/3">
                {statLabels[stat.name] ?? stat.name}
              </span>
              <span className="w-8 text-right">{base_stat}</span>
              <div className="relative w-full h-3 bg-gray-200 rounded">
                <div
                  className={`h-full rounded ${statColors[stat.name] ?? 'bg-gray-400'}`}
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
              <span className="w-8 text-left">{maxStat}</span>
            </div>
          )
        })}
      </div>

      <div className="space-y-2 text-slate-700">
        <div className="flex flex-col justify-between">
          <span className="font-medium">Height</span>
          <span className="font-bold">{heightInMeters} m</span>
        </div>
        <div className="flex flex-col justify-between">
          <span className="font-medium">Weight</span>
          <span className="font-bold">{weightInKg} kg</span>
        </div>
        <div className="flex flex-col justify-between">
          <span className="font-medium">Base Experience</span>
          <span className="font-bold">{data.base_experience}</span>
        </div>
        <div className="flex flex-col justify-between">
          <span className="font-medium">Abilities</span>
          <span className="capitalize font-bold">
            {data.abilities.map(a => a.ability.name).join(', ')}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handlePlaySound}
        className="flex items-center gap-2 text-green-600 font-bold"
      >
        <span className="w-8 h-8 flex items-center justify-center cursor-pointer bg-green-500 text-white rounded-full">
          <Play stroke="white" weight="fill" size={12} />
        </span>
        <span className="h-full">Play Sound</span>
      </button>
    </div>
  )
}
