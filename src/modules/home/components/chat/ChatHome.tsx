
import { useState, useRef, useEffect } from "react"

import { Badge } from "@/components/ui/badge"

import {
    Home,
    Users
} from "lucide-react"
import HeaderChat from "./components/HeaderChat"
import HeaderSiderChat from "./components/LeftSiderChat/HeaderSiderChat"
import TabsSiderChat from "./components/LeftSiderChat/TabsSiderChat"
import AreaHeaderChat from "./components/AreaChat/AreaHeaderChat"
import AreaMesssageChat from "./components/AreaChat/AreaMesssageChat"
import AreaMessageInput from "./components/AreaChat/AreaMessageInput"
import AreaChatReverse from "./components/AreaChat/AreaChatReverse"
import { Message } from "@/lib/apis/types"
import { getMessagesByUser } from "@/lib/apis/messageApi"
import { useSelector } from "react-redux"
import { selectAuth } from "@/redux/slices/authSlice"
export default function ChatHome() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedChat, setSelectedChat] = useState<any>(null)
    const [newMessage, setNewMessage] = useState("")
    const [activeTab, setActiveTab] = useState("chats")
    const [isFullscreen, setIsFullscreen] = useState(true)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const { user } = useSelector(selectAuth)

    useEffect(() => {
        const fetchMessagesUser = async () => {
            try {
                if (user?._id && selectedChat?.user?.id) {
                    const { data } = await getMessagesByUser(user._id, selectedChat.user.id)
                    setMessages(data)
                }
            } catch (error: any) {
                console.log(error)
            }
        }
        fetchMessagesUser()
    }, [selectedChat, user])

    const currentUser = {
        id: "current-user",
        ten: "Nguyễn Văn Minh",
        anhDaiDien: "/placeholder.svg?height=40&width=40&text=NVM",
        trangThai: "online",
    }
    const users = [
        {
            id: "1",
            ten: "Trần Thị Lan",
            anhDaiDien: "/placeholder.svg?height=40&width=40&text=TTL",
            trangThai: "online",
            lastSeen: "Đang online",
            diaChi: "Quận 1, TP.HCM",
            vaiTro: "tenant",
            soSao: 4.8,
            soLuotDanhGia: 12,
            gioiThieu: "Tôi đang tìm kiếm căn hộ 2PN tại khu vực trung tâm",
            sothich: ["Căn hộ cao cấp", "Gần trung tâm", "View đẹp"],
            isVerified: true,
        },
        {
            id: "2",
            ten: "Lê Văn Đức",
            anhDaiDien: "/placeholder.svg?height=40&width=40&text=LVD",
            trangThai: "online",
            lastSeen: "5 phút trước",
            diaChi: "Quận 7, TP.HCM",
            vaiTro: "landlord",
            soSao: 4.9,
            soLuotDanhGia: 28,
            gioiThieu: "Chủ sở hữu nhiều bất động sản cao cấp tại TP.HCM",
            sothich: ["Bất động sản cao cấp", "Đầu tư", "Tư vấn"],
            isVerified: true,
        },
        {
            id: "3",
            ten: "Phạm Thị Hoa",
            anhDaiDien: "/placeholder.svg?height=40&width=40&text=PTH",
            trangThai: "away",
            lastSeen: "30 phút trước",
            diaChi: "Quận 3, TP.HCM",
            vaiTro: "tenant",
            soSao: 4.5,
            soLuotDanhGia: 8,
            gioiThieu: "Sinh viên tìm phòng trọ giá rẻ gần trường đại học",
            sothich: ["Phòng trọ", "Giá rẻ", "Gần trường học"],
            isVerified: false,
        },
        {
            id: "4",
            ten: "Võ Minh Tuấn",
            anhDaiDien: "/placeholder.svg?height=40&width=40&text=VMT",
            trangThai: "offline",
            lastSeen: "2 giờ trước",
            diaChi: "Bình Thạnh, TP.HCM",
            vaiTro: "landlord",
            soSao: 4.7,
            soLuotDanhGia: 15,
            gioiThieu: "Chuyên cho thuê căn hộ dịch vụ và văn phòng",
            sothich: ["Căn hộ dịch vụ", "Văn phòng", "Ngắn hạn"],
            isVerified: true,
        },
    ]
    const conversations = [
        {
            id: "1",
            userId: "1",
            user: users[0],
            lastMessage: "Bạn có thể chia sẻ kinh nghiệm thuê nhà ở khu vực này không?",
            lastMessageTime: "14:30",
            unreadCount: 2,
            isPinned: true,
            isGroup: false,
            topic: "Tư vấn khu vực",
        },
        {
            id: "2",
            userId: "2",
            user: users[1],
            lastMessage: "Tôi có một số căn hộ phù hợp với yêu cầu của bạn",
            lastMessageTime: "11:45",
            unreadCount: 0,
            isPinned: false,
            isGroup: false,
            topic: "Tìm nhà",
        },
        {
            id: "3",
            userId: "3",
            user: users[2],
            lastMessage: "Cảm ơn bạn đã chia sẻ thông tin hữu ích!",
            lastMessageTime: "09:20",
            unreadCount: 1,
            isPinned: false,
            isGroup: false,
            topic: "Chia sẻ kinh nghiệm",
        },
    ]
    const groupChats = [
        {
            id: "group-1",
            ten: "Nhóm thuê nhà Quận 1",
            anhDaiDien: "/placeholder.svg?height=40&width=40&text=Q1",
            members: 24,
            lastMessage: "Ai biết chung cư nào tốt ở khu này không?",
            lastMessageTime: "16:20",
            unreadCount: 5,
            isPinned: true,
            topic: "Thảo luận khu vực",
            description: "Nhóm chia sẻ thông tin thuê nhà tại Quận 1",
        },
        {
            id: "group-2",
            ten: "Cộng đồng chủ nhà TP.HCM",
            anhDaiDien: "/placeholder.svg?height=40&width=40&text=CN",
            members: 156,
            lastMessage: "Chia sẻ kinh nghiệm quản lý bất động sản",
            lastMessageTime: "13:15",
            unreadCount: 12,
            isPinned: false,
            topic: "Kinh nghiệm chủ nhà",
            description: "Cộng đồng các chủ nhà chia sẻ kinh nghiệm",
        },
    ]

    // Mock messages
    // const messages = [
    //     {
    //         id: "1",
    //         senderId: "1",
    //         senderName: "Trần Thị Lan",
    //         content: "Chào bạn! Tôi thấy bạn cũng đang tìm nhà ở khu vực Quận 1",
    //         timestamp: "14:25",
    //         type: "text",
    //         isRead: true,
    //         reactions: ["👍"],
    //     },
    //     {
    //         id: "1",
    //         senderId: "1",
    //         senderName: "Trần Thị Lan",
    //         content: "Chào bạn! Tôi thấy bạn cũng đang tìm nhà ở khu vực Quận 1",
    //         timestamp: "14:25",
    //         type: "text",
    //         isRead: true,
    //         reactions: ["👍"],
    //     },
    //     {
    //         id: "1",
    //         senderId: "1",
    //         senderName: "Trần Thị Lan",
    //         content: "Chào bạn! Tôi thấy bạn cũng đang tìm nhà ở khu vực Quận 1",
    //         timestamp: "14:25",
    //         type: "text",
    //         isRead: true,
    //         reactions: ["👍"],
    //     },
    //     {
    //         id: "1",
    //         senderId: "1",
    //         senderName: "Trần Thị Lan",
    //         content: "Chào bạn! Tôi thấy bạn cũng đang tìm nhà ở khu vực Quận 1",
    //         timestamp: "14:25",
    //         type: "text",
    //         isRead: true,
    //         reactions: ["👍"],
    //     },
    //     {
    //         id: "1",
    //         senderId: "1",
    //         senderName: "Trần Thị Lan",
    //         content: "Chào bạn! Tôi thấy bạn cũng đang tìm nhà ở khu vực Quận 1",
    //         timestamp: "14:25",
    //         type: "text",
    //         isRead: true,
    //         reactions: ["👍"],
    //     },
    //     {
    //         id: "1",
    //         senderId: "1",
    //         senderName: "Trần Thị Lan",
    //         content: "Chào bạn! Tôi thấy bạn cũng đang tìm nhà ở khu vực Quận 1",
    //         timestamp: "14:25",
    //         type: "text",
    //         isRead: true,
    //         reactions: ["👍"],
    //     },
    //     {
    //         id: "1",
    //         senderId: "1",
    //         senderName: "Trần Thị Lan",
    //         content: "Chào bạn! Tôi thấy bạn cũng đang tìm nhà ở khu vực Quận 1",
    //         timestamp: "14:25",
    //         type: "text",
    //         isRead: true,
    //         reactions: ["👍"],
    //     },
    //     {
    //         id: "1",
    //         senderId: "1",
    //         senderName: "Trần Thị Lan",
    //         content: "Chào bạn! Tôi thấy bạn cũng đang tìm nhà ở khu vực Quận 1",
    //         timestamp: "14:25",
    //         type: "text",
    //         isRead: true,
    //         reactions: ["👍"],
    //     },
    //     {
    //         id: "1",
    //         senderId: "1",
    //         senderName: "Trần Thị Lan",
    //         content: "Chào bạn! Tôi thấy bạn cũng đang tìm nhà ở khu vực Quận 1",
    //         timestamp: "14:25",
    //         type: "text",
    //         isRead: true,
    //         reactions: ["👍"],
    //     },
    //     {
    //         id: "1",
    //         senderId: "1",
    //         senderName: "Trần Thị Lan",
    //         content: "Chào bạn! Tôi thấy bạn cũng đang tìm nhà ở khu vực Quận 1",
    //         timestamp: "14:25",
    //         type: "text",
    //         isRead: true,
    //         reactions: ["👍"],
    //     },
    //     {
    //         id: "1",
    //         senderId: "1",
    //         senderName: "Trần Thị Lan",
    //         content: "Chào bạn! Tôi thấy bạn cũng đang tìm nhà ở khu vực Quận 1",
    //         timestamp: "14:25",
    //         type: "text",
    //         isRead: true,
    //         reactions: ["👍"],
    //     },

    //     {
    //         id: "2",
    //         senderId: "current-user",
    //         senderName: "Nguyễn Văn Minh",
    //         content: "Chào bạn Lan! Đúng rồi, tôi đang tìm căn hộ 2PN ở khu vực đó. Bạn có kinh nghiệm gì không?",
    //         timestamp: "14:26",
    //         type: "text",
    //         isRead: true,
    //     },
    //     {
    //         id: "3",
    //         senderId: "1",
    //         senderName: "Trần Thị Lan",
    //         content: "Tôi đã thuê ở đây được 2 năm rồi. Khu vực này rất tiện lợi, gần trung tâm và có nhiều tiện ích",
    //         timestamp: "14:27",
    //         type: "text",
    //         isRead: true,
    //     },
    //     {
    //         id: "4",
    //         senderId: "1",
    //         senderName: "Trần Thị Lan",
    //         content: "Bạn có thể tham khảo một số tòa nhà tôi từng xem qua",
    //         timestamp: "14:28",
    //         type: "text",
    //         isRead: true,
    //     },
    //     {
    //         id: "5",
    //         senderId: "1",
    //         senderName: "Trần Thị Lan",
    //         content: "Danh_sach_chung_cu_quan_1.pdf",
    //         timestamp: "14:29",
    //         type: "file",
    //         isRead: true,
    //     },
    //     {
    //         id: "6",
    //         senderId: "1",
    //         senderName: "Trần Thị Lan",
    //         content: "Bạn có thể chia sẻ kinh nghiệm thuê nhà ở khu vực này không?",
    //         timestamp: "14:30",
    //         type: "text",
    //         isRead: false,
    //     },
    // ]

    const filteredUsers = users.filter(
        (user) =>
            user.ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.diaChi.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.gioiThieu.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const filteredConversations = conversations.filter(
        (conv) =>
            conv.user.ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
            conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
            conv.topic.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const getStatusColor = (status: string) => {
        switch (status) {
            case "online":
                return "bg-gradient-to-r from-emerald-400 to-emerald-500"
            case "away":
                return "bg-gradient-to-r from-amber-400 to-amber-500"
            case "offline":
                return "bg-gray-400"
            default:
                return "bg-gray-400"
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case "online":
                return "Đang online"
            case "away":
                return "Vắng mặt"
            case "offline":
                return "Ngoại tuyến"
            default:
                return "Không xác định"
        }
    }

    const getRoleIcon = (role: string) => {
        return role === "landlord" ? (
            <Home className="w-3 h-3 text-blue-600" />
        ) : (
            <Users className="w-3 h-3 text-purple-600" />
        )
    }

    const getRoleBadge = (role: string) => {
        return role === "landlord" ? (
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                🏠 Chủ nhà
            </Badge>
        ) : (
            <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                👤 Người thuê
            </Badge>
        )
    }

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            console.log("Sending message:", newMessage)
            setNewMessage("")
        }
    }

    const handleStartChat = (user: any) => {
        const existingChat = conversations.find((conv) => conv.userId === user.id)
        if (existingChat) {
            setSelectedChat(existingChat)
        } else {
            const newChat = {
                id: `new-${user.id}`,
                userId: user.id,
                user: user,
                lastMessage: "",
                lastMessageTime: "",
                unreadCount: 0,
                isPinned: false,
                isGroup: false,
                topic: "Cuộc trò chuyện mới",
            }
            setSelectedChat(newChat)
        }
        setActiveTab("chats")
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <div className="h-screen mt-14! bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col fixed w-full">
            {/* Full Screen Header */}
            <HeaderChat isFullscreen={isFullscreen} setIsFullscreen={setIsFullscreen} />

            {/* Main Chat Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar */}
                <div className="w-80 flex-shrink-0 bg-white/60 backdrop-blur-sm border-r border-gray-200/50">
                    <div className="h-full flex flex-col">
                        <HeaderSiderChat setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

                        {/* Tabs */}
                        <TabsSiderChat getStatusColor={getStatusColor} getRoleBadge={getRoleBadge} getStatusText={getStatusText} activeTab={activeTab} setActiveTab={setActiveTab} filteredConversations={filteredConversations} filteredUsers={filteredUsers} groupChats={groupChats} selectedChat={selectedChat} setSelectedChat={setSelectedChat} handleStartChat={handleStartChat} />
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-white/40 backdrop-blur-sm">
                    {selectedChat ? (
                        <>

                            <AreaHeaderChat getStatusColor={getStatusColor} getRoleBadge={getRoleBadge} getStatusText={getStatusText} selectedChat={selectedChat} />

                            <AreaMesssageChat messages={messages} currentUser={currentUser} selectedChat={selectedChat} messagesEndRef={messagesEndRef} />

                            <AreaMessageInput newMessage={newMessage} setNewMessage={setNewMessage} handleSendMessage={handleSendMessage} />
                        </>
                    ) : (
                        <AreaChatReverse />
                    )}
                </div>
            </div>
        </div>
    )
}
