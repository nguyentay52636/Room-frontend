
import baseApi from "./baseApi"

import { IusersResponse } from "./responseApi"  
import { User } from "./types"

export const getUsers = async () => {
    try {
        const {data} = await baseApi.get<IusersResponse>(`/user`)
        const res = data.users
        return res
    } catch (error) {
        console.error("Error fetching users:", error)
        throw error
    }
}

export const getUserById = async (id: string) => {
    try {
        const {data} = await baseApi.get<{message: string, data: User}>(`/user/${id}`)
        const res = data.data
        return res
    } catch (error) {
        console.error("Error fetching user by id:", error)
        throw error
    }
}
export const createUser  = async ( { ten, email, tenDangNhap, matKhau, soDienThoai, vaiTro, anhDaiDien, trangThai}: User) => {
    try {
const newUser = { 
    ten,
    email,
    tenDangNhap,
    matKhau,
    soDienThoai,
    vaiTro,
    anhDaiDien,
    trangThai
}
const res = await baseApi.post<{message: string, data: User}>(`/user`, newUser)
return res
    }catch(error : any )  { 
        throw new Error(error.response.data.message)
    }
 } 
export const updateUser = async (id: string, { ten, email, tenDangNhap, matKhau, soDienThoai, vaiTro, anhDaiDien, trangThai}: User) => {
    try {
        const updatedUser = { 
            ten,
            email,
            tenDangNhap,
            matKhau,
            soDienThoai,
            vaiTro,
            anhDaiDien,
            trangThai
        }
        const res = await baseApi.put<{message: string, data: User}>(`/user/${id}`, updatedUser)
        return res
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
 }  
 export const deleteUser = async (id: string) => {
    try {
        const res = await baseApi.delete<{message: string}>(`/user/${id}`)  
        return res
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
 }