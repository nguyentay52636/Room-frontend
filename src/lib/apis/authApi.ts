import axios from "axios"
import baseApi from "./baseApi"
import { IUser } from "./types"

export const LoginAPI  = async (userData :{tenDangNhap : string, matKhau : string}) => {
   try {
    const {data} = await baseApi.post("/auth/login", userData)
    return data
   } catch (error: any) {
    throw new Error(error);
   }
}
export const registerAPI = async ({email,ten, tenDangNhap, matKhau, xacNhanMatKhau, soDienThoai,vaiTro}: IUser & {xacNhanMatKhau: string}) => { 
    try {
        const newUser = {email,ten, tenDangNhap, matKhau, xacNhanMatKhau, soDienThoai,vaiTro}  
        console.log("🚀 Sending to server:", newUser)
        const {data} = await baseApi.post('/auth/register', newUser)
        return data
    }catch(error :any) { 
        console.error("❌ API Error:", error.response?.data || error.message)
        throw new Error(error.response?.data?.message || error.message);
    }
} 
export const logout = async () => { 
    try {
        const {data} = await baseApi.post('/auth/logout')
        return data
    }catch(error :any) { 
        throw new Error(error);
    }
}   
