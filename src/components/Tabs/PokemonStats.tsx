import { Lightning, Megaphone, Play, Spinner } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { usePokemonDetail } from '../../hooks/usePokemonDetail'

export function PokemonStats() {
  const { data, isLoading, error } = usePokemonDetail()
  const [animatedStats, setAnimatedStats] = useState<Record<string, number>>({})
  const [isLatestEnabled, setIsLatestEnabled] = useState(true)
  const [isLegacyEnabled, setIsLegacyEnabled] = useState(true)
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)
  const [progress, setProgress] = useState<Record<string, number>>({
    latest: 0,
    legacy: 0,
  })

  const latestAudioRef = useRef<HTMLAudioElement>(null)
  const legacyAudioRef = useRef<HTMLAudioElement>(null)

  if (isLoading) return <p>Loading stats...</p>
  if (error || !data) {
    return <p>Error while fetching stats</p>
  }

  useEffect(() => {
    if (data?.cries) {
      setIsLatestEnabled(!data.cries.latest)
      setIsLegacyEnabled(!data.cries.legacy)
    }
  }, [data])

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

  const handlePlayAudio = (audioType: string) => {
    const isPlaying = playingAudio === audioType

    if (playingAudio) {
      if (playingAudio === 'latest' && latestAudioRef.current) {
        latestAudioRef.current.pause()
      } else if (playingAudio === 'legacy' && legacyAudioRef.current) {
        legacyAudioRef.current.pause()
      }
    }

    if (!isPlaying) {
      if (audioType === 'latest' && latestAudioRef.current) {
        latestAudioRef.current.currentTime = 0
        latestAudioRef.current.play()
      } else if (audioType === 'legacy' && legacyAudioRef.current) {
        legacyAudioRef.current.currentTime = 0
        legacyAudioRef.current.play()
      }
      setPlayingAudio(audioType)
    } else {
      setPlayingAudio(null)
    }
  }

  const updateProgress = (
    audioType: string,
    e: React.SyntheticEvent<HTMLAudioElement>
  ) => {
    const audio = e.currentTarget
    const currentProgress = (audio.currentTime / audio.duration) * 100
    setProgress(prev => ({
      ...prev,
      [audioType]: currentProgress,
    }))
  }

  const handleAudioEnded = () => {
    setPlayingAudio(null)
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

      <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold gap-1 mb-4 text-green-600 flex items-center">
          <Megaphone weight="fill" className="scale-x-[-1]" />
          Pokémon Cries
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-gray-700">
                Latest Cry
              </span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                HD
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                disabled={isLatestEnabled}
                onClick={() => handlePlayAudio('latest')}
                className={`w-10 h-10 cursor-pointer rounded-full flex items-center justify-center disabled:opacity-50
                  ${
                    playingAudio === 'latest'
                      ? 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}
              >
                {playingAudio === 'latest' ? (
                  <Spinner className="animate-spin" />
                ) : (
                  <Play weight="fill" size={14} />
                )}
              </button>

              <div className="w-full">
                {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
                <audio
                  ref={latestAudioRef}
                  src={data.cries.latest}
                  onTimeUpdate={e => updateProgress('latest', e)}
                  onEnded={handleAudioEnded}
                />
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-green-500 h-full transition-all duration-100"
                    style={{ width: `${progress.latest}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-gray-700">
                Legacy Cry
              </span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Classic
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => handlePlayAudio('legacy')}
                disabled={isLegacyEnabled}
                className={`w-10 h-10 cursor-pointer rounded-full flex items-center justify-center disabled:opacity-50
                  ${
                    playingAudio === 'legacy'
                      ? 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}
              >
                {playingAudio === 'legacy' ? (
                  <Spinner className="animate-spin" />
                ) : (
                  <Play weight="fill" size={14} />
                )}
              </button>

              <div className="w-full">
                {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
                <audio
                  ref={legacyAudioRef}
                  src={data.cries.legacy}
                  onTimeUpdate={e => updateProgress('legacy', e)}
                  onEnded={handleAudioEnded}
                />
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-500 h-full transition-all duration-100"
                    style={{ width: `${progress.legacy}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
