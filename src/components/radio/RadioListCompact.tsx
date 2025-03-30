import { useEffect } from "react";
import { IRadioStation } from "../../interface/IRadio";
import { Pagination } from "../pagination/Pagination";
import { SearchBar } from "../search/SearchBar";
import { useQueryClient } from "@tanstack/react-query";
import { fetchRadioList } from "../../api/radioListRequest";
import { useRadioCompactContext } from "../../hooks/useRadiosContext";
import { RadioCardCompact } from "./RadioCardCompact";

export const RadioListCompact: React.FC = () => {
  const queryClient = useQueryClient();
  
  const { searchTerm, setSearchTerm, currentPage, setCurrentPage, paginatedStations, 
    isLoading, isError, totalItems } = useRadioCompactContext();

  const itemsPerPage = 10;
  const limit = {limit: 100};

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['radios-compact', limit],
      queryFn: () => fetchRadioList(limit),
    });
  }, [currentPage, queryClient]);

  const handlePageChange = (newOffset: number) => {
    const newPage = Math.floor(newOffset / itemsPerPage);
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm, setCurrentPage]);

  if (isError) {
    return (
      <div className="p-4">
        <div className="text-red-500 text-center py-4 text-sm">
          Error loading stations. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-2">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="mb-1 h-[calc(100vh-200px)] overflow-y-auto pr-1
              scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent">
        {isLoading ? (
          <div className="flex justify-center items-center h-20">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div>
            {paginatedStations.map((radio: IRadioStation) => (
              <RadioCardCompact radio={radio} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-2 mb-2">
        <Pagination
          currentOffset={currentPage * itemsPerPage}
          limit={itemsPerPage}
          totalItems={totalItems || 100}
          isSmallScreen={true}
          isLoading={isLoading}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};
