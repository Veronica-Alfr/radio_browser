import apiClient from '../api/urlSearch';
import type { AxiosError, AxiosResponse } from 'axios';

const setupInterceptors = () => {
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
};

export default setupInterceptors;