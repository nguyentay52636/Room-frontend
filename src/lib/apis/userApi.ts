
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

