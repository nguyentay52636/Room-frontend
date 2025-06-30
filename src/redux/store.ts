import { configureStore } from '@reduxjs/toolkit'; // Nhập hàm configureStore từ Redux Toolkit
import countReducer from './slices/countSlice'; // Nhập reducer count từ countSlice

// Tạo store với reducer là count
const store = configureStore({
  reducer: {
    count: countReducer, // Gán reducer count vào state
  },
});

// Xuất store để sử dụng ở nơi khác
export default store;
// Xuất kiểu RootState để lấy trạng thái từ store
export type RootState = ReturnType<typeof store.getState>;
// Xuất kiểu AppDispatch để sử dụng dispatch trong ứng dụng
export type AppDispatch = typeof store.dispatch;
