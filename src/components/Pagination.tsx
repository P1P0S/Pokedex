import { ArrowFatLeft, ArrowFatRight } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { usePokemonList } from '../hooks/usePokemonList'

interface PaginationProps {
  page: number
  setPage: (newPage: number | ((prev: number) => number)) => void
}

const POKEMON_PER_PAGE = 20

export function Pagination({ page, setPage }: PaginationProps) {
  const { data, isFetching } = usePokemonList(page)
  const totalPages = data?.count ? Math.ceil(data.count / POKEMON_PER_PAGE) : 0

  const [inputPage, setInputPage] = useState(page + 1)

  useEffect(() => {
    setInputPage(page + 1)
  }, [page])

  const goToPage = (newPage: number) => {
    const validatedPage = Math.max(1, Math.min(newPage, totalPages))

    if (validatedPage !== inputPage) {
      setInputPage(validatedPage)
    }

    if (validatedPage >= 1 && validatedPage <= totalPages) {
      setPage(validatedPage - 1)
    }
  }

  const goToNextPage = () => {
    if (data?.next) {
      setPage(prev => prev + 1)
    }
  }

  const goToPreviousPage = () => {
    if (data?.previous) {
      setPage(prev => Math.max(prev - 1, 0))
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={goToPreviousPage}
          disabled={!data?.previous || isFetching}
          className={`flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-bold 
            rounded-full shadow-lg border-2 border-white 
            transition-all duration-200 
            ${
              !data?.previous || isFetching
                ? 'opacity-50 cursor-not-allowed bg-gray-400'
                : 'hover:bg-blue-600 active:scale-95 cursor-pointer hover:shadow-xl'
            }`}
          aria-label="Go to previous page"
        >
          <ArrowFatLeft weight="bold" />
          <span className="hidden sm:inline">Back</span>
        </button>

        <div className="flex items-center gap-2">
          {(() => {
            let start = Math.max(0, page - 2)
            const end = Math.min(start + 4, totalPages - 1)

            if (end - start < 4) {
              start = Math.max(0, end - 4)
            }

            return Array.from(
              { length: end - start + 1 },
              (_, i) => start + i
            ).map(pageNum => (
              <button
                type="button"
                key={pageNum}
                onClick={() => setPage(pageNum)}
                disabled={isFetching}
                className={`w-10 h-10 flex items-center justify-center rounded-full 
                  transition-all duration-150 font-bold cursor-pointer
                  ${
                    page === pageNum
                      ? 'bg-blue-600 text-white scale-110 shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                aria-label={`Go to page ${pageNum + 1}`}
                aria-current={page === pageNum ? 'page' : undefined}
              >
                {pageNum + 1}
              </button>
            ))
          })()}
        </div>

        <button
          type="button"
          onClick={goToNextPage}
          disabled={!data?.next || isFetching}
          className={`flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-bold 
            rounded-full shadow-lg border-2 border-white 
            transition-all duration-200
            ${
              !data?.next || isFetching
                ? 'opacity-50 cursor-not-allowed bg-gray-400'
                : 'hover:bg-blue-600 active:scale-95 cursor-pointer hover:shadow-xl'
            }`}
          aria-label="Go to next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ArrowFatRight weight="bold" />
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
        Page
        <input
          type="number"
          value={inputPage}
          min={1}
          max={totalPages}
          onChange={e => setInputPage(Number(e.target.value))}
          onKeyDown={e => e.key === 'Enter' && goToPage(inputPage)}
          className="w-12 text-center border border-gray-300 rounded-md focus:outline-none
           focus:ring-2 focus:ring-blue-500"
        />
        of {totalPages}
        <button
          type="button"
          onClick={() => goToPage(inputPage)}
          className="ml-2 px-3 py-1 text-xs font-medium bg-blue-500 text-white rounded-md
           hover:bg-blue-600 transition-all cursor-pointer hover:shadow-md"
        >
          Go
        </button>
      </div>
    </div>
  )
}
