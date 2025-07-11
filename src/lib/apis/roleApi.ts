import baseApi from "./baseApi"
import { IAPIResponseWrapperArray } from "./responseApi"
import { role } from "./types"

export const getRoles = async ()=> { 
    try {
        const {data} = await baseApi.get<IAPIResponseWrapperArray<role>>("/role")
        return data 
    } catch (error:any) {
        throw new Error(error.message)
    }
}