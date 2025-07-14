import { LoginAPI, registerAPI } from "@/lib/apis/authApi";
import { IUser } from "@/lib/apis/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState  { 
user :IUser | null   
token : string | null
isAuthenticated : boolean
isLoading : boolean
error : string | null
registrationSuccess : boolean
}
const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated') || 'false')
const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
const token = localStorage.getItem('token')

console.log('Loading from localStorage:', {
  isAuthenticated,
  currentUser,
  token
});

const initialState : AuthState =  { 
    user : currentUser,
    token : token,
    isAuthenticated: isAuthenticated && !!currentUser && !!token, // Chỉ authenticated nếu có đầy đủ thông tin
    isLoading : false,
    error : null,
    registrationSuccess : false
}
// Create async thunks for login and register
export const login = createAsyncThunk(
    'auth/login',
    async ({ tenDangNhap, matKhau }: { tenDangNhap: string; matKhau: string }, { rejectWithValue }) => {
      try {
        const response = await LoginAPI({ tenDangNhap, matKhau });
        // Assuming the API returns a token in the data
        return response;
      } catch (error) {
        return rejectWithValue((error as Error).message || 'Login failed');
      }
    },
  );
  const register = createAsyncThunk('auth/register',async ({email,ten, tenDangNhap, matKhau, xacNhanMatKhau, soDienThoai,vaiTro}: IUser & {xacNhanMatKhau: string}, {rejectWithValue})=> {
    try {
        const response = await registerAPI({email,ten, tenDangNhap, matKhau, xacNhanMatKhau, soDienThoai,vaiTro})
        return response
    } catch (error:any) {
        return rejectWithValue((error as Error).message || 'Register failed');
    }
  })    
  // Create the auth slice
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logout: (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isAuthenticated');
        window.location.reload();
      },
      setCredentials: (state, action: PayloadAction<{ user: IUser; token: string }>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      },
      clearError: (state) => {
        state.error = null;
      },
      resetRegistrationSuccess: (state) => {
        state.registrationSuccess = false;
      },
    },
    extraReducers: (builder) => {
      // Login cases
      builder
        .addCase(login.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            console.log('Login Response:', action.payload);
            console.log('Response structure:', JSON.stringify(action.payload, null, 2));
          
          state.isLoading = false;
          state.error = null;
          
          // Xử lý response trực tiếp từ API
          if (action.payload) {
            // API trả về trực tiếp user data và token
            const userData = action.payload.user;
            const token = action.payload.accessToken;
            
            console.log('User data:', userData);
            console.log('Token:', token);
            
            if (userData && token) {
              state.user = userData;
              state.token = token;
              state.isAuthenticated = true;
      
              // Lưu thông tin user vào localStorage với đầy đủ thông tin
              const userDataToSave = {
                ...userData,
                id: userData._id, // Sử dụng _id từ MongoDB
              };
              console.log('Saving user data to localStorage:', userDataToSave);
      
              localStorage.setItem('currentUser', JSON.stringify(userDataToSave));
              localStorage.setItem('token', token);
              localStorage.setItem('isAuthenticated', 'true');
              
              console.log('Data saved to localStorage successfully');
            } else {
              console.error('Missing user data or token in response');
              state.error = 'Dữ liệu người dùng không hợp lệ';
              state.isAuthenticated = false;
            }
          } else {
            console.error('No payload in response');
            state.error = 'Đăng nhập thất bại';
            state.isAuthenticated = false;
          }
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
          state.isAuthenticated = false;
          
          // Xóa thông tin cũ trong localStorage khi login thất bại
          localStorage.removeItem('currentUser');
          localStorage.removeItem('token');
          localStorage.removeItem('isAuthenticated');
          
          console.log('Login failed:', action.payload);
        });
  
      // Register cases
      builder
        .addCase(register.pending, (state) => {
          state.isLoading = true;
          state.error = null;
          state.registrationSuccess = false;
        })
        .addCase(register.fulfilled, (state) => {
          state.isLoading = false;
          state.error = null;
          state.registrationSuccess = true;
        })
        .addCase(register.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
          state.registrationSuccess = false;
        });
    },
  });
  
  export const { logout, setCredentials, clearError, resetRegistrationSuccess } = authSlice.actions;
  export { register }; // Export register function
  export default authSlice.reducer;
  export const selectAuth = (state: RootState) => state.auth;
  