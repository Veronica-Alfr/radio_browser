import { useState } from 'react';
import { IRadioListParams, IRadioStation } from '../interface/IRadio';
import { RadioCard } from '../components/RadioCard';
import { Pagination } from '../components/Pagination';
import { useRadios } from '../hooks/useRadios';

export const RadioList = () => {
  const [params, setParams] = useState<IRadioListParams>({
    limit: 10,
    offset: 0,
  });

  const { data: radios, isLoading, isError } = useRadios(params);

  const handlePageChange = (newOffset: number) => {
    setParams(prev => ({ ...prev, offset: newOffset }));
  };

  if (isLoading) return <div className="text-center py-8">Loading stations...</div>;
  if (isError) return <div className="text-red-500 text-center py-8">Error loading radio stations</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Radio Stations</h1>
      
      <div className="grid gap-4 mb-6">
        {radios?.map((radio: IRadioStation) => (
          <RadioCard key={radio.stationuuid} radio={radio} />
        ))}
      </div>

      <Pagination 
        currentOffset={params.offset || 0}
        limit={params.limit || 10}
        totalItems={radios?.length || 0}
        onChange={handlePageChange}
      />
    </div>
  );
};