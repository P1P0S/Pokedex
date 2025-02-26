import type { PokemonCardData } from '../utils/parsePokemonFrontPage'

type PokemonBasicInfoProps = {
  data: PokemonCardData
  backgroundClass: string
  typeColors: Record<string, { card: string; pill: string }>
}

export function PokemonBasicInfo({
  data,
  backgroundClass,
  typeColors,
}: PokemonBasicInfoProps) {
  return (
    <header className={`${backgroundClass}`}>
      <div className="flex flex-col gap-2 p-4">
        <div className="text-slate-50 font-bold text-md">{`#${String(data?.id).padStart(4, '0')}`}</div>
        <div className="text-slate-50 font-bold text-3xl capitalize">
          {data?.name}
        </div>
        <div className="flex flex-row gap-2">
          {data?.types.map(type => {
            const pillClass = typeColors[type]?.pill ?? typeColors.normal.pill
            return (
              <span
                key={type}
                className={`text-slate-50 ${pillClass} font-bold text-sm px-2 py-1 rounded-2xl uppercase`}
              >
                {type}
              </span>
            )
          })}
        </div>
      </div>
    </header>
  )
}
