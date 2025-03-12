import type { PokemonDetail } from '../types/pokemon'

type PokemonBasicInfoProps = {
  data: PokemonDetail
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
          {data.name.replace('-', ' ')}
        </div>
        <div className="flex flex-row gap-2">
          {data?.types.map(({ type }) => {
            const pillClass =
              typeColors[type.name]?.pill ?? typeColors.normal.pill
            return (
              <span
                key={type.name}
                className={`text-slate-50 ${pillClass} font-bold text-sm px-2 py-1 rounded-2xl uppercase`}
              >
                {type.name}
              </span>
            )
          })}
        </div>
      </div>
    </header>
  )
}
