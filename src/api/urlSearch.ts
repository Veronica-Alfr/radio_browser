import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://de2.api.radio-browser.info/json',
  timeout: 50000,
});

export default apiClient;