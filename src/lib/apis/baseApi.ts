import axios from 'axios';

const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

baseApi.interceptors.request.use((config) => {
  // Tự động thêm token vào headers nếu có
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

baseApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Xử lý lỗi 401 - Unauthorized
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      
      // Redirect to login page
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  },
);

export default baseApi;
