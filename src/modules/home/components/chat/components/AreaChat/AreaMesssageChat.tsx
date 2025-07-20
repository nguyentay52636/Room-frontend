import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CheckCircle2, File, MessageCircle } from 'lucide-react'

export default function AreaMesssageChat({
    messages,
    currentUser,
    selectedChat,
    messagesEndRef,
    rooms = [],
    onMessageClick
}: {
    messages: any,
    currentUser: any,
    selectedChat: any,
    messagesEndRef?: React.RefObject<HTMLDivElement | null>,
    rooms?: any[],
    onMessageClick?: (message: any, rooms: any[]) => void
}) {
    const localMessagesEndRef = useRef<HTMLDivElement>(null)
    const ref = messagesEndRef || localMessagesEndRef

    const handleMessageClick = (message: any) => {
        if (onMessageClick) {
            console.log("🔗 Room IDs available:", rooms.map(room => ({ id: room._id, name: room.tenPhong })));
            onMessageClick(message, rooms);
        }
    }

    return (
        <div className="flex-1 min-h-0 scroll-auto">
            <ScrollArea className="h-full p-6">
                <div className="space-y-4">
                    {messages && messages.length > 0 ? (
                        <>
                            {messages.map((message: any, index: any) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.senderId === currentUser.id ? "justify-end" : "justify-start"
                                        } group`}
                                >
                                    <div
                                        className={`flex items-start space-x-3 max-w-[75%] ${message.senderId === currentUser.id ? "flex-row-reverse space-x-reverse" : ""
                                            }`}
                                    >
                                        <Avatar className="h-8 w-8 ring-2 ring-white shadow-sm">
                                            <AvatarImage
                                                src={
                                                    message.senderId === currentUser.id
                                                        ? currentUser.anhDaiDien
                                                        : selectedChat.user?.anhDaiDien || selectedChat.anhDaiDien
                                                }
                                                alt={message.senderName}
                                            />
                                            <AvatarFallback
                                                className={
                                                    message.senderId === currentUser.id
                                                        ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white text-xs"
                                                        : "bg-gradient-to-br from-blue-400 to-purple-500 text-white text-xs"
                                                }
                                            >
                                                {message.senderName.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs font-medium text-gray-700">{message.senderName}</span>
                                                <span className="text-xs text-gray-500">{message.timestamp}</span>
                                            </div>

                                            <div
                                                onClick={() => handleMessageClick(message)}
                                                className={`rounded-2xl p-3 shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm cursor-pointer hover:scale-[1.02] ${message.senderId === currentUser.id
                                                    ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                                                    : "bg-white/80 text-gray-900 border border-gray-200/50 hover:bg-white/90"
                                                    }`}
                                            >
                                                {message.type === "file" || message.type === "image" ? (
                                                    <div className="flex items-center space-x-3">
                                                        <div className="p-2 bg-white/20 rounded-xl">
                                                            <File className="h-4 w-4" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-sm">{message.content}</p>
                                                            <p
                                                                className={`text-xs ${message.senderId === currentUser.id ? "text-blue-100" : "text-gray-500"
                                                                    }`}
                                                            >
                                                                {message.type === "image" ? "Hình ảnh" : "PDF Document"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className="text-sm leading-relaxed">{message.content}</p>
                                                )}

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

                                            {message.senderId === currentUser.id && (
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
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-500 mb-2">Chưa có tin nhắn</h3>
                            <p className="text-sm text-gray-400">
                                Bắt đầu cuộc trò chuyện với {selectedChat?.user?.ten || selectedChat?.ten || "người này"}
                            </p>
                        </div>
                    )}
                    <div ref={ref} />
                </div>
            </ScrollArea>
        </div>
    )
}
