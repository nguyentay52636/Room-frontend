"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Minimize2, Maximize2 } from "lucide-react"

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Xin chào! Tôi có thể giúp gì cho bạn?",
            sender: "support",
            time: "14:30",
        },
    ])

    const sendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                id: messages.length + 1,
                text: message,
                sender: "user",
                time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
            }
            setMessages([...messages, newMessage])
            setMessage("")

            // Auto reply after 1 second
            setTimeout(() => {
                const autoReply = {
                    id: messages.length + 2,
                    text: "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.",
                    sender: "support",
                    time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
                }
                setMessages((prev) => [...prev, autoReply])
            }, 1000)
        }
    }

    if (!isOpen) {
        return (
            <div className="fixed bottom-30 right-9 z-50">
                <Button
                    onClick={() => setIsOpen(true)}
                    className="rounded-full w-14 h-14 bg-blue-500 hover:bg-blue-600 shadow-lg relative"
                >
                    <MessageCircle className="h-6 w-6" />
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full p-0 flex items-center justify-center">
                        3
                    </Badge>
                </Button>
            </div>
        )
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Card className={`w-80 shadow-xl transition-all duration-300 ${isMinimized ? "h-14" : "h-96"}`}>
                <CardHeader className="p-4 bg-blue-500 text-white rounded-t-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <CardTitle className="text-sm">Hỗ trợ trực tuyến</CardTitle>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsMinimized(!isMinimized)}
                                className="h-6 w-6 p-0 hover:bg-blue-600"
                            >
                                {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsOpen(false)}
                                className="h-6 w-6 p-0 hover:bg-blue-600"
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                {!isMinimized && (
                    <CardContent className="p-0 flex flex-col h-80">
                        {/* Messages */}
                        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                    <div
                                        className={`max-w-xs p-2 rounded-lg text-sm ${msg.sender === "user"
                                            ? "bg-blue-500 text-white rounded-br-none"
                                            : "bg-gray-100 text-gray-800 rounded-bl-none"
                                            }`}
                                    >
                                        <p>{msg.text}</p>
                                        <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                                            {msg.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t">
                            <div className="flex space-x-2">
                                <Input
                                    placeholder="Nhập tin nhắn..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                                    className="flex-1"
                                />
                                <Button onClick={sendMessage} size="sm" className="bg-blue-500 hover:bg-blue-600">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                )}
            </Card>
        </div>
    )
}
