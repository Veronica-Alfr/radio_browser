import { useQuery } from '@tanstack/react-query';
import { IRadioListParams } from '../interface/IRadio';
import { fetchRadioList } from '../api/radioListRequest';

export const useRadios = (params: IRadioListParams = {}) => {
  return useQuery({
    queryKey: ['radios', params],
    queryFn: () => fetchRadioList(params),
    placeholderData: (previousData) => {
      return previousData || { stations: [], hasMore: true };
    },
    staleTime: 5000,
    gcTime: 1000 * 60 * 10, // 10 minutos
    retry: 2, // Tentar 2 vezes antes de falhar
  });
};
