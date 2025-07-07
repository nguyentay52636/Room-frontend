import { Avatar } from '@/components/ui/avatar'
import React from 'react'
import { AvatarImage } from '@/components/ui/avatar'
import { AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { FileText, Phone, Video, Settings, MoreVertical, Smile, Mic, Send, MessageSquare, Heart, Zap, Sparkles, Building2, Calendar, Badge, CheckCircle2, ImageIcon, Paperclip } from 'lucide-react'

export default function CenterSiderChatManager({ selectedChat, messages, newMessage, setNewMessage, handleSendMessage, getPriorityColor }: { selectedChat: any, messages: any, newMessage: any, setNewMessage: any, handleSendMessage: any, getPriorityColor: any }) {
    return (
        <div className="flex-1 flex flex-col sticky top-0">
            {selectedChat ? (
                <>
                    {/* Chat Header */}
                    <div className="p-4 border-b  border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <Avatar className="h-12 w-12 ring-2 ring-blue-200 shadow-lg">
                                        <AvatarImage
                                            src={selectedChat.customerAvatar || "/placeholder.svg"}
                                            alt={selectedChat.customerName}
                                        />
                                        <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold">
                                            {selectedChat.customerName.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div
                                        className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white shadow-sm ${selectedChat.isOnline ? "bg-gradient-to-r from-emerald-400 to-emerald-500" : "bg-gray-400"
                                            }`}
                                    >
                                        {selectedChat.isOnline && (
                                            <div className="absolute inset-0 rounded-full animate-ping bg-emerald-400"></div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                        {selectedChat.customerName}

                                    </h3>
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <span className={selectedChat.isOnline ? "text-emerald-600 font-medium" : ""}>
                                            {selectedChat.lastSeen}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Building2 className="h-3 w-3" />
                                            {selectedChat.propertyName}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-xl hover:bg-green-50 hover:border-green-300 hover:text-green-600 bg-transparent"
                                >
                                    <Phone className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-xl hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 bg-transparent"
                                >
                                    <Video className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-xl hover:bg-purple-50 hover:border-purple-300 hover:text-purple-600 bg-transparent"
                                >
                                    <Settings className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Project Info Bar */}
                        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 rounded-2xl border border-blue-200 dark:border-blue-800">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-6">
                                    <div className="flex items-center space-x-2">
                                        <Building2 className="h-4 w-4 text-blue-600" />
                                        <span className="font-medium">🏢 {selectedChat.propertyName}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="h-4 w-4 text-purple-600" />
                                        <span>📅 {selectedChat.timeline}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium">💰 {selectedChat.budget}</span>
                                    </div>
                                </div>
                                <Badge className={`${getPriorityColor(selectedChat.priority)} border rounded-xl`}>
                                    {selectedChat.priority === "urgent"
                                        ? "🚨 Khẩn cấp"
                                        : selectedChat.priority === "high"
                                            ? "⚡ Cao"
                                            : selectedChat.priority === "normal"
                                                ? "✅ Bình thường"
                                                : "😌 Thấp"}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <ScrollArea className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-950">
                        <div className="space-y-6">
                            {messages.map((message: any, index: any) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === "staff" ? "justify-end" : "justify-start"} group`}
                                >
                                    <div
                                        className={`flex items-start space-x-3 max-w-[75%] ${message.sender === "staff" ? "flex-row-reverse space-x-reverse" : ""
                                            }`}
                                    >
                                        <Avatar className="h-10 w-10 ring-2 ring-white shadow-md">
                                            <AvatarImage
                                                src={message.sender === "staff" ? selectedChat.staffAvatar : selectedChat.customerAvatar}
                                                alt={message.sender === "staff" ? selectedChat.staffName : selectedChat.customerName}
                                            />
                                            <AvatarFallback
                                                className={
                                                    message.sender === "staff"
                                                        ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white"
                                                        : "bg-gradient-to-br from-blue-400 to-purple-500 text-white"
                                                }
                                            >
                                                {message.sender === "staff"
                                                    ? selectedChat.staffName.charAt(0)
                                                    : selectedChat.customerName.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    {message.sender === "staff" ? selectedChat.staffName : selectedChat.customerName}
                                                </span>
                                                <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                                                    {message.timestamp}
                                                </span>
                                            </div>

                                            <div
                                                className={`rounded-3xl p-4 shadow-md hover:shadow-lg transition-all duration-200 ${message.sender === "staff"
                                                    ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                                                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
                                                    }`}
                                            >
                                                {message.type === "file" ? (
                                                    <div className="flex items-center space-x-3">
                                                        <div className="p-2 bg-white/20 rounded-xl">
                                                            <FileText className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">{message.content}</p>
                                                            <p
                                                                className={`text-xs ${message.sender === "staff" ? "text-blue-100" : "text-gray-500"
                                                                    }`}
                                                            >
                                                                📄 PDF Document
                                                            </p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className="text-sm leading-relaxed">{message.content}</p>
                                                )}

                                                {/* Message Reactions */}
                                                {message.reactions && message.reactions.length > 0 && (
                                                    <div className="flex items-center space-x-1 mt-2">
                                                        {message.reactions.map((reaction: any, idx: any) => (
                                                            <span
                                                                key={idx}
                                                                className="text-sm bg-white/20 px-2 py-1 rounded-full hover:bg-white/30 cursor-pointer transition-all"
                                                            >
                                                                {reaction}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {message.sender === "staff" && (
                                                <div className="flex items-center justify-end space-x-1 text-xs text-gray-400">
                                                    <span>{message.isRead ? "Đã xem" : "Đã gửi"}</span>
                                                    <CheckCircle2
                                                        className={`h-3 w-3 ${message.isRead ? "text-blue-500" : "text-gray-400"}`}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>

                    {/* Message Input */}
                    <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm">
                        <div className="flex items-center space-x-3">
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-xl hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 bg-transparent"
                            >
                                <Paperclip className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-xl hover:bg-green-50 hover:border-green-300 hover:text-green-600 bg-transparent"
                            >
                                <ImageIcon className="h-4 w-4" />
                            </Button>
                            <div className="flex-1 relative">
                                <Input
                                    placeholder="💬 Nhập tin nhắn thân thiện..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                                    className="pr-20 py-3 text-base bg-white dark:bg-gray-800 border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-2xl"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                                    <Button variant="ghost" size="sm" className="rounded-xl hover:bg-yellow-50">
                                        <Smile className="h-4 w-4 text-yellow-500" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="rounded-xl hover:bg-red-50">
                                        <Mic className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            </div>
                            <Button
                                onClick={handleSendMessage}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl px-6 shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                                <Send className="h-4 w-4 mr-2" />
                                Gửi
                            </Button>
                        </div>

                        {/* Quick Response Templates */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 hover:from-blue-100 hover:to-purple-100 rounded-xl"
                            >
                                📅 Lên lịch xem nhà
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:from-green-100 hover:to-emerald-100 rounded-xl"
                            >
                                💰 Gửi bảng giá
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 hover:from-purple-100 hover:to-pink-100 rounded-xl"
                            >
                                📋 Tư vấn tài chính
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200 hover:from-orange-100 hover:to-yellow-100 rounded-xl"
                            >
                                📞 Liên hệ sau
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs bg-gradient-to-r from-pink-50 to-red-50 border-pink-200 hover:from-pink-100 hover:to-red-100 rounded-xl"
                            >
                                🎁 Ưu đãi đặc biệt
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900">
                    <div className="text-center p-8">
                        <div className="mb-6">
                            <MessageSquare className="h-20 w-20 text-blue-400 mx-auto mb-4" />
                            <div className="flex items-center justify-center space-x-2 text-4xl mb-4">
                                <span>💬</span>
                                <span>✨</span>
                                <span>😊</span>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                            Chào mừng đến Chat Center! 🎉
                        </h3>
                        <p className="text-gray-500 text-lg mb-6 max-w-md">
                            Chọn một cuộc trò chuyện để bắt đầu kết nối thân thiện với khách hàng
                        </p>
                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                                <Heart className="h-4 w-4 text-pink-400" />
                                Thân thiện
                            </span>
                            <span className="flex items-center gap-1">
                                <Zap className="h-4 w-4 text-yellow-400" />
                                Nhanh chóng
                            </span>
                            <span className="flex items-center gap-1">
                                <Sparkles className="h-4 w-4 text-purple-400" />
                                Chuyên nghiệp
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
