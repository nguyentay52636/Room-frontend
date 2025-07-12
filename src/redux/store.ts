import { configureStore } from '@reduxjs/toolkit'; // Nhập hàm configureStore từ Redux Toolkit
import authReducer from './slices/authSlice'; // Nhập reducer auth từ authSlice

// Tạo store với reducer là count
const store = configureStore({
  reducer: {
    auth: authReducer, // Gán reducer auth vào state
  },
});

// Xuất store để sử dụng ở nơi khác
export default store;
// Xuất kiểu RootState để lấy trạng thái từ store
export type RootState = ReturnType<typeof store.getState>;
// Xuất kiểu AppDispatch để sử dụng dispatch trong ứng dụng
export type AppDispatch = typeof store.dispatch;
