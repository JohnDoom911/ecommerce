"use client";

type PaginationProps = {
  skip: number;
  total: number;
  limit: number;
  onPrev: () => void;
  onNext: () => void;
};

export const Pagination = ({ skip, total, limit, onPrev, onNext }: PaginationProps) => {
  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <div className="mt-12 flex items-center justify-center gap-4">
      <button
        onClick={onPrev}
        disabled={skip === 0}
        className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium shadow-sm disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
      >
        &larr; Previous
      </button>
      <span className="text-sm font-medium text-zinc-500">
        Page {currentPage} / {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={skip + limit >= total}
        className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium shadow-sm disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
      >
        Next &rarr;
      </button>
    </div>
  );
};