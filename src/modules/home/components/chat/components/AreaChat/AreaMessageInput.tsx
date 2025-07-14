import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ImageIcon, Paperclip, Camera, Smile, Mic, Send } from 'lucide-react'
import React from 'react'

export default function AreaMessageInput({ newMessage, setNewMessage, handleSendMessage }: { newMessage: string, setNewMessage: (value: string) => void, handleSendMessage: () => void }) {
    return (
        <div className="flex-shrink-0 p-4 bg-white/60 backdrop-blur-sm border-t border-gray-200/50 scroll-auto">
            <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" className="rounded-xl bg-white/50 backdrop-blur-sm">
                    <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl bg-white/50 backdrop-blur-sm">
                    <ImageIcon className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl bg-white/50 backdrop-blur-sm">
                    <Camera className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                    <Input
                        placeholder="Nhập tin nhắn..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="pr-20 py-3 text-sm bg-white/70 border-gray-200/50 focus:border-blue-400 focus:ring-blue-400 rounded-2xl backdrop-blur-sm"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                        <Button variant="ghost" size="sm" className="rounded-xl">
                            <Smile className="w-4 h-4 text-yellow-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="rounded-xl">
                            <Mic className="w-4 h-4 text-red-500" />
                        </Button>
                    </div>
                </div>
                <Button
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl px-6 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                    <Send className="w-4 h-4 mr-2" />
                    Gửi
                </Button>
            </div>

            {/* Quick Actions */}
            <div className="mt-3 flex flex-wrap gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="text-xs bg-gradient-to-r from-blue-50/80 to-purple-50/80 border-blue-200 hover:from-blue-100/80 hover:to-purple-100/80 rounded-xl backdrop-blur-sm"
                >
                    🏠 Chia sẻ bất động sản
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-xs bg-gradient-to-r from-green-50/80 to-emerald-50/80 border-green-200 hover:from-green-100/80 hover:to-emerald-100/80 rounded-xl backdrop-blur-sm"
                >
                    📍 Chia sẻ vị trí
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-xs bg-gradient-to-r from-purple-50/80 to-pink-50/80 border-purple-200 hover:from-purple-100/80 hover:to-pink-100/80 rounded-xl backdrop-blur-sm"
                >
                    💡 Xin tư vấn
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-xs bg-gradient-to-r from-orange-50/80 to-yellow-50/80 border-orange-200 hover:from-orange-100/80 hover:to-yellow-100/80 rounded-xl backdrop-blur-sm"
                >
                    ⭐ Đánh giá
                </Button>
            </div>
        </div>
    )
}
