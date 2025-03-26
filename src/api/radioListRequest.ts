import axios from 'axios';
import { IRadioListParams, IRadioStation } from '../interface/IRadio';

export const apiClient = axios.create({
  baseURL: 'https://de2.api.radio-browser.info/json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchRadioList = async (params: IRadioListParams = {}): Promise<IRadioStation[]> => {
    const { limit = 10, offset = 0, ...filters } = params;
    
    const response = await apiClient.get<IRadioStation[]>('/stations/search', {
      params: {
        ...filters,
        limit,
        offset,
        hidebroken: true,
      },
    });

    console.log(response.data)

    const totalCount = Number(response.headers['x-total-count']) || 0;
    console.log('totalCount =>', totalCount)

    return response.data;
};