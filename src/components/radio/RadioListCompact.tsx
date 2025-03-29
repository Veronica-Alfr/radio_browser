import { useEffect, useMemo, useState } from "react";
import { IRadioStation } from "../../interface/IRadio";
import { Pagination } from "../pagination/Pagination";
import { SearchBar } from "../search/SearchBar";
import { RadioCardCompact } from "./RadioCardCompact";
import { fetchRadioOneThousand } from "../../api/radioListRequest";
import { useRadiosOneThousand } from "../../hooks/useRadios";
import { useDebounce } from "../../hooks/useDebounce";
import { useQueryClient } from "@tanstack/react-query";

export const RadioListCompact: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const params = {limit: itemsPerPage, offset: currentPage * itemsPerPage};

  const { data, isLoading, isError } = useRadiosOneThousand(params);

  useEffect(() => {
    const nextPage = currentPage + 1;
    const nextParams = {
      limit: itemsPerPage,
      offset: nextPage * itemsPerPage
    };

    queryClient.prefetchQuery({
      queryKey: ['radios-compact', nextParams.offset],
      queryFn: () => fetchRadioOneThousand(nextParams),
    });
  }, [currentPage, queryClient]);

  const filteredStations = useMemo(() => {
    if (!data?.stations) return [];
    return debouncedSearchTerm
      ? data.stations.filter((station: IRadioStation) =>
          station.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          station.country.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          station.language.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )
      : data.stations;
  }, [data, debouncedSearchTerm]);

  const paginatedStations = filteredStations.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageChange = (newOffset: number) => {
    const newPage = Math.floor(newOffset / itemsPerPage);
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [debouncedSearchTerm]);

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

      <div className="mb-1 h-[calc(100vh-200px)] overflow-y-auto 
              scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent">
        {isLoading ? (
          <div className="flex justify-center items-center h-20">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="">
              {paginatedStations.map((radio: IRadioStation) => (
                <RadioCardCompact 
                  key={radio.stationuuid}
                  radio={radio} 
                />
              ))}
          </div>
        )}
      </div>

      <div className="mt-2 mb-2">
        <Pagination
          currentOffset={currentPage * itemsPerPage}
          limit={itemsPerPage}
          totalItems={data?.totalItems || 0}
          isSmallScreen={true}
          isLoading={isLoading}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};
