import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { IRadioListParams, IRadioStation } from '../interface/IRadio';
import { RadioCard } from '../components/RadioCard';
import { Pagination } from '../components/Pagination';
import { useRadios } from '../hooks/useRadios';
import { fetchRadioList } from '../api/radioListRequest';

export const RadioList: React.FC = () => {
  const queryClient = useQueryClient();
  const [params, setParams] = useState<IRadioListParams>({
    limit: 10,
    offset: 0,
  });

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['radios', params],
      queryFn: () => fetchRadioList(params),
    });
  }, [queryClient]);

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center font-bold mb-6">Radio Browser</h1>
      <h2 className="text-lg md:text-xl text-center text-gray-600 font-medium italic mb-8">
        Browse our collection of stations and find your perfect soundtrack</h2>

      <div className="grid gap-4 mb-6">
        {data?.stations.map((radio: IRadioStation) => (
          <RadioCard key={radio.stationuuid} radio={radio} />
        ))}
      </div>

      <Pagination 
        currentOffset={params.offset || 0}
        limit={params.limit || 10}
        totalItems={1000}
        isLoading={isLoading}
        onChange={handlePageChange}
      />
    </div>
  );
};
