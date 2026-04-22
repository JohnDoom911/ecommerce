type PaginationProps = {
  handlePrev: () => void;
  handleNext: () => void;
  totalPages: number;
  currentPage: number;
};

export const Pagination = ({ handlePrev, handleNext, totalPages, currentPage }: PaginationProps) => {
  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <button 
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc300 dark:bg-zinc-800"
        >
          &larr; Previous
        </button>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          Page {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc300 dark:bg-zinc-800"
          >Next &rarr;
          </button>
    </div>
  );
};