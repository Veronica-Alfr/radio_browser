import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { IPagination } from "../../interface/IPagination";
import { ButtonPagination } from "../button/ButtonPagination";

export const Pagination = ({currentOffset, limit, totalItems, isLoading, isSmallScreen, onChange}: IPagination) => {
  const currentPage = Math.floor(currentOffset / limit) + 1;
  const totalPages = Math.ceil(totalItems / limit);

  const middleButtonsCount = isSmallScreen ? 2 : 3;

  const handlePageChange = (pageNumber: number) => {
    onChange((pageNumber - 1) * limit);
  };

  const getMiddleButtons = () => {
    if (totalPages <= 2) return [];

    let start = Math.max(2, currentPage - Math.floor(middleButtonsCount / 2));
    let end = Math.min(totalPages - 1, start + middleButtonsCount - 1);

    start = Math.max(2, end - middleButtonsCount + 1);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className={`flex items-center justify-center gap-1 ${isSmallScreen ? 'text-sm' : 'md:gap-2'}`}>
      
      <button
        onClick={() => !isLoading && currentOffset > 0 && onChange(currentOffset - limit)}
        disabled={currentOffset === 0 || isLoading}
        aria-label="Previous page"
        className={`rounded-md border border-gray-800 bg-gray-900 w-10 flex items-center justify-center 
          disabled:opacity-50 hover:bg-gray-800 transition-colors ${
          isSmallScreen ? 'h-7' : 'h-10'
        }`}
      >
        <SlArrowLeft className={`text-white ${
          currentOffset === 0 || isLoading ? 'opacity-50' : ''
        } ${
          isSmallScreen ? 'text-base' : 'text-lg'
        }`} />
      </button>

      <ButtonPagination
        onClick={() => handlePageChange(1)}
        disabled={isLoading}
        isSmallScreen={isSmallScreen}
        isActive={currentPage === 1}
      >
        1
      </ButtonPagination>

      {getMiddleButtons().map(page => (
        <ButtonPagination
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={isLoading}
          isSmallScreen={isSmallScreen}
          isActive={currentPage === page}
        >
          {page}
        </ButtonPagination>
      ))}

      {totalPages > 1 && (
        <ButtonPagination
          onClick={() => handlePageChange(totalPages)}
          disabled={isLoading}
          isSmallScreen={isSmallScreen}
          isActive={currentPage === totalPages}
        >
          {totalPages}
        </ButtonPagination>
      )}

      <button
        onClick={() => !isLoading && currentOffset + limit < totalItems && onChange(currentOffset + limit)}
        disabled={isLoading || currentOffset + limit >= totalItems}
        aria-label="Next page"
        className={`rounded-md border border-gray-800 bg-gray-900 w-10 flex items-center justify-center 
          disabled:opacity-50 hover:bg-gray-800 transition-colors ${
          isSmallScreen ? 'h-7' : 'h-10'
        }`}
      >
        <SlArrowRight className={`text-white ${isLoading || currentOffset + limit >= totalItems ? 'opacity-50' : ''}`} />
      </button>
      
    </div>
  );
};
