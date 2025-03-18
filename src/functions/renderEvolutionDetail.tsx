import {
  ArrowFatDown,
  ArrowRight,
  Flask,
  GenderFemale,
  GenderMale,
  Handshake,
  Heart,
  Lightning,
  MapPin,
  Moon,
  Star,
  Sun,
  Sword,
} from '@phosphor-icons/react'
import type { JSX } from 'react/jsx-runtime'
import type { EvolutionDetail } from '../types/pokemon'

interface RenderEvolutionDetailsProps {
  details: EvolutionDetail[]
}

function formatText(value?: string | number | null) {
  if (typeof value === 'string') {
    return value.replace('-', ' ').replace(/\b\w/g, char => char.toUpperCase())
  }
  return value
}

function renderDetail(
  label: string,
  value?: string | number | null,
  icon?: JSX.Element
) {
  if (value == null) return null

  return (
    <div className="flex items-center gap-2">
      {icon}
      <strong>{label}:</strong> {formatText(value)}
    </div>
  )
}

export function renderEvolutionDetails({
  details,
}: RenderEvolutionDetailsProps) {
  if (!details || details.length === 0) {
    return null
  }

  return (
    <div className="p-4 bg-gray-50 shadow-md w-full max-w-sm rounded-md">
      <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2 mb-3">
        <Lightning weight="fill" size={20} />
        Evolution Details
      </h3>

      <ul className="space-y-2">
        {details.map((detail, index) => (
          <li key={index} className="border-t border-gray-300 pt-2">
            {renderDetail(
              'Trigger',
              detail.trigger?.name,
              <ArrowRight size={16} className="text-blue-500" />
            )}
            {renderDetail(
              'Min Level',
              detail.min_level,
              <Star size={16} className="text-yellow-500" />
            )}
            {renderDetail(
              'Evolution Item',
              detail.item?.name,
              <Flask size={16} className="text-purple-500" />
            )}
            {renderDetail(
              'Held Item',
              detail.held_item?.name,
              <Lightning size={16} className="text-purple-500" />
            )}
            {renderDetail(
              'Min Happiness',
              detail.min_happiness,
              <Heart size={16} className="text-pink-500" />
            )}
            {renderDetail('Min Beauty', detail.min_beauty)}
            {renderDetail(
              'Min Affection',
              detail.min_affection,
              <Heart size={16} className="text-pink-500" />
            )}
            {renderDetail(
              'Location',
              detail.location?.name,
              <MapPin size={16} className="text-red-500" />
            )}
            {renderDetail(
              'Required Move',
              detail.known_move?.name,
              <Sword size={16} className="text-green-500" />
            )}
            {renderDetail(
              'Required Move Type',
              detail.known_move_type?.name,
              <Sword size={16} className="text-green-500" />
            )}

            {detail.time_of_day && (
              <div className="flex items-center gap-2">
                {detail.time_of_day === 'day' ? (
                  <Sun size={16} className="text-yellow-500" />
                ) : (
                  <Moon size={16} className="text-gray-500" />
                )}
                <strong>Time of Day:</strong> {formatText(detail.time_of_day)}
              </div>
            )}

            {detail.gender != null && (
              <div className="flex items-center gap-2">
                {detail.gender === 1 ? (
                  <GenderFemale size={16} className="text-pink-500" />
                ) : (
                  <GenderMale size={16} className="text-blue-500" />
                )}
                <strong>Gender:</strong>{' '}
                {detail.gender === 1 ? 'Female' : 'Male'}
              </div>
            )}

            {renderDetail(
              'Trade with',
              detail.trade_species?.name,
              <Handshake size={16} className="text-cyan-500" />
            )}

            {detail.turn_upside_down && (
              <div className="flex items-center gap-2">
                <ArrowFatDown size={16} className="text-gray-700" />
                <strong>Upside Down:</strong>{' '}
                {detail.turn_upside_down ? 'Yes' : 'No'}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
