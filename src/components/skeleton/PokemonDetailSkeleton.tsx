export function PokemonDetailSkeleton() {
  return (
    <div className="flex flex-col items-center gap-6">
      <SkeletonHeader />
      <main className="w-[90%] md:w-[50%] lg:w-[50%] max-w-auto rounded-2xl overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
        <SkeletonBasicInfo />
        <SkeletonDetailImage />
        <SkeletonTabs />
      </main>
    </div>
  )
}

function SkeletonHeader() {
  return (
    <header className="p-4 w-full bg-gray-300 animate-pulse flex items-center justify-between shadow-md">
      <div className="w-32 h-8 bg-gray-400 rounded-md" />
      <div className="w-24 h-8 bg-gray-400 rounded-md" />
    </header>
  )
}

function SkeletonBasicInfo() {
  return (
    <header className="bg-gray-300 animate-pulse p-4">
      <div className="flex flex-col gap-2">
        <div className="w-16 h-6 bg-gray-400 rounded-md" />
        <div className="w-32 h-8 bg-gray-400 rounded-md" />
        <div className="flex flex-row gap-2">
          <div className="w-16 h-6 bg-gray-400 rounded-full" />
          <div className="w-16 h-6 bg-gray-400 rounded-full" />
        </div>
      </div>
    </header>
  )
}

function SkeletonDetailImage() {
  return (
    <div className="w-full bg-gray-300 animate-pulse p-8 flex flex-col items-center">
      <div className="w-64 h-64 bg-gray-400 rounded-md" />
      <div className="flex flex-row gap-2 justify-center items-center p-4">
        {[...Array(4)].map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <div key={index} className="w-16 h-16 bg-gray-400 rounded-xl" />
        ))}
      </div>
    </div>
  )
}

function SkeletonTabs() {
  return (
    <div className="w-full">
      <nav className="flex gap-6 border-b border-gray-300 overflow-x-auto overflow-y-hidden whitespace-nowrap animate-pulse">
        {[...Array(4)].map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <div key={index} className="w-20 h-8 bg-gray-400 rounded-md" />
        ))}
      </nav>
      <div className="p-4">
        <div className="w-full h-40 bg-gray-400 rounded-md" />
      </div>
    </div>
  )
}
