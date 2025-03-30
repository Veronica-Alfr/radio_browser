import apiClient from './urlSearch';
import type { AxiosResponse } from 'axios';
import type { IRadioListParams, IRadioStation } from '../interface/IRadio';

export const fetchRadioList = async (params: IRadioListParams): Promise<{ stations: IRadioStation[]; totalItems: number }> => {
  try {
    const response: AxiosResponse<IRadioStation[]> = await apiClient.get('/stations/search', {
      params: {
        ...params,
        hidebroken: true,
      },
    });

    if (!response.data) {
      throw new Error('No data received from API');
    }

    return {
      stations: response.data,
      totalItems: response.data.length,
    };
  } catch (error) {
    console.error('Error in fetchRadioList:', error);
    throw new Error(`Failed to fetch radio list: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
