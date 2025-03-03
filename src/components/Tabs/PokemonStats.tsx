import { Lightning } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { usePokemonDetail } from '../../hooks/usePokemonDetail'

export function PokemonStats() {
  const { data, isLoading, error } = usePokemonDetail()
  const [animatedStats, setAnimatedStats] = useState<Record<string, number>>({})

  if (isLoading) return <p>Loading stats...</p>
  if (error || !data) {
    return <p>Error while fetching stats</p>
  }

  useEffect(() => {
    if (data?.stats) {
      // biome-ignore lint/complexity/noForEach: <explanation>
      data.stats.forEach(({ stat, base_stat }) => {
        setTimeout(() => {
          setAnimatedStats(prev => ({ ...prev, [stat.name]: base_stat }))
        }, 200)
      })
    }
  }, [data])

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

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-xl gap-2 font-bold mb-4 text-green-600 flex items-center">
        <Lightning weight="fill" />
        Pokémon Stats
      </h2>

      <div className="space-y-2">
        {data.stats.map(({ stat, base_stat }) => {
          const widthPercent = ((animatedStats[stat.name] || 0) / maxStat) * 100
          return (
            <div
              key={stat.name}
              className="flex items-center gap-2 font-bold capitalize text-base text-slate-700"
            >
              <span className="w-1/3">
                {statLabels[stat.name] ?? stat.name}
              </span>
              <span className="w-8 text-right">{base_stat}</span>
              <div className="relative w-full h-3 bg-gray-200 rounded overflow-hidden">
                <div
                  className={`h-full rounded ${statColors[stat.name] ?? 'bg-gray-400'}`}
                  style={{
                    width: `${widthPercent}%`,
                    transition: 'width 1.5s ease-in-out',
                  }}
                />
              </div>
              <span className="w-8 text-left">{maxStat}</span>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="flex flex-col">
          <span className="font-medium flex items-center">Height</span>
          <span className="font-bold">{heightInMeters}m</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium flex items-center">Weight</span>
          <span className="font-bold">{weightInKg}kg</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium flex items-center">Base Experience</span>
          <span className="font-bold">{data.base_experience}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium flex items-center">Abilities</span>
          <span className="capitalize font-bold">
            {data.abilities.map(a => a.ability.name).join(', ')}
          </span>
        </div>
      </div>
    </div>
  )
}
