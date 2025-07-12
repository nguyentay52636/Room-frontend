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
export const registerAPI = async ({email,ten, tenDangNhap, matKhau, soDienThoai,vaiTro}: IUser) => { 
    try {
        const newUser = {email,ten, tenDangNhap, matKhau, soDienThoai,vaiTro}  
        const {data} = await baseApi.post('/auth/register', newUser)
        return data
    }catch(error :any) { 
    throw new Error(error);
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
