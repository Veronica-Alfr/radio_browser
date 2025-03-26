// import { IPagination } from "../interface/IPagination";

import { IPagination } from "../interface/IPagination";

// export const Pagination = ({
//   currentOffset,
//   limit,
//   totalItems,
//   onChange,
// }: IPagination) => {
//   const currentPage = Math.floor(currentOffset / limit) + 1;
//   const totalPages = Math.ceil(totalItems / limit);
//   const maxVisiblePages = 5;

//   const handlePrevious = () => {
//     onChange(Math.max(0, currentOffset - limit));
//   };

//   const handleNext = () => {
//     onChange(currentOffset + limit);
//   };

//   const handlePageClick = (page: number) => {
//     onChange((page - 1) * limit);
//   };

//   const getPageNumbers = () => {
//     const pages = [];
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(i);
//     }

//     return pages;
//   };

//   return (
//     <div className="flex items-center justify-center gap-2 mt-6">
//       <button
//         onClick={handlePrevious}
//         disabled={currentOffset === 0}
//         className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//       >
//         Previous
//       </button>

//       {getPageNumbers().map((page) => (
//         <button
//           key={page}
//           onClick={() => handlePageClick(page)}
//           className={`px-4 py-2 rounded-md border ${
//             currentPage === page
//               ? 'bg-blue-500 text-white border-blue-500'
//               : 'border-gray-300 hover:bg-gray-50'
//           }`}
//         >
//           {page}
//         </button>
//       ))}

//       <button
//         onClick={handleNext}
//         disabled={currentOffset + limit >= totalItems}
//         className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//       >
//         Next
//       </button>
//     </div>
//   );
// };


export const Pagination = ({ currentOffset, limit, totalItems, onChange }: IPagination) => {
  const currentPage = currentOffset / limit + 1;
  const totalPages = Math.ceil(totalItems / limit);
  const paginationGroupSize = 5; // Show 5 page buttons at a time

  const startPage = Math.floor((currentPage - 1) / paginationGroupSize) * paginationGroupSize + 1;
  const endPage = Math.min(startPage + paginationGroupSize - 1, totalPages);

  const handlePageClick = (page: number) => {
    onChange((page - 1) * limit);
  };

  const handleNextGroup = () => {
    if (endPage < totalPages) {
      handlePageClick(startPage + paginationGroupSize);
    }
  };

  const handlePreviousGroup = () => {
    if (startPage > 1) {
      handlePageClick(startPage - paginationGroupSize);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={handlePreviousGroup}
        disabled={startPage === 1}
        className="py-1 px-3 bg-gray-200 hover:bg-gray-300 rounded"
      >
        {'<'}
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, idx) => {
        const pageNumber = startPage + idx;
        return (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={`py-1 px-3 rounded ${pageNumber === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={handleNextGroup}
        disabled={endPage === totalPages}
        className="py-1 px-3 bg-gray-200 hover:bg-gray-300 rounded"
      >
        {'>'}
      </button>
    </div>
  );
};
