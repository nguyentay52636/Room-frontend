import axios from 'axios';

const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

baseApi.interceptors.request.use((config) => {
  return config;
});

baseApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default baseApi;
