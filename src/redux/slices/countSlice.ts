import { RootState } from '@/redux/store'; // Nhập RootState từ store
import { createSlice } from '@reduxjs/toolkit'; // Nhập createSlice từ Redux Toolkit

// Tạo slice cho count với tên 'count' và trạng thái khởi tạo
const countSlice = createSlice({
  name: 'count', // Tên của slice
  initialState: {
    count: 0, // Trạng thái khởi tạo với count bằng 0
  },
  reducers: {
    // Hàm giảm giá trị count
    increment: (state) => {
      return {
        ...state, // Giữ nguyên trạng thái hiện tại
        count: state.count + 1, // Tăng count lên 1
      };
    },
    // Hàm tăng giá trị count
    decrement: (state) => {
      return {
        ...state, // Giữ nguyên trạng thái hiện tại
        count: state.count - 1, // Giảm count xuống 1
      };
    },
  },
});

// Xuất các action increment và decrement
export const { increment, decrement } = countSlice.actions;
// Xuất reducer của countSlice
export default countSlice.reducer;

// Selector để lấy giá trị count từ state
export const countSelector = (state: RootState) => state.count;
