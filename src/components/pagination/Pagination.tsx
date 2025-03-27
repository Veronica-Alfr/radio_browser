import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { IPagination } from "../../interface/IPagination";

export const Pagination = ({ 
  currentOffset, 
  limit, 
  totalItems,
  isLoading, 
  isSmallScreen,
  onChange,
}: IPagination) => {
  const currentPage = Math.floor(currentOffset / limit) + 1;
  const totalPages = Math.ceil(totalItems / limit);
  
  const middleButtonsCount = isSmallScreen ? 2 : 3;

  const handlePageChange = (pageNumber: number) => {
    onChange((pageNumber - 1) * limit);
  };

  const getMiddleButtons = () => {
    if (totalPages <= 2) return [];
    
    let start = Math.max(2, currentPage - Math.floor(middleButtonsCount/2));
    let end = Math.min(totalPages - 1, start + middleButtonsCount - 1);
    
    start = Math.max(2, end - middleButtonsCount + 1);
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className={`flex items-center justify-center gap-1 ${isSmallScreen ? 'text-sm' : 'md:gap-2'}`}>
      <button
        onClick={() => onChange(currentOffset - limit)}
        disabled={currentOffset === 0 || isLoading}
        className={`flex items-center justify-center px-2 py-1 rounded-md border border-gray-800 
          bg-gray-900 text-white disabled:opacity-50 hover:bg-gray-800 transition-colors ${
          isSmallScreen ? 'text-xs' : 'text-sm'
        }`}
      >
        <SlArrowLeft className={isSmallScreen ? "text-base" : "text-xl"} />
      </button>

      <button
        onClick={() => handlePageChange(1)}
        disabled={isLoading}
        className={`px-2 py-1 rounded-md border ${
          currentPage === 1
            ? 'bg-black text-white border-black'
            : 'border-gray-800 bg-gray-900 text-white hover:bg-gray-800'
        } ${isSmallScreen ? 'text-xs' : 'text-sm'}`}
      >
        1
      </button>

      {currentPage > 2 + Math.floor(middleButtonsCount/2) && totalPages > middleButtonsCount + 2 && (
        <span className="px-1">...</span>
      )}

      {getMiddleButtons().map(page => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={isLoading}
          className={`px-2 py-1 rounded-md border ${
            currentPage === page
              ? 'bg-black text-white border-black'
              : 'border-gray-800 bg-gray-900 text-white hover:bg-gray-800'
          } ${isSmallScreen ? 'text-xs' : 'text-sm'}`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages - 1 - Math.floor(middleButtonsCount/2) && totalPages > middleButtonsCount + 2 && (
        <span className="px-1">...</span>
      )}

      {totalPages > 1 && (
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={isLoading}
          className={`px-2 py-1 rounded-md border ${
            currentPage === totalPages
              ? 'bg-black text-white border-black'
              : 'border-gray-800 bg-gray-900 text-white hover:bg-gray-800'
          } ${isSmallScreen ? 'text-xs' : 'text-sm'}`}
        >
          {totalPages}
        </button>
      )}

      <button
        onClick={() => onChange(currentOffset + limit)}
        disabled={isLoading || currentOffset + limit >= totalItems}
        className={`flex items-center justify-center px-2 py-1 rounded-md border border-gray-800 bg-gray-900 text-white disabled:opacity-50 hover:bg-gray-800 transition-colors ${
          isSmallScreen ? 'text-xs' : 'text-sm'
        }`}
      >
        <SlArrowRight className={isSmallScreen ? "text-base" : "text-xl"} height={isSmallScreen ? 16 : 24} />
      </button>
    </div>
  );
};