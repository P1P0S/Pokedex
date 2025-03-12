type PokemonGridSkeletonProps = {
  len: number
}

export function PokemonGridSkeleton({ len }: PokemonGridSkeletonProps) {
  const skeletonCards = Array.from({ length: len }, (_, i) => i)

  return (
    <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {skeletonCards.map(card => (
        <div
          key={card}
          className="relative rounded-xl p-4 flex flex-col items-center w-44 overflow-hidden border border-gray-300 bg-gray-200 animate-pulse"
        >
          <div className="w-12 h-4 bg-gray-300 rounded mb-4" />

          <div className="w-24 h-24 bg-gray-300 rounded-full mb-4" />

          <div className="w-20 h-6 bg-gray-300 rounded mb-4" />

          <div className="flex gap-2">
            <div className="w-16 h-4 bg-gray-300 rounded-full" />
            <div className="w-16 h-4 bg-gray-300 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  )
}
