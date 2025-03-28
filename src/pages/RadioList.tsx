import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { IRadioStation } from '../interface/IRadio';
import { RadioCard } from '../components/radio/RadioCard';
import { Pagination } from '../components/pagination/Pagination';
import { useRadios } from '../hooks/useRadios';
import { SearchBar } from '../components/search/SearchBar';
import { fetchRadioList } from '../api/radioListRequest';

export const RadioList: React.FC = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['radios'],
      queryFn: fetchRadioList,
    });
  }, [queryClient]);

  const { data, isLoading, isError } = useRadios();

  const filteredStations = data?.stations?.filter((station: IRadioStation) =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const paginatedStations = filteredStations.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageChange = (newOffset: number) => {
    const newPage = Math.floor(newOffset / itemsPerPage);
    setCurrentPage(newPage);
    
    if (newPage < Math.floor(filteredStations.length / itemsPerPage)) {
      queryClient.prefetchQuery({
        queryKey: ['radios'],
        queryFn: fetchRadioList,
      });
    }
  };

  if (isError) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-500 text-center py-8">
          Error loading radio stations. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center font-bold mb-4 sm:mb-6">
        Radio Browser
      </h1>
      
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {isLoading ? (
        <div className="text-center py-8">Loading radio stations...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 sm:mb-8 justify-items-center">
            {paginatedStations.map((radio: IRadioStation) => (
              <RadioCard key={radio.stationuuid} radio={radio} />
            ))}
          </div>

          <Pagination
            currentOffset={currentPage * itemsPerPage}
            limit={itemsPerPage}
            totalItems={filteredStations.length}
            isLoading={isLoading}
            onChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};
