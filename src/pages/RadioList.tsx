import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { IRadioStation } from '../interface/IRadio';
import { RadioCard } from '../components/radio/RadioCard';
import { Pagination } from '../components/pagination/Pagination';
import { SearchBar } from '../components/search/SearchBar';
import { fetchRadioList } from '../api/radioListRequest';
import { useRadioContext } from '../hooks/useRadiosContext';
import { HamburgerMenu } from '../components/navigation/HamburgerMenu';
import { LoadingCard } from '../components/loading/LoadingCards';

export const RadioList: React.FC = () => {
  const queryClient = useQueryClient();
  const { currentPage, setCurrentPage, paginatedStations, isLoading, isFetching, isError, searchTerm,
    setSearchTerm, totalItems } = useRadioContext();

  const itemsPerPage = 10;

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['radios'],
      queryFn: () => fetchRadioList,
    });
  }, [queryClient]);

  const handlePageChange = (newOffset: number) => {
    const newPage = Math.floor(newOffset / itemsPerPage);
    setCurrentPage(newPage);
    
    if (newPage < Math.floor(totalItems / itemsPerPage)) {
      queryClient.prefetchQuery({
        queryKey: ['radios'],
        queryFn: () => fetchRadioList,
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
      <HamburgerMenu />
      <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center font-bold sm:mb-4">
        Radio Browser
      </h1>

      <h2 className="text-lg text-center text-gray-600 italic mb-6">
        Browse our collection of stations and find your perfect soundtrack
      </h2>
      
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {isFetching || isLoading ?(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 sm:mb-8 justify-items-center">
          {Array.from({ length: 10 }).map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 sm:mb-8 justify-items-center">
            {paginatedStations.map((radio: IRadioStation) => (
              <RadioCard key={radio.stationuuid} radio={radio} />
            ))}
          </div>
          <Pagination
            currentOffset={currentPage * itemsPerPage}
            limit={itemsPerPage}
            totalItems={totalItems}
            isLoading={isLoading}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};
