import { IPagination } from "../interface/IPagination";

export const Pagination = ({ 
  currentOffset, 
  limit, 
  totalItems,
  isLoading, 
  onChange 
}: IPagination) => {
  const currentPage = Math.floor(currentOffset / limit) + 1;
  const maxPageButtons = 5;
  const totalPages = Math.ceil(totalItems / limit);

  const getPageNumbers = () => {
    const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);
    
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const handlePageChange = (pageNumber: number) => {
    onChange((pageNumber - 1) * limit);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onChange(currentOffset - limit)}
        disabled={currentOffset === 0 || isLoading}
        className={`px-4 py-2 rounded-md border border-gray-800 bg-gray-900 text-white disabled:opacity-50 hover:bg-gray-800 transition-colors`}
      >
        Previous
      </button>

      {currentPage > 3 && totalPages > maxPageButtons && (
        <button
          onClick={() => handlePageChange(1)}
          disabled={isLoading}
          className="px-4 py-2 rounded-md border border-gray-800 bg-gray-900 text-white hover:bg-gray-800 transition-colors"
        >
          1
        </button>
      )}

      {getPageNumbers().map(page => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={isLoading}
          className={`px-4 py-2 rounded-md border ${
            currentPage === page 
              ? 'bg-black text-white border-black' 
              : 'border-gray-800 bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onChange(currentOffset + limit)}
        disabled={isLoading || currentOffset + limit >= totalItems}
        className={`px-4 py-2 rounded-md border border-gray-800 bg-gray-900 text-white disabled:opacity-50 hover:bg-gray-800 transition-colors`}
      >
        Next
      </button>
    </div>
  );
};