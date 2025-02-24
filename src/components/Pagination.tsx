interface PaginationProps {
  page: number
  setPage: (newPage: number | ((prev: number) => number)) => void
}

export function Pagination({ page, setPage }: PaginationProps) {
  return (
    <div className="flex flex-row items-center justify-center gap-4 p-2">
      <button
        type="button"
        onClick={() => setPage(prev => Math.max(prev - 1, 0))}
        disabled={page === 0}
        className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer
          disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="text-lg font-bold">Página {page + 1}</span>
      <button
        type="button"
        onClick={() => setPage(prev => prev + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer 
          disabled:cursor-not-allowed"
      >
        Próximo
      </button>
    </div>
  )
}
