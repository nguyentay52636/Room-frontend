import baseApi from "./baseApi"
import { Customer } from "./types"
import {  IAPIResponseWrapperArray, ICustomerResponse } from "./responseApi"  


export const getCustomers = async () => { 
   try {
    const {data} = await baseApi.get<ICustomerResponse>("/customer")
    return data
   } catch (error:any) {
    throw new Error(error.message)
   }
} 
export const getCustomerById = async (id:string) => {  
    try {
        const {data} = await baseApi.get<ICustomerResponse>(`/customer/${id}`)
        return data;
    }catch (error : any) { 
        throw new Error(error.message)
    }
} 
export const createCustomer = async ({nguoiDungId, diaChi, loai, tongChiTieu, soBdsDangThue, soBdsYeuThich, soDanhGia, diemTrungBinh, bdsDangThueHienTai, ngayKetThucHopDong, lanHoatDongGanNhat, ghiChu}:Customer) => { 
    try {
        const newCustomer = {
            nguoiDungId,
            diaChi,
            loai,
            tongChiTieu,
            soBdsDangThue,
            soBdsYeuThich,
            soDanhGia,
            diemTrungBinh,
            bdsDangThueHienTai,
            ngayKetThucHopDong,
            lanHoatDongGanNhat,
            ghiChu  
        }
        const {data} = await baseApi.post<ICustomerResponse>("/customer", newCustomer)
        return data;
    }catch (error : any) { 
        throw new Error(error.message)
    }
}
export const updateCustomer = async (id:string, {nguoiDungId, diaChi, loai, tongChiTieu, soBdsDangThue, soBdsYeuThich, soDanhGia, diemTrungBinh, bdsDangThueHienTai, ngayKetThucHopDong, lanHoatDongGanNhat, ghiChu}:Customer) => { 
    try {
        const updateCustomer = {
            nguoiDungId,
            diaChi,
            loai,
            tongChiTieu,
            soBdsDangThue,
            soBdsYeuThich,
            soDanhGia,
            diemTrungBinh,
            bdsDangThueHienTai,
            ngayKetThucHopDong,
            lanHoatDongGanNhat,
            ghiChu
        }
        const {data} = await baseApi.put<ICustomerResponse>(`/customer/${id}`, updateCustomer)
        return data;
    }catch (error : any) { 
        throw new Error(error.message)
    }
}
export const deleteCustomer = async (id:string) => { 
    try {
        const {data} = await baseApi.delete<ICustomerResponse>(`/customer/${id}`)
        return data;
    }catch (error : any) { 
        throw new Error(error.message)
    }
}