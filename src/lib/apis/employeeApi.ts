import baseApi from "./baseApi"
import { IAPIResponseWrapperArray, IEmployeeResponse } from "./responseApi"
import { Employee } from "./types"

export const getEmployees = async ()=> { 
    try {
        const {data} = await baseApi.get<IEmployeeResponse>("/employee")
        return { data: data.employees } 
    } catch (error:any) {
        throw new Error(error.message)
    }
}       
export const getEmployeeById = async (id:string)=> { 
    try {
        const {data} = await baseApi.get<IAPIResponseWrapperArray<Employee>>(`/employee/${id}`)
        return data 
    } catch (error:any) {
        throw new Error(error.message)
    }
}
export const createEmployee = async ({phongBan, chucVu, luong, hieuSuat, ngayVaoLam, trangThai}:Employee)=> { 
    const newEmployee = {
        phongBan,
        chucVu,
        luong,
        hieuSuat,
        ngayVaoLam,
        trangThai
    }
    try {
        const {data} = await baseApi.post<IAPIResponseWrapperArray<Employee>>("/employee", newEmployee)
        return data 
    } catch (error:any) {
        throw new Error(error.message)
    }
}
export const updateEmployee = async (id:string, {phongBan, chucVu, luong, hieuSuat, ngayVaoLam, trangThai}:Employee)=> { 
    const newEmployee = {
        phongBan,
        chucVu,
        luong,
        hieuSuat,
        ngayVaoLam,
        trangThai
    }
    try {
        const {data} = await baseApi.put<IAPIResponseWrapperArray<Employee>>(`/employee/${id}`, newEmployee)
        return data 
    } catch (error:any) {
        throw new Error(error.message)
    }
}
export const deleteEmployee = async (id:string)=> { 
    try {
        const {data} = await baseApi.delete<IAPIResponseWrapperArray<Employee>>(`/employee/${id}`)
        return data 
    } catch (error:any) {
        throw new Error(error.message)
    }
}   