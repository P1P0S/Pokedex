import { Lightning } from '@phosphor-icons/react'
import { usePokemonAbout } from '../../hooks/usePokemonAbout'
import { usePokemonDetail } from '../../hooks/usePokemonDetail'
import { PokemonCries } from '../PokemonCries'

export function PokemonAbout() {
  const { data, isLoading, error } = usePokemonDetail()
  const { data: aboutData } = usePokemonAbout(data?.name || '')

  if (isLoading)
    return <div className="p-4 text-center text-gray-500">Loading about...</div>
  if (error || !data) {
    return (
      <div className="p-4 text-center text-red-500">
        Error while fetching about
      </div>
    )
  }

  const englishFlavorTexts =
    aboutData?.flavor_text_entries?.filter(
      entry => entry.language?.name === 'en'
    ) || []

  const lastFlavorText =
    englishFlavorTexts.length > 0
      ? englishFlavorTexts[englishFlavorTexts.length - 1].flavor_text?.replace(
          /\f/g,
          ' '
        )
      : 'No description available.'

  return (
    <div className="p-5 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl gap-2 font-bold mb-4 text-green-600 flex items-center">
        <Lightning weight="fill" size={24} />
        About Pokémon
      </h2>

      <div className="bg-green-50 p-4 rounded-lg mb-6 border-l-4 border-green-300">
        <p className="text-gray-700 font-bold italic">{lastFlavorText}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="font-medium text-gray-600">Base Happiness</span>
          <p className="font-bold text-xl">
            {aboutData?.base_happiness || '—'}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="font-medium text-gray-600">Capture Rate</span>
          <p className="font-bold text-xl">
            {`${aboutData?.capture_rate}%` || '—'}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="font-medium text-gray-600">Growth Rate</span>
          <p className="font-bold text-xl capitalize">
            {aboutData?.growth_rate?.name?.replace('-', ' ') || '—'}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="font-medium text-gray-600">Generation</span>
          <p className="font-bold text-xl">
            {aboutData?.generation?.name
              ?.replace('-', ' ')
              .toUpperCase()
              .replace('GENERATION ', 'Generation ') || '—'}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="font-medium text-gray-600">Habitat</span>
          <p className="font-bold text-xl capitalize">
            {aboutData?.habitat?.name || '—'}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="font-medium text-gray-600">Evolves From</span>
          <p className="font-bold text-xl">
            {aboutData?.evolves_from_species
              ? aboutData.evolves_from_species.name
              : 'Base form'}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <PokemonCries data={data} />
      </div>
    </div>
  )
}
