import { ArrowFatLeft, ArrowFatRight } from '@phosphor-icons/react'

interface PaginationProps {
  page: number
  setPage: (newPage: number | ((prev: number) => number)) => void
}

export function Pagination({ page, setPage }: PaginationProps) {
  return (
    <div className="flex flex-row items-center justify-center gap-6 p-4">
      <button
        type="button"
        onClick={() => setPage(prev => Math.max(prev - 1, 0))}
        disabled={page === 0}
        className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white font-bold 
          rounded-full shadow-lg border-4 border-white 
          active:scale-95 transition-all duration-150
          disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <ArrowFatLeft />
        Back
      </button>

      <span className="text-xl font-bold text-gray-800">
        Page {`${page + 1}`.padStart(2, '0')}
      </span>

      <button
        type="button"
        onClick={() => setPage(prev => prev + 1)}
        className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white font-bold 
          rounded-full shadow-lg border-4 border-white 
          active:scale-95 transition-all duration-150 cursor-pointer"
      >
        Next
        <ArrowFatRight />
      </button>
    </div>
  )
}
