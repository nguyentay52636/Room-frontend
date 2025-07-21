import baseApi from "./baseApi"
import { Room } from "./types"

export const getRoomChatByIdUser = async (userId: string) => { 
    try { 
        const {data} = await baseApi.get(`/room/user/${userId}`)
        return data
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
}

export const getRoomById = async (roomId: string) => { 
    try { 
        const {data} = await baseApi.get(`/room/${roomId}`)
        // console.log("🔍 Room data:", data);
        return data
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
}

export const findOrCreatePrivateRoom = async (userId1: string, userId2: string) => {
    try { 
        const {data} = await baseApi.post(`/room/find-or-create-private`, { 
            userId1, 
            userId2 
        })
        return data 
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
}

export const createRoomChat = async ({tenPhong, loaiPhong, thanhVien, nguoiTao, anhDaiDien}: Room) => { 
    try { 
        const room = {tenPhong, loaiPhong, thanhVien, nguoiTao, anhDaiDien}
        const {data} = await baseApi.post(`/room`, room)
        return data
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
}

export const addMessageToRoom = async (roomId: string, messageId: string) => {
    try { 
        const {data} = await baseApi.post(`/room/${roomId}/message`, { messageId })
        return data
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
}

export const removeMessageFromRoom = async (roomId: string, messageId: string) => {
    try { 
        const {data} = await baseApi.delete(`/room/${roomId}/message/${messageId}`)
        return data
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
}

export const updateRoom = async (roomId: string, updateData: Partial<Room>) => {
    try { 
        const {data} = await baseApi.put(`/room/${roomId}`, updateData)
        return data
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
}

export const deleteRoomChat = async (roomId: string) => { 
    try { 
        const {data} = await baseApi.delete(`/room/${roomId}`)
        return data
    } catch (error:any) {
        throw new Error(error.response.data.message)
    }
}