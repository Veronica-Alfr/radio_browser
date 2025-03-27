import axios from 'axios';
import { IRadioListParams, IRadioStation } from '../interface/IRadio';

export const apiClient = axios.create({
  baseURL: 'https://de2.api.radio-browser.info/json',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
});

// Interceptor para tratamento global de erros
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const fetchRadioList = async (
  params: IRadioListParams
): Promise<{ stations: IRadioStation[]; totalItems: number }> => {
  const { limit = 10, offset = 0, ...filters } = params;

  const response = await apiClient.get<IRadioStation[]>('/stations/search', {
    params: {
      ...filters,
      limit: limit + 1,
      offset,
      hidebroken: true,
    },
  });

  console.log('data =>', response.data)
  console.log('length =>', response.data.length)

  return {
    stations: response.data,
    totalItems: 1000,
  };
};
