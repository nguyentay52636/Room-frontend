
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
import { Room } from "@/lib/apis/types"

import { useSelector } from "react-redux"
import { selectAuth } from "@/redux/slices/authSlice"
import { getRoomChatByIdUser, findOrCreatePrivateRoom, getRoomById } from "@/lib/apis/roomApi"
import { getMessagesByRoom, createMessage } from "@/lib/apis/messageApi"
import { getUsers } from "@/lib/apis/userApi"

export default function ChatHome() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedChat, setSelectedChat] = useState<any>(null)
    const [newMessage, setNewMessage] = useState("")
    const [activeTab, setActiveTab] = useState("chats")
    const [isFullscreen, setIsFullscreen] = useState(true)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [messages, setMessages] = useState<any[]>([])
    const { isAuthenticated, user } = useSelector(selectAuth)
    const [rooms, setRooms] = useState<Room[]>([]);
    const [conversations, setConversations] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [messageError, setMessageError] = useState<string | null>(null);
    const [realUsers, setRealUsers] = useState<any[]>([]);
    const [showRoomsList, setShowRoomsList] = useState(false);
    const [clickedMessage, setClickedMessage] = useState<any>(null);

    // Helper function to transform API messages to UI format
    const transformMessages = (messagesData: any[], selectedChat: any, user: any) => {
        console.log("🔄 Transforming messages:", {
            messagesCount: messagesData.length,
            selectedChat: selectedChat?.id,
            currentUser: user?._id,
            sampleMessage: messagesData[0]
        });

        return messagesData.map((msg: any, index: number) => {
            // Handle the case where nguoiGuiId might be an object or string
            const senderId = typeof msg.nguoiGuiId === 'object' ? msg.nguoiGuiId._id : msg.nguoiGuiId;
            const senderInfo = typeof msg.nguoiGuiId === 'object' ? msg.nguoiGuiId : null;

            // Determine sender details
            let sender;
            let senderName;

            if (senderId === user?._id) {
                // Current user is the sender
                sender = user;
                senderName = user?.ten || "Bạn";
            } else if (senderInfo) {
                // Use the populated sender info from API
                sender = senderInfo;
                senderName = senderInfo.ten || "Unknown User";
            } else {
                // Fallback to selectedChat user info
                sender = selectedChat?.user;
                senderName = selectedChat?.user?.ten || "Unknown User";
            }

            // Format time
            const formatTime = (dateString?: string) => {
                if (!dateString) return "";
                const date = new Date(dateString);
                return date.toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit'
                });
            };

            const transformedMessage = {
                id: msg._id || `msg-${index}`,
                senderId: senderId,
                senderName: senderName,
                content: msg.noiDung,
                timestamp: formatTime(msg.createdAt),
                type: msg.hinhAnh ? "image" : "text",
                isRead: msg.daDoc || false,
                reactions: []
            };

            if (index < 3) { // Log first 3 messages for debugging
                console.log(`📝 Message ${index + 1} transformation:`, {
                    original: {
                        _id: msg._id,
                        nguoiGuiId: msg.nguoiGuiId,
                        noiDung: msg.noiDung,
                        createdAt: msg.createdAt
                    },
                    transformed: transformedMessage
                });
            }

            return transformedMessage;
        });
    };

    // Helper function to transform API messages to UI format from room data
    const transformRoomMessages = (roomData: any, user: any) => {
        console.log("🔄 Transforming room messages:", {
            roomId: roomData._id,
            messagesCount: roomData.tinNhan?.length || 0,
            currentUser: user?._id,
            sampleMessage: roomData.tinNhan?.[0]
        });

        const messagesData = roomData.tinNhan || [];

        return messagesData.map((msg: any, index: number) => {
            // Handle the case where nguoiGuiId might be an object or string
            const senderId = typeof msg.nguoiGuiId === 'object' ? msg.nguoiGuiId._id : msg.nguoiGuiId;
            const senderInfo = typeof msg.nguoiGuiId === 'object' ? msg.nguoiGuiId : null;

            // Determine sender details
            let sender;
            let senderName;

            if (senderId === user?._id) {
                // Current user is the sender
                sender = user;
                senderName = user?.ten || "Bạn";
            } else if (senderInfo) {
                // Use the populated sender info from API
                sender = senderInfo;
                senderName = senderInfo.ten || "Unknown User";
            } else {
                // Fallback to room members
                const roomMember = roomData.thanhVien?.find((member: any) => member._id === senderId);
                sender = roomMember;
                senderName = roomMember?.ten || "Unknown User";
            }

            // Format time
            const formatTime = (dateString?: string) => {
                if (!dateString) return "";
                const date = new Date(dateString);
                return date.toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit'
                });
            };

            const transformedMessage = {
                id: msg._id || `msg-${index}`,
                senderId: senderId,
                senderName: senderName,
                content: msg.noiDung,
                timestamp: formatTime(msg.createdAt),
                type: msg.hinhAnh ? "image" : "text",
                isRead: msg.daDoc || false,
                reactions: []
            };

            if (index < 3) { // Log first 3 messages for debugging
                console.log(`📝 Room Message ${index + 1} transformation:`, {
                    original: {
                        _id: msg._id,
                        nguoiGuiId: msg.nguoiGuiId,
                        noiDung: msg.noiDung,
                        createdAt: msg.createdAt
                    },
                    transformed: transformedMessage
                });
            }

            return transformedMessage;
        });
    };

    useEffect(() => {
        const getRoomChat = async () => {
            if (user?._id && isAuthenticated) {
                try {
                    setLoading(true);

                    // Load both rooms and users in parallel
                    const [roomResponse, usersResponse] = await Promise.all([
                        getRoomChatByIdUser(user._id),
                        getUsers()
                    ]);

                    console.log("✅ Loaded rooms:", roomResponse);
                    console.log("✅ Loaded users:", usersResponse);

                    const roomsData = roomResponse.data || roomResponse || [];
                    setRooms(roomsData);

                    // Filter out current user from users list
                    const filteredUsers = (usersResponse || []).filter((u: any) => u._id !== user._id);

                    // Transform users to match expected format
                    const transformedUsers = filteredUsers.map((u: any) => ({
                        id: u._id,
                        _id: u._id,
                        ten: u.ten,
                        email: u.email,
                        tenDangNhap: u.tenDangNhap,
                        soDienThoai: u.soDienThoai,
                        anhDaiDien: u.anhDaiDien || "/placeholder.svg",
                        trangThai: u.trangThai || "offline",
                        vaiTro: typeof u.vaiTro === 'object' ? 'tenant' : u.vaiTro, // Handle role object
                        lastSeen: u.trangThai === "hoat_dong" ? "Đang online" : "Offline",
                        diaChi: "Chưa cập nhật",
                        soSao: 5.0,
                        soLuotDanhGia: 0,
                        gioiThieu: "Người dùng trên hệ thống",
                        sothich: [],
                        isVerified: true,
                    }));

                    setRealUsers(transformedUsers);

                    const transformedConversations = roomsData.map((room: Room) => {

                        const otherUser = room.thanhVien?.find(member => member._id !== user._id) || room.thanhVien?.[0];
                        const lastMessage = room.tinNhan && room.tinNhan.length > 0
                            ? room.tinNhan[room.tinNhan.length - 1]
                            : null;

                        // Format time
                        const formatTime = (dateString?: string) => {
                            if (!dateString) return "";
                            const date = new Date(dateString);
                            return date.toLocaleTimeString('vi-VN', {
                                hour: '2-digit',
                                minute: '2-digit'
                            });
                        };

                        const conversation = {
                            id: room._id,
                            userId: otherUser?._id || "unknown",
                            user: {
                                id: otherUser?._id || "unknown",
                                ten: otherUser?.ten || room.tenPhong || "Người dùng",
                                anhDaiDien: otherUser?.anhDaiDien || room.anhDaiDien || "/placeholder.svg",
                                trangThai: otherUser?.trangThai || "offline",
                                lastSeen: otherUser?.trangThai === "online" ? "Đang online" : "Offline",
                                diaChi: "Chưa cập nhật",
                                vaiTro: "tenant", // Default role
                                soSao: 5.0,
                                soLuotDanhGia: 0,
                                gioiThieu: "Người dùng trên hệ thống",
                                sothich: [],
                                isVerified: true,
                            },
                            lastMessage: lastMessage?.noiDung || "Chưa có tin nhắn",
                            lastMessageTime: formatTime(lastMessage?.createdAt || room.updatedAt),
                            unreadCount: 0,
                            isPinned: false,
                            isGroup: room.loaiPhong === "group",
                            topic: room.loaiPhong === "group" ? "Nhóm chat" : "Tin nhắn riêng",
                            roomData: room
                        };

                        console.log("✅ Transformed conversation:", conversation);
                        return conversation;
                    });


                    setConversations(transformedConversations);
                } catch (error) {
                    console.error("❌ Error loading chat data:", error);
                    setRooms([]);
                    setConversations([]);
                    setRealUsers([]);
                } finally {
                    setLoading(false);
                }
            } else {
                // Reset when user is not authenticated
                setRooms([]);
                setConversations([]);
                setRealUsers([]);
            }
        }
        getRoomChat()
    }, [user, isAuthenticated])

    // Load messages when selectedChat changes - REMOVED as we now use handleChatSelection
    // This old effect is replaced by the new handleChatSelection function that calls getRoomById
    /*
    useEffect(() => {
        const loadMessages = async () => {
            // ... old message loading logic removed ...
        };
        loadMessages();
    }, [selectedChat?.id, isAuthenticated, user?._id]);
    */

    const currentUser = {
        id: user?._id || "current-user",
        ten: user?.ten || "Người dùng",
        anhDaiDien: user?.anhDaiDien || "",
        tenDangNhap: user?.tenDangNhap || "",
        trangThai: user?.trangThai || "hoat_dong",

    }


    const users = !isAuthenticated ? [
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
    ] : [];

    // Mock conversations - only when not authenticated
    const mockConversations = !isAuthenticated ? [
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
    ] : [];

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

    // Use real conversations when authenticated, otherwise use mock data
    const displayConversations = isAuthenticated ? conversations : mockConversations;
    const displayUsers = isAuthenticated ? realUsers : users;

    const filteredUsers = displayUsers.filter(
        (user) =>
            user.ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.diaChi.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.gioiThieu.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const filteredConversations = displayConversations.filter(
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
            case "hoat_dong":
                return "Đang online"
            case "offline":
                return "Ngoại tuyến"
            case "dang_ky":
                return "Đang chờ"
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

    const handleSendMessage = async () => {
        if (newMessage.trim() && selectedChat?.id && user?._id) {
            try {
                console.log("🔄 Sending message:", newMessage);

                const messageData = {
                    roomId: selectedChat.id,
                    nguoiGuiId: user._id,
                    noiDung: newMessage.trim(),
                    daDoc: false,
                    trangThai: "sent"
                };

                const response = await createMessage(messageData);
                console.log("✅ Message sent:", response);

                // Clear input
                setNewMessage("");

                // Reload messages to show the new message
                const updatedMessages = await getMessagesByRoom(selectedChat.id);
                const messagesData = updatedMessages.data || updatedMessages || [];

                // Transform messages to match the expected format
                const transformedMessages = transformMessages(messagesData, selectedChat, user);

                setMessages(transformedMessages);

            } catch (error) {
                console.error("❌ Error sending message:", error);
                // You could show a toast notification here
            }
        }
    }

    const handleStartChat = async (targetUser: any) => {
        try {
            console.log("�� Starting chat with user:", targetUser);
            console.log("📝 Current user:", user?._id);
            console.log("📝 Target user:", targetUser.id || targetUser._id);

            const existingChat = displayConversations.find((conv) => conv.userId === (targetUser.id || targetUser._id))
            if (existingChat) {
                console.log("✅ Found existing chat:", existingChat);
                setSelectedChat(existingChat)
            } else {
                if (!user?._id) {
                    throw new Error("User not authenticated");
                }

                const targetUserId = targetUser.id || targetUser._id;
                console.log("🔄 Creating private room between:", user._id, "and", targetUserId);

                // Use current authenticated user ID and target user ID
                const response = await findOrCreatePrivateRoom(user._id, targetUserId);
                console.log("✅ Room response:", response);

                // Transform the room response to match expected chat format
                const roomData = response.room || response;
                const newChat = {
                    id: roomData._id,
                    userId: targetUserId,
                    user: targetUser,
                    lastMessage: "",
                    lastMessageTime: "",
                    unreadCount: 0,
                    isPinned: false,
                    isGroup: false,
                    topic: "Cuộc trò chuyện mới",
                    roomData: roomData
                };

                console.log("🎯 Setting new chat:", newChat);
                setSelectedChat(newChat);
            }
            setActiveTab("chats")
        } catch (error: any) {
            console.error("❌ Error starting chat:", error);
            const errorMessage = error.response?.status === 403
                ? "Bạn không có quyền tạo phòng chat"
                : error.response?.status === 404
                    ? "Không tìm thấy người dùng"
                    : error.response?.status === 401
                        ? "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại"
                        : "Không thể tạo phòng chat. Vui lòng thử lại sau.";
            setMessageError(errorMessage);
        }
    }

    // Enhanced function to handle chat selection with room data loading
    const handleChatSelection = async (chatItem: any) => {
        try {
            console.log("🎯 Chat item selected:", chatItem);
            console.log("📝 Room ID to load:", chatItem.id);

            setLoadingMessages(true);
            setMessageError(null);

            // Set selected chat immediately for UI feedback
            setSelectedChat(chatItem);

            // Call getRoomById to get full room data with messages
            const roomResponse = await getRoomById(chatItem.id);
            console.log("🏠 Full room data loaded:", roomResponse);

            // Transform and set messages from room data
            const roomData = roomResponse.data || roomResponse;
            const transformedMessages = transformRoomMessages(roomData, user);

            console.log("💬 Setting messages from room data:", transformedMessages);
            setMessages(transformedMessages);

            // Scroll to bottom after messages are loaded
            setTimeout(() => {
                scrollToBottom();
            }, 100);

        } catch (error: any) {
            console.error("❌ Error loading chat room:", error);
            console.error("🔍 Error details:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                roomId: chatItem.id
            });

            // Set empty messages on error
            setMessages([]);

            // Show user-friendly error message
            const errorMessage = error.response?.status === 403
                ? "Bạn không có quyền xem tin nhắn trong phòng này"
                : error.response?.status === 404
                    ? "Không tìm thấy phòng chat này"
                    : error.response?.status === 401
                        ? "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại"
                        : "Không thể tải tin nhắn. Vui lòng thử lại sau.";

            setMessageError(errorMessage);
            console.warn("⚠️ User will see:", errorMessage);

            // Auto clear error after 5 seconds
            setTimeout(() => {
                setMessageError(null);
            }, 5000);

        } finally {
            setLoadingMessages(false);
            console.log("✨ Chat selection completed");
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const retryLoadMessages = async () => {
        if (selectedChat?.id && isAuthenticated) {
            setMessageError(null);
            try {
                setLoadingMessages(true);
                console.log("🔄 Retrying to load messages for room:", selectedChat.id);

                const response = await getMessagesByRoom(selectedChat.id);
                const messagesData = response.data || response || [];

                // Transform messages to match the expected format
                const transformedMessages = transformMessages(messagesData, selectedChat, user);

                setMessages(transformedMessages);
                console.log("✅ Messages reloaded successfully");

                // Scroll to bottom after messages are loaded
                setTimeout(() => {
                    scrollToBottom();
                }, 100);

            } catch (error: any) {
                console.error("❌ Error retrying to load messages:", error);
                const errorMessage = error.response?.status === 403
                    ? "Bạn không có quyền xem tin nhắn trong phòng này"
                    : error.response?.status === 404
                        ? "Không tìm thấy phòng chat này"
                        : error.response?.status === 401
                            ? "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại"
                            : "Không thể tải tin nhắn. Vui lòng thử lại sau.";

                setMessageError(errorMessage);
            } finally {
                setLoadingMessages(false);
            }
        }
    };

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleMessageClick = (message: any, rooms: any[]) => {
        console.log("📋 Message clicked:", message);
        console.log("🏠 Available rooms:", rooms);
        console.log("🆔 Room IDs:", rooms.map(room => room._id));

        setClickedMessage(message);
        setShowRoomsList(true);
    };

    const handleCloseRoomsList = () => {
        setShowRoomsList(false);
        setClickedMessage(null);
    };

    return (
        <div className="h-screen mt-14! bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col fixed w-full">
            {/* Full Screen Header */}
            <HeaderChat isFullscreen={isFullscreen} setIsFullscreen={setIsFullscreen} />
            {process.env.NODE_ENV === 'development' && isAuthenticated && (
                <div className="bg-yellow-50 border-b border-yellow-200 p-2 text-xs">
                    <details className="cursor-pointer">
                        <summary className="font-medium text-yellow-800">
                            Debug Info: Rooms: {rooms.length} | Conversations: {conversations.length} | Loading: {loading.toString()}
                        </summary>
                        <div className="mt-2 space-y-1 text-yellow-700">
                            <div><strong>User ID:</strong> {user?._id}</div>
                            <div><strong>Authenticated:</strong> {isAuthenticated.toString()}</div>
                            <div><strong>Raw Rooms:</strong> {JSON.stringify(rooms.slice(0, 2), null, 2)}</div>
                            <div><strong>Transformed Conversations:</strong> {JSON.stringify(conversations.slice(0, 2), null, 2)}</div>
                        </div>
                    </details>
                </div>
            )}

            {/* Main Chat Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar */}
                <div className="w-80 flex-shrink-0 bg-white/60 backdrop-blur-sm border-r border-gray-200/50">
                    <div className="h-full flex flex-col">
                        <HeaderSiderChat setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

                        {/* Show loading state */}
                        {loading && isAuthenticated ? (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                                    <p className="text-sm text-gray-500">Đang tải danh sách chat...</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Show message when authenticated but no conversations */}
                                {isAuthenticated && !loading && (
                                    <>
                                        {conversations.length === 0 ? (
                                            <div className="flex-1 flex items-center justify-center p-4">
                                                <div className="text-center">
                                                    <p className="text-sm text-gray-500 mb-2">Chưa có cuộc trò chuyện nào</p>
                                                    <p className="text-xs text-gray-400">Bắt đầu trò chuyện với ai đó để hiển thị tại đây</p>
                                                    {/* Debug info */}
                                                    <div className="mt-3 p-2 bg-gray-100 rounded text-xs">
                                                        <p>Debug: Rooms: {rooms.length}, Conversations: {conversations.length}</p>
                                                        <p>User ID: {user?._id}</p>
                                                        <p>Authenticated: {isAuthenticated.toString()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : filteredConversations.length === 0 && searchTerm ? (
                                            <div className="flex-1 flex items-center justify-center p-4">
                                                <div className="text-center">
                                                    <p className="text-sm text-gray-500 mb-2">Không tìm thấy cuộc trò chuyện nào</p>
                                                    <p className="text-xs text-gray-400">Thử tìm kiếm với từ khóa khác</p>
                                                </div>
                                            </div>
                                        ) : null}
                                    </>
                                )}

                                {/* Tabs */}
                                <TabsSiderChat
                                    getStatusColor={getStatusColor}
                                    getRoleBadge={getRoleBadge}
                                    getStatusText={getStatusText}
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                    filteredConversations={filteredConversations}
                                    filteredUsers={filteredUsers}
                                    groupChats={groupChats}
                                    selectedChat={selectedChat}
                                    setSelectedChat={handleChatSelection}
                                    handleStartChat={handleStartChat}
                                />
                            </>
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-white/40 backdrop-blur-sm">
                    {selectedChat ? (
                        <>
                            <AreaHeaderChat getStatusColor={getStatusColor} getRoleBadge={getRoleBadge} getStatusText={getStatusText} selectedChat={selectedChat} />

                            {/* Error Message */}
                            {messageError && (
                                <div className="mx-4 mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <svg className="h-4 w-4 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-2 flex-1">
                                            <p className="text-sm text-red-600">{messageError}</p>
                                        </div>
                                        <div className="ml-2 flex items-center space-x-2">
                                            <button
                                                onClick={retryLoadMessages}
                                                disabled={loadingMessages}
                                                className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {loadingMessages ? "Đang thử lại..." : "Thử lại"}
                                            </button>
                                            <button
                                                onClick={() => setMessageError(null)}
                                                className="text-red-400 hover:text-red-600 transition-colors"
                                            >
                                                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {loadingMessages ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                                        <p className="text-sm text-gray-500">Đang tải tin nhắn...</p>
                                    </div>
                                </div>
                            ) : (
                                <AreaMesssageChat
                                    messages={messages}
                                    currentUser={currentUser}
                                    selectedChat={selectedChat}
                                    messagesEndRef={messagesEndRef}
                                    rooms={rooms}
                                    onMessageClick={handleMessageClick}
                                />
                            )}

                            <AreaMessageInput newMessage={newMessage} setNewMessage={setNewMessage} handleSendMessage={handleSendMessage} />
                        </>
                    ) : (
                        <AreaChatReverse />
                    )}
                </div>
            </div>

            {/* Room List Modal */}
            {showRoomsList && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Danh sách phòng chat ({rooms.length})
                            </h3>
                            <button
                                onClick={handleCloseRoomsList}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-4">
                            {clickedMessage && (
                                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-blue-800">
                                        <span className="font-medium">Tin nhắn được chọn:</span> "{clickedMessage.content}"
                                    </p>
                                    <p className="text-xs text-blue-600 mt-1">
                                        Từ: {clickedMessage.senderName} - {clickedMessage.timestamp}
                                    </p>
                                </div>
                            )}

                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                {rooms.length > 0 ? (
                                    rooms.map((room: any) => (
                                        <div
                                            key={room._id}
                                            className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                                                {room.tenPhong ? room.tenPhong.charAt(0).toUpperCase() : 'R'}
                                            </div>
                                            <div className="ml-3 flex-1">
                                                <h4 className="text-sm font-medium text-gray-900">
                                                    {room.tenPhong || `Phòng ${room._id.slice(-6)}`}
                                                </h4>
                                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                                    <span className="mr-2">ID: {room._id}</span>
                                                    <span className="mr-2">•</span>
                                                    <span className="mr-2">Loại: {room.loaiPhong}</span>
                                                    <span className="mr-2">•</span>
                                                    <span>{room.thanhVien?.length || 0} thành viên</span>
                                                </div>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <button
                                                    onClick={() => {
                                                        console.log("🎯 Room selected:", room);
                                                        // You can add navigation logic here
                                                        handleCloseRoomsList();
                                                    }}
                                                    className="text-blue-600 hover:text-blue-800 font-medium text-sm px-3 py-1 rounded border border-blue-200 hover:bg-blue-50 transition-colors"
                                                >
                                                    Chọn
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="text-gray-400 text-sm">Không có phòng chat nào</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-4 border-t bg-gray-50">
                            <button
                                onClick={handleCloseRoomsList}
                                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
