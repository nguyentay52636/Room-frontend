
import { useState } from "react"



import { Button } from "@/components/ui/button"


import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, GripVertical } from 'lucide-react'
import React from "react"
import { chats, messages } from "./components/Mock/DataChat"
import FilterSearchLeftSiderChatManager from "./components/ LeftSiderChatManager/components/FilterSearchLeftSiderChatManager"
import ChatItemLeftSiderManager from "./components/ LeftSiderChatManager/components/ChatItemLeftSiderManager"
import CenterSiderChatManager from "./components/CenterSiderChatManager/CenterSiderChatManager"
import RightSiderChatManager from "./components/RightSiderChatManager/RightSiderChatManager"

export default function ChatManager() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [typeFilter, setTypeFilter] = useState("all")
    const [selectedChat, setSelectedChat] = useState<any>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [activeChat, setActiveChat] = useState<number | null>(1)
    const [newMessage, setNewMessage] = useState("")
    const [sidebarWidth, setSidebarWidth] = useState(400)
    const [isResizing, setIsResizing] = useState(false)
    const [isAutoScrolling, setIsAutoScrolling] = useState(false)



    const filteredChats = chats.filter((chat) => {
        const matchesSearch =
            chat.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chat.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || chat.status === statusFilter
        const matchesType = typeFilter === "all" || chat.type === typeFilter

        return matchesSearch && matchesStatus && matchesType
    })

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-gradient-to-r from-emerald-400 to-emerald-500"
            case "pending":
                return "bg-gradient-to-r from-amber-400 to-amber-500"
            case "resolved":
                return "bg-gradient-to-r from-blue-400 to-blue-500"
            case "archived":
                return "bg-gradient-to-r from-gray-400 to-gray-500"
            default:
                return "bg-gradient-to-r from-gray-400 to-gray-500"
        }
    }


    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "urgent":
                return "text-red-600 bg-gradient-to-r from-red-50 to-red-100 border-red-200"
            case "high":
                return "text-orange-600 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200"
            case "normal":
                return "text-blue-600 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200"
            case "low":
                return "text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200"
            default:
                return "text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200"
        }
    }

    const handleChatSelect = (chat: any) => {
        setActiveChat(chat.id)
        setSelectedChat(chat)
    }

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            console.log("Sending message:", newMessage)
            setNewMessage("")
        }
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsResizing(true)
        e.preventDefault()
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing) return

        const newWidth = e.clientX
        if (newWidth >= 300 && newWidth <= 600 && newWidth !== sidebarWidth) {
            setSidebarWidth(newWidth)
        }

        // Auto scroll when sidebar goes beyond viewport
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const scrollThreshold = 50 // pixels from edge to start scrolling

        let isScrolling = false

        // Horizontal auto-scroll
        if (e.clientX > viewportWidth - scrollThreshold) {
            // Scroll right
            window.scrollBy({
                left: 10,
                behavior: 'auto'
            })
            isScrolling = true
        } else if (e.clientX < scrollThreshold) {
            // Scroll left
            window.scrollBy({
                left: -10,
                behavior: 'auto'
            })
            isScrolling = true
        }

        // Vertical auto-scroll
        if (e.clientY > viewportHeight - scrollThreshold) {
            // Scroll down
            window.scrollBy({
                top: 10,
                behavior: 'auto'
            })
            isScrolling = true
        } else if (e.clientY < scrollThreshold) {
            // Scroll up
            window.scrollBy({
                top: -10,
                behavior: 'auto'
            })
            isScrolling = true
        }

        setIsAutoScrolling(isScrolling)
    }

    const handleMouseUp = () => {
        setIsResizing(false)
        setIsAutoScrolling(false)
    }

    React.useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
            document.body.style.cursor = 'col-resize'
            document.body.style.userSelect = 'none'

            return () => {
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseUp)
                document.body.style.cursor = ''
                document.body.style.userSelect = ''
            }
        }
    }, [isResizing])



    return (
        <>


            <div className="flex flex-1 h-[calc(100vh-4rem)] sticky top-0  bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-950">
                {/* Chat List Sidebar */}
                <div
                    className="border-r border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex flex-col relative transition-all duration-300"
                    style={{ width: `${sidebarWidth}px`, minWidth: '300px', maxWidth: '600px' }}
                >
                    {/* Resize Handle */}
                    <div
                        className="absolute right-0 top-0 bottom-0 w-1 bg-gray-300 dark:bg-gray-600 hover:bg-blue-500 dark:hover:bg-blue-400 cursor-col-resize transition-colors duration-200 z-10"
                        onMouseDown={handleMouseDown}
                    >
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <GripVertical className="h-4 w-4 text-gray-500" />
                        </div>
                    </div>

                    <FilterSearchLeftSiderChatManager setSearchTerm={setSearchTerm} searchTerm={searchTerm} setStatusFilter={setStatusFilter} statusFilter={statusFilter} />


                    {/* Chat List */}
                    <ScrollArea className="flex-1">

                        {filteredChats.map((chat) => (
                            <ChatItemLeftSiderManager getStatusColor={getStatusColor} key={chat.id} chat={chat} handleChatSelect={handleChatSelect} activeChat={activeChat} />
                        ))}

                    </ScrollArea>

                    {/* Quick Actions */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                            <Plus className="h-4 w-4 mr-2" />✨ Cuộc trò chuyện mới
                        </Button>
                    </div>
                </div>


                <CenterSiderChatManager selectedChat={selectedChat} messages={messages} newMessage={newMessage} setNewMessage={setNewMessage} handleSendMessage={handleSendMessage} getPriorityColor={getPriorityColor} />
                {selectedChat && (
                    <RightSiderChatManager selectedChat={selectedChat} />
                )}
            </div>

            {/* <ChatDialog chat={selectedChat} open={isDialogOpen} onOpenChange={setIsDialogOpen} /> */}
        </>
    )
}
