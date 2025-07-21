import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CheckCircle2, File, MessageCircle, Reply, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AreaMesssageChat({
    messages,
    currentUser,
    selectedChat,
    messagesEndRef,
    rooms = [],
    onMessageClick,
    onReplyToMessage
}: {
    messages: any,
    currentUser: any,
    selectedChat: any,
    messagesEndRef?: React.RefObject<HTMLDivElement | null>,
    rooms?: any[],
    onMessageClick?: (message: any, rooms: any[]) => void,
    onReplyToMessage?: (message: any) => void
}) {
    const localMessagesEndRef = useRef<HTMLDivElement>(null)
    const ref = messagesEndRef || localMessagesEndRef

    const handleMessageClick = (message: any) => {
        if (onMessageClick) {
            console.log("🔗 Room IDs available:", rooms.map(room => ({ id: room._id, name: room.tenPhong })));
            onMessageClick(message, rooms);
        }
    }

    const handleReplyClick = (message: any, event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent triggering message click
        if (onReplyToMessage) {
            onReplyToMessage(message);
        }
    }

    return (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <ScrollArea className="flex-1 h-full overflow-hidden">
                <div className="p-4 space-y-4 min-h-full">
                    {messages.map((message: any, index: any) => (
                        <div
                            key={index}
                            className={`flex ${message.senderId === currentUser.id ? "justify-end" : "justify-start"
                                } group relative`}
                        >
                            <div
                                className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.senderId === currentUser.id ? "flex-row-reverse space-x-reverse" : ""
                                    }`}
                            >
                                <Avatar className="w-8 h-8 flex-shrink-0">
                                    <AvatarImage
                                        src={
                                            message.senderId === currentUser.id
                                                ? currentUser.anhDaiDien
                                                : selectedChat.user.anhDaiDien
                                        }
                                        alt={message.senderName}
                                    />
                                    <AvatarFallback className="text-xs">
                                        {(message.senderId === currentUser.id
                                            ? currentUser.ten
                                            : selectedChat.user.ten
                                        )
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>

                                <div className={`flex flex-col ${message.senderId === currentUser.id ? "items-end" : "items-start"}`}>
                                    <div className="flex items-center space-x-2 mb-1">
                                        <span
                                            className={`text-xs font-medium ${message.senderId === currentUser.id ? "text-blue-600" : "text-gray-600"
                                                }`}
                                        >
                                            {message.senderName}
                                        </span>
                                        <span className="text-xs text-gray-400">{message.timestamp}</span>
                                    </div>

                                    <div
                                        className={`px-4 py-3 rounded-2xl shadow-sm relative cursor-pointer transition-all duration-200 hover:shadow-md group ${message.senderId === currentUser.id
                                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm"
                                            : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm hover:border-gray-300"
                                            }`}
                                        onClick={() => handleMessageClick(message)}
                                    >
                                        {/* Reply indicator if this is a reply */}
                                        {message.replyTo && (
                                            <div className={`mb-2 p-2 rounded-lg border-l-2 ${message.senderId === currentUser.id
                                                ? "bg-white/20 border-white/40 text-blue-100"
                                                : "bg-gray-50 border-gray-300 text-gray-600"
                                                }`}>
                                                <p className="text-xs opacity-75">Đang trả lời</p>
                                                <p className="text-sm truncate">{message.replyTo.content}</p>
                                            </div>
                                        )}

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
                                            <p className="text-sm leading-relaxed break-words">{message.content}</p>
                                        )}

                                        {/* Message actions - show on hover */}
                                        <div className={`absolute ${message.senderId === currentUser.id ? "-left-12" : "-right-12"
                                            } top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10`}>
                                            <div className="flex items-center space-x-1">
                                                {onReplyToMessage && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 rounded-full"
                                                        onClick={(e) => handleReplyClick(message, e)}
                                                        title="Trả lời tin nhắn"
                                                    >
                                                        <Reply className="h-3 w-3 text-gray-600" />
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 rounded-full"
                                                    title="Thêm tùy chọn"
                                                >
                                                    <MoreVertical className="h-3 w-3 text-gray-600" />
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Message status indicator for sent messages */}
                                        {message.senderId === currentUser.id && (
                                            <div className="absolute -bottom-1 -right-1">
                                                <CheckCircle2 className="w-3 h-3 text-blue-300" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={ref} />
                </div>
            </ScrollArea>
        </div>
    )
}
