import { useQuery } from '@tanstack/react-query';
import { IRadioListParams } from '../interface/IRadio';
import { fetchRadioList } from '../api/radioListRequest';

export const useRadios = (params: IRadioListParams = {}) => {
  return useQuery({
    queryKey: ['radios', params],
    queryFn: () => fetchRadioList(params),
    placeholderData: (previousData) => {
      return previousData || { stations: [], totalItems: 0 };
    },
    staleTime: 5000,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};
