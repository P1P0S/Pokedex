export function PokemonEvolutionChainSkeleton() {
  return (
    <div className="p-5 bg-white rounded-lg shadow-lg animate-pulse">
      <h2 className="capitalize text-xl gap-2 font-bold mb-4 text-green-600 flex items-center">
        <div className="w-6 h-6 bg-green-300 rounded-full" />
        <div className="h-6 w-48 bg-gray-300 rounded-md" />
      </h2>

      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col justify-center items-center">
          <div className="w-44 h-52 bg-gray-200 rounded-xl" />

          <div className="flex justify-center mt-6">
            <div className="w-8 h-8 bg-gray-300 rounded-md" />
          </div>
        </div>

        <div className="flex flex-row flex-wrap justify-center gap-6">
          <div className="w-44 h-52 bg-gray-200 rounded-xl" />
          <div className="w-44 h-52 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  )
}
