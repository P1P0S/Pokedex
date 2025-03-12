export function PokemonMoveCardSkeleton() {
  return (
    <div className="mb-3 bg-gray-200 rounded-lg shadow overflow-hidden border border-gray-100 p-4 animate-pulse">
      <div className="flex justify-between items-center mb-2">
        <div className="h-4 w-32 bg-gray-300 rounded-md" />
        <div className="h-5 w-12 bg-gray-300 rounded-full" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="h-6 w-16 bg-gray-300 rounded-md" />
          <div className="h-6 w-16 bg-gray-300 rounded-md" />
        </div>

        <div className="flex items-center gap-4 sm:gap-6 sm:ml-auto mt-2 sm:mt-0">
          <div className="flex flex-col items-center">
            <div className="h-6 w-6 bg-gray-300 rounded-md" />
            <div className="h-3 w-12 bg-gray-300 rounded-md mt-1" />
          </div>

          <div className="flex flex-col items-center">
            <div className="h-6 w-6 bg-gray-300 rounded-md" />
            <div className="h-3 w-12 bg-gray-300 rounded-md mt-1" />
          </div>
        </div>
      </div>
    </div>
  )
}
