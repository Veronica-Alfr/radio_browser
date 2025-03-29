import { useQuery } from '@tanstack/react-query';
import { fetchRadioList, fetchRadioOneHundred } from '../api/radioListRequest';
import { IRadioListParams } from '../interface/IRadio';

export const useRadios = () => {
  return useQuery({
    queryKey: ['radios'],
    queryFn: fetchRadioList,
    placeholderData: { stations: [], totalItems: 0 },
    staleTime: 5000,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};

export const useRadiosOneHundred = (params: IRadioListParams) => {
  return useQuery({
    queryKey: ['radios-compact', params],
    queryFn: () => fetchRadioOneHundred(params),
    placeholderData: { stations: [], totalItems: 0 },
    staleTime: 5000,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};
