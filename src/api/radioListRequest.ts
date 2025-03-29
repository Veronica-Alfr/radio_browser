import axios, { AxiosError, AxiosResponse } from 'axios';
import { IRadioListParams, IRadioStation } from '../interface/IRadio';

export const apiClient = axios.create({
  baseURL: 'https://de2.api.radio-browser.info/json',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error('API Error:', error);
    
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Status code:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export const fetchRadioOneHundred = async (
  params: IRadioListParams
): Promise<{ stations: IRadioStation[]; totalItems: number }> => {
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
      totalItems: 100,
    };
  } catch (error) {
    console.error('Error in fetchRadioOneThousand:', error);
    throw new Error(`Failed to fetch radio stations: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const fetchRadioList = async (): Promise<{ stations: IRadioStation[]; totalItems: number }> => {
  try {
    const response: AxiosResponse<IRadioStation[]> = await apiClient.get('/stations/search', {
      params: {
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
