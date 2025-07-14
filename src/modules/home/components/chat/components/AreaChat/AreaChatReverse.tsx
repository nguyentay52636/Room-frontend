import { Heart } from 'lucide-react'
import React from 'react'
import { MessageCircle, Shield, Sparkles } from 'lucide-react'  
export default function AreaChatReverse() {
    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-8">
                <div className="mb-6">
                    <MessageCircle className="h-24 w-24 text-blue-400 mx-auto mb-4 animate-bounce" />
                    <div className="flex items-center justify-center space-x-2 text-5xl mb-4">
                        <span>💬</span>
                        <span>🏠</span>
                        <span>✨</span>
                    </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">Chào mừng đến Cộng đồng Chat!</h3>
                <p className="text-gray-500 text-xl mb-6 max-w-md">
                    Chọn một cuộc trò chuyện hoặc tìm người dùng mới để bắt đầu kết nối
                </p>
                <div className="flex items-center justify-center space-x-6 text-lg text-gray-400">
                    <span className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-pink-400" />
                        Thân thiện
                    </span>
                    <span className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-400" />
                        An toàn
                    </span>
                    <span className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-400" />
                        Hữu ích
                    </span>
                </div>
            </div>
        </div>
    )
}
