import { useQuery } from '@tanstack/react-query';
import { fetchRadioList } from '../api/radioListRequest';
import { IRadioListParams } from '../interface/IRadio';

export const useRadios = () => {
  return useQuery({
    queryKey: ['radios'],
    queryFn: () => fetchRadioList({}),
    placeholderData: { stations: [], totalItems: 0 },
    staleTime: 5000,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};

export const useRadiosCompact = (params: IRadioListParams) => {
  return useQuery({
    queryKey: ['radios-compact', params],
    queryFn: () => fetchRadioList(params),
    placeholderData: { stations: [], totalItems: 0 },
    staleTime: 5000,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};
