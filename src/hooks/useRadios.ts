import { useQuery } from '@tanstack/react-query';
import { IRadioListParams } from '../interface/IRadio';
import { fetchRadioList } from '../api/radioListRequest';

export const useRadios = (params: IRadioListParams = {}) => {
  return useQuery({
    queryKey: ['radiosList', params],
    queryFn: () => fetchRadioList(params),
    staleTime: 60 * 1000,
    placeholderData: previousData => previousData,
  });
};
