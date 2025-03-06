import { Lightning } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { usePokemonDetail } from '../../hooks/usePokemonDetail'

export function PokemonStats() {
  const { data, isLoading, error } = usePokemonDetail()
  const [animatedStats, setAnimatedStats] = useState<Record<string, number>>({})

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

  return (
    <div className="p-5 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl gap-2 font-bold mb-6 text-green-600 flex items-center pb-3">
        <Lightning weight="fill" size={24} />
        Pokémon Stats
      </h2>

      <div className="space-y-4">
        {data.stats.map(({ stat, base_stat }) => {
          const widthPercent = ((animatedStats[stat.name] || 0) / maxStat) * 100
          return (
            <div
              key={stat.name}
              className="flex flex-row content-center gap-3 font-bold capitalize text-gray-800"
            >
              <span className="w-1/3">
                {statLabels[stat.name] ?? stat.name}
              </span>
              {/* <span className="w-10 text-right">{base_stat}</span> */}
              <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full relative rounded-full ${statColors[stat.name] ?? 'bg-gray-400'}`}
                  style={{
                    width: `${widthPercent}%`,
                    transition: 'width 1.5s ease-in-out',
                  }}
                />
              </div>
              <div className="ml-3 w-12 text-right">
                <span className="text-gray-700 font-bold">{base_stat}</span>
              </div>
              <span className="w-10 text-left text-gray-400">{maxStat}</span>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="font-medium text-gray-600">Height</span>
          <p className="font-bold text-xl">{heightInMeters}m</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="font-medium text-gray-600">Weight</span>
          <p className="font-bold text-xl">{weightInKg}kg</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="font-medium text-gray-600">Base Experience</span>
          <p className="font-bold text-xl">{data.base_experience}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-medium text-gray-600 mb-3">Abilities</h3>
        <div className="flex flex-wrap gap-2">
          {data.abilities.map(a => (
            <span
              key={a.ability.name}
              className="bg-gray-400 rounded-lg px-3 py-2 capitalize font-bold"
            >
              {a.ability.name}
              {a.is_hidden && <span className="text-gray-500"> (Hidden)</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
