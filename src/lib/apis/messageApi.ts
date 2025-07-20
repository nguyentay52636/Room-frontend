import baseApi from "./baseApi"
import { Message } from "./types"

export const getMessagesByRoom = async (roomId: string) => { 
    try {
        const {data} = await baseApi.get(`/messages/${roomId}`)
        return data
    }catch(error: any) {
        // Enhanced error handling for authentication
        if (error.response?.status === 401) {
            throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
        }
        if (error.response?.status === 403) {
            throw new Error('Bạn không có quyền xem tin nhắn trong phòng này.')
        }
        throw new Error(error.response?.data?.message || 'Lỗi tải tin nhắn')
    }
} 


export const getAllMessages = async () => { 
    try {
        const {data} = await baseApi.get(`/messages`)
        return data
    }catch(error: any) {
        if (error.response?.status === 401) {
            throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
        }
        throw new Error(error.response?.data?.message || 'Lỗi tải danh sách tin nhắn')
    }
} 


export const createMessage = async (messageData: {
    roomId: string;
    nguoiGuiId: string;
    noiDung: string;
    hinhAnh?: string;
    daDoc?: boolean;
    trangThai?: string;
}) => { 
    try {
       
        if (!messageData.roomId || !messageData.noiDung?.trim()) {
            throw new Error('Room ID và nội dung tin nhắn là bắt buộc')
        }
        const {data} = await baseApi.post(`/messages`, messageData)
        console.log('✅ Message created via API:', data)
        return data
    }catch(error: any) {
        console.error('❌ Error creating message:', error.response?.data || error.message)
        throw new Error(error.response?.data?.message || 'Lỗi gửi tin nhắn')
    }
}   

// Cập nhật tin nhắn - Enhanced with ownership check
export const updateMessage = async (messageId: string, noiDungMoi: string) => {
    try {
        if (!messageId || !noiDungMoi?.trim()) {
            throw new Error('ID tin nhắn và nội dung mới là bắt buộc')
        }

        const {data} = await baseApi.put(`/messages/${messageId}`, { noiDungMoi })
        console.log('✅ Message updated via API:', data)
        return data
    }catch(error: any) {
        if (error.response?.status === 401) {
            throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
        }
        if (error.response?.status === 403) {
            throw new Error('Bạn không có quyền sửa tin nhắn này.')
        }
        if (error.response?.status === 404) {
            throw new Error('Không tìm thấy tin nhắn.')
        }
        console.error('❌ Error updating message:', error.response?.data || error.message)
        throw new Error(error.response?.data?.message || 'Lỗi cập nhật tin nhắn')
    }
}

export const deleteMessage = async (messageId: string) => { 
    try {
        if (!messageId) {
            throw new Error('ID tin nhắn là bắt buộc')
        }

        const {data} = await baseApi.delete(`/messages/${messageId}`)
        console.log('✅ Message deleted via API:', data)
        return data
    }catch(error: any) {
        if (error.response?.status === 401) {
            throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
        }
        if (error.response?.status === 403) {
            throw new Error('Bạn không có quyền xóa tin nhắn này.')
        }
        if (error.response?.status === 404) {
            throw new Error('Không tìm thấy tin nhắn.')
        }
        console.error('❌ Error deleting message:', error.response?.data || error.message)
        throw new Error(error.response?.data?.message || 'Lỗi xóa tin nhắn')
    }
}

// Đánh dấu tin nhắn đã đọc
export const markMessageAsRead = async (messageId: string) => {
    try {
        if (!messageId) {
            throw new Error('ID tin nhắn là bắt buộc')
        }

        const {data} = await baseApi.patch(`/messages/${messageId}/read`)
        console.log('✅ Message marked as read:', data)
        return data
    }catch(error: any) {
        if (error.response?.status === 401) {
            throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
        }
        if (error.response?.status === 403) {
            throw new Error('Bạn không có quyền đánh dấu tin nhắn này.')
        }
        if (error.response?.status === 404) {
            throw new Error('Không tìm thấy tin nhắn.')
        }
        console.error('❌ Error marking message as read:', error.response?.data || error.message)
        throw new Error(error.response?.data?.message || 'Lỗi đánh dấu tin nhắn')
    }
}

// Đánh dấu nhiều tin nhắn đã đọc - New function
export const markMultipleMessagesAsRead = async (messageIds: string[]) => {
    try {
        if (!messageIds || messageIds.length === 0) {
            throw new Error('Danh sách ID tin nhắn không được trống')
        }

        const {data} = await baseApi.patch(`/messages/mark-read-bulk`, { messageIds })
        console.log('✅ Multiple messages marked as read:', data)
        return data
    }catch(error: any) {
        if (error.response?.status === 401) {
            throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
        }
        console.error('❌ Error marking multiple messages as read:', error.response?.data || error.message)
        throw new Error(error.response?.data?.message || 'Lỗi đánh dấu tin nhắn')
    }
}

// Legacy function - giữ để compatibility với code cũ
export const getMessagesByUser = async (nguoiGuiId: string, nguoiNhanId: string) => { 
    try {
        // Tạm thời return empty để không break existing code
        // Backend cần implement endpoint này hoặc filter messages by users
        console.warn('⚠️ getMessagesByUser is deprecated. Use getMessagesByRoom instead.')
        return { data: [] }
    }catch(error: any) {
        throw new Error(error.response?.data?.message || 'API not implemented')
    }
}


export const sendMessage = async (messageData: Message) => { 
    try {
        console.warn('⚠️ sendMessage is deprecated. Use createMessage instead.')

        const newFormat = {
            roomId: '',
            nguoiGuiId: messageData.nguoiGuiId,
            noiDung: messageData.noiDung,
            hinhAnh: messageData.hinhAnh,
            daDoc: messageData.daDoc,
            trangThai: messageData.trangThai
        }
        return await createMessage(newFormat)
    }catch(error: any) {
        throw new Error(error.response?.data?.message || 'Send message failed')
    }
}

