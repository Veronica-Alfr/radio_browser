import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { IRadioListParams, IRadioStation } from '../interface/IRadio';
import { RadioCard } from '../components/radio/RadioCard';
import { Pagination } from '../components/pagination/Pagination';
import { useRadios } from '../hooks/useRadios';
import { fetchRadioList } from '../api/radioListRequest';

export const RadioList: React.FC = () => {
  const queryClient = useQueryClient();
  const [params, setParams] = useState<IRadioListParams>({
    limit: 9,
    offset: 0,
  });

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['radios', params],
      queryFn: () => fetchRadioList(params),
    });
  }, [queryClient, params]);

  const { data, isLoading, isError } = useRadios(params);

  const handlePageChange = (newOffset: number) => {
    if (!isLoading) {
      setParams(prev => ({ ...prev, offset: newOffset }));
    }
  };

  if (isError) return (
    <div className="container mx-auto p-4">
      <div className="text-red-500 text-center py-8">
        Error loading radio stations. Please try again.
      </div>
    </div>
  );

  if (!isLoading && data) return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center font-bold mb-4 sm:mb-6">
        Radio Browser
      </h1>
      
      <h2 className="text-base sm:text-lg lg:text-xl text-center text-gray-600 font-medium italic mb-6 sm:mb-8">
        Browse our collection of stations and find your perfect soundtrack
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 sm:mb-8 justify-items-center">
        {data?.stations.map((radio: IRadioStation) => (
          <RadioCard key={radio.stationuuid} radio={radio} />
        ))}
      </div>

      <Pagination 
        currentOffset={params.offset || 0}
        limit={params.limit || 9}
        totalItems={54080}
        isLoading={isLoading}
        onChange={handlePageChange}
      />
    </div>
  );

  return null;
};
