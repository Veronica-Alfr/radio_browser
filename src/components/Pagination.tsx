import { IPagination } from "../interface/IPagination";

export const Pagination = ({ currentOffset, limit, hasMore, isLoading, onChange }: IPagination) => {
  const currentPage = Math.floor(currentOffset / limit) + 1;
  const maxPageButtons = 5;

  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));

    for (let i = 0; i < maxPageButtons; i++) {
      const page = startPage + i;
      if (page > 0) {
        pages.push(page);
      }
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentOffset >= limit) {
      onChange(currentOffset - limit);
    }
  };

  const handleNext = () => {
    if (hasMore) {
      onChange(currentOffset + limit);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    const newOffset = (pageNumber - 1) * limit;
    onChange(newOffset);
  };

  const handleFirstPage = () => {
    onChange(0);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={handlePrevious}
        disabled={currentOffset === 0 || isLoading}
        className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
      >
        Previous
      </button>

      {currentPage > 3 && (
        <button
          onClick={handleFirstPage}
          disabled={isLoading}
          className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
        >
          1° Page
        </button>
      )}

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={isLoading}
          className={`px-4 py-2 rounded-md border ${currentPage === page ? 'bg-blue-500 text-white' : 'border-gray-300'} disabled:opacity-50 hover:bg-gray-50`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={!hasMore || isLoading}
        className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
      >
        Next
      </button>
    </div>
  );
};
