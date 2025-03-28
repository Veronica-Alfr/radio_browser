import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { IRadioListCompactProps, IRadioListParams, IRadioStation } from '../../interface/IRadio';
import { RadioCardCompact } from './RadioCardCompact';
import { Pagination } from '../pagination/Pagination';
import { useRadios } from '../../hooks/useRadios';
import { fetchRadioList } from '../../api/radioListRequest';

export const RadioListCompact: React.FC<IRadioListCompactProps> = ({ isSmallScreen = true }) => {
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
    <div className="container mx-auto">
      <div className="grid p-4 gap-4 mb-6 h-[calc(100vh-200px)] overflow-y-auto 
        scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent">
        {data?.stations.map((radio: IRadioStation) => (
          <RadioCardCompact key={radio.stationuuid} radio={radio} />
        ))}

        <Pagination 
          currentOffset={params.offset || 0}
          limit={params.limit || 10}
          totalItems={1000}
          isSmallScreen={isSmallScreen}
          isLoading={isLoading}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};
