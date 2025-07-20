import baseApi from "./baseApi"
import { Room } from "./types"

export const getRoomChat = async (userId: string) => { 
    const {data} = await baseApi.get(`/room/user/${userId}`)
    return data
}

export const getRoomById = async (roomId: string) => { 
    const {data} = await baseApi.get(`/room/${roomId}`)
    return data
}

export const findOrCreatePrivateRoom = async (userId1: string, userId2: string) => {
    const {data} = await baseApi.post(`/room/find-or-create-private`, { 
        userId1, 
        userId2 
    })
    return data
}

export const createRoomChat = async ({tenPhong, loaiPhong, thanhVien, nguoiTao, anhDaiDien}: Room) => { 
    const room = {tenPhong, loaiPhong, thanhVien, nguoiTao, anhDaiDien}
    const {data} = await baseApi.post(`/room`, room)
    return data
}

export const addMessageToRoom = async (roomId: string, messageId: string) => {
    const {data} = await baseApi.post(`/room/${roomId}/message`, { messageId })
    return data
}

export const removeMessageFromRoom = async (roomId: string, messageId: string) => {
    const {data} = await baseApi.delete(`/room/${roomId}/message/${messageId}`)
    return data
}

export const updateRoom = async (roomId: string, updateData: Partial<Room>) => {
    const {data} = await baseApi.put(`/room/${roomId}`, updateData)
    return data
}

export const deleteRoomChat = async (roomId: string) => { 
    const {data} = await baseApi.delete(`/room/${roomId}`)
    return data
}