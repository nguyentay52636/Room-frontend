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
const initialState : AuthState =  { 
    user : currentUser,
    token : localStorage.getItem('token') || null,
    isAuthenticated,
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
  const register = createAsyncThunk('auth/register',async ({email,ten, tenDangNhap, matKhau, soDienThoai,vaiTro}: IUser, {rejectWithValue})=> {
    try {
        const response = await registerAPI({email,ten, tenDangNhap, matKhau, soDienThoai,vaiTro})
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
          
          // Check if response is successful (assume 200 status code indicates success)
          if (action.payload.statusCode === 200 || action.payload.data) {
            const userData = action.payload.data?.user || action.payload.user;
            const token = action.payload.data?.accessToken || action.payload.accessToken;
            
            if (userData && token) {
              state.user = userData;
              state.token = token;
              state.isAuthenticated = true;
      
              // Lưu thông tin user vào localStorage với ID
              const userDataToSave = {
                ...userData,
                id: userData.id, // Đảm bảo ID được lưu
              };
              console.log('Saving user data:', userDataToSave);
      
              localStorage.setItem('currentUser', JSON.stringify(userDataToSave));
              localStorage.setItem('token', token);
              localStorage.setItem('isAuthenticated', 'true');
            } else {
              state.error = 'Dữ liệu người dùng không hợp lệ';
              state.isAuthenticated = false;
            }
          } else {
            state.error = 'Đăng nhập thất bại';
            state.isAuthenticated = false;
          }
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
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
  