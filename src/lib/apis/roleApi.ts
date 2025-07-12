import baseApi from "./baseApi"

import { role } from "./types"

export const getRoles = async ()=> { 
    try {
        const {data} = await baseApi.get<role[]>("/role")
        return data 
    } catch (error:any) {
        throw new Error(error.message)
    }
}