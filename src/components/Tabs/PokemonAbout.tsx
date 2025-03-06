import { Lightning, Megaphone, Play, Spinner } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { usePokemonDetail } from '../../hooks/usePokemonDetail'

export function PokemonAbout() {
  const { data, isLoading, error } = usePokemonDetail()
  const [isLegacyEnabled, setIsLegacyEnabled] = useState(true)
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)
  const [isLatestEnabled, setIsLatestEnabled] = useState(true)
  const [progress, setProgress] = useState<Record<string, number>>({
    latest: 0,
    legacy: 0,
  })

  const latestAudioRef = useRef<HTMLAudioElement>(null)
  const legacyAudioRef = useRef<HTMLAudioElement>(null)

  if (isLoading)
    return <div className="p-4 text-center text-gray-500">Loading about...</div>
  if (error || !data) {
    return (
      <div className="p-4 text-center text-red-500">
        Error while fetching about
      </div>
    )
  }

  useEffect(() => {
    if (data?.cries) {
      setIsLatestEnabled(!data.cries.latest)
      setIsLegacyEnabled(!data.cries.legacy)
    }
  }, [data])

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
    <div className="p-5 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-xl gap-2 font-bold mb-4 text-green-600 flex items-center">
        <Lightning weight="fill" />
        About Pokémon
      </h2>

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

          <div className="max-h-60 overflow-y-auto pr-2 rounded-md">
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
    </div>
  )
}
