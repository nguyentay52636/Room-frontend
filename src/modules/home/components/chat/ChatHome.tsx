
import { useState, useRef, useEffect } from "react"

import { Badge } from "@/components/ui/badge"

import {
    Home,
    Users,
    MessageCircle
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
import useChatSocket from "@/services/socketService"

// Constants
const REALTIME_POLL_INTERVAL = 3000
const NOTIFICATION_DURATION = 4000
const ERROR_CLEAR_DURATION = 5000
const UPLOAD_SIMULATION_DELAY = 1000

const ERROR_MESSAGES = {
    FORBIDDEN: "Bạn không có quyền xem tin nhắn trong phòng này",
    NOT_FOUND: "Không tìm thấy phòng chat này",
    UNAUTHORIZED: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại",
    CREATE_ROOM_FAILED: "Không thể tạo phòng chat. Vui lòng thử lại sau.",
    USER_NOT_FOUND: "Không tìm thấy người dùng",
    CREATE_ROOM_FORBIDDEN: "Bạn không có quyền tạo phòng chat"
}

// Utility functions
const formatTime = (dateString?: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
    })
}

const getErrorMessage = (error: any) => {
    const status = error.response?.status
    switch (status) {
        case 403: return ERROR_MESSAGES.FORBIDDEN
        case 404: return ERROR_MESSAGES.NOT_FOUND
        case 401: return ERROR_MESSAGES.UNAUTHORIZED
        default: return ERROR_MESSAGES.CREATE_ROOM_FAILED
    }
}

const getSendErrorMessage = (error: any) => {
    const status = error.response?.status
    switch (status) {
        case 403: return ERROR_MESSAGES.CREATE_ROOM_FORBIDDEN
        case 404: return ERROR_MESSAGES.USER_NOT_FOUND
        case 401: return ERROR_MESSAGES.UNAUTHORIZED
        default: return ERROR_MESSAGES.CREATE_ROOM_FAILED
    }
}

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
    const [isRealtimeEnabled, setIsRealtimeEnabled] = useState(true);
    const [lastMessageCount, setLastMessageCount] = useState(0);

    // Enhanced chat features states
    const [replyingTo, setReplyingTo] = useState<any>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [typingUsers, setTypingUsers] = useState<string[]>([]);
    const [uploadingFiles, setUploadingFiles] = useState<boolean>(false);

    // WebSocket integration - chỉ để gửi tin nhắn
    const { sendMessage: socketSendMessage } = useChatSocket({ roomId: selectedChat?.id });

    // Unified message transformation function
    const transformMessages = (messagesData: any[], currentUser: any, selectedChat?: any, roomData?: any) => {
        console.log("🔄 Transforming messages:", {
            messagesCount: messagesData.length,
            selectedChat: selectedChat?.id || roomData?._id,
            currentUser: currentUser?._id,
            sampleMessage: messagesData[0]
        });

        return messagesData.map((msg: any, index: number) => {
            const senderId = typeof msg.nguoiGuiId === 'object' ? msg.nguoiGuiId._id : msg.nguoiGuiId;
            const senderInfo = typeof msg.nguoiGuiId === 'object' ? msg.nguoiGuiId : null;

            let senderName;
            if (senderId === currentUser?._id) {
                senderName = currentUser?.ten || "Bạn";
            } else if (senderInfo) {
                senderName = senderInfo.ten || "Unknown User";
            } else {
                // Fallback logic
                const fallbackUser = selectedChat?.user ||
                    roomData?.thanhVien?.find((member: any) => member._id === senderId);
                senderName = fallbackUser?.ten || "Unknown User";
            }

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

            if (index < 3) {
                console.log(`📝 Message ${index + 1} transformation:`, {
                    original: { _id: msg._id, nguoiGuiId: msg.nguoiGuiId, noiDung: msg.noiDung, createdAt: msg.createdAt },
                    transformed: transformedMessage
                });
            }

            return transformedMessage;
        });
    };

    // Transform user data utility
    const transformUser = (u: any) => ({
        id: u._id,
        _id: u._id,
        ten: u.ten,
        email: u.email,
        tenDangNhap: u.tenDangNhap,
        soDienThoai: u.soDienThoai,
        anhDaiDien: u.anhDaiDien || "/placeholder.svg",
        trangThai: u.trangThai || "offline",
        vaiTro: typeof u.vaiTro === 'object' ? 'tenant' : u.vaiTro,
        lastSeen: u.trangThai === "hoat_dong" ? "Đang online" : "Offline",
        diaChi: "Chưa cập nhật",
        soSao: 5.0,
        soLuotDanhGia: 0,
        gioiThieu: "Người dùng trên hệ thống",
        sothich: [],
        isVerified: true,
    })

    // Transform room to conversation utility
    const transformRoomToConversation = (room: Room, currentUser: any) => {
        const otherUser = room.thanhVien?.find(member => member._id !== currentUser._id) || room.thanhVien?.[0];
        const lastMessage = room.tinNhan && room.tinNhan.length > 0
            ? room.tinNhan[room.tinNhan.length - 1]
            : null;

        return {
            id: room._id,
            userId: otherUser?._id || "unknown",
            user: {
                id: otherUser?._id || "unknown",
                ten: otherUser?.ten || room.tenPhong || "Người dùng",
                anhDaiDien: otherUser?.anhDaiDien || room.anhDaiDien,
                trangThai: otherUser?.trangThai || "offline",
                lastSeen: otherUser?.trangThai === "online" ? "Đang online" : "Offline",
                diaChi: "Chưa cập nhật",
                vaiTro: "tenant",
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
    }

    // Auto-clear error message utility
    const setErrorWithAutoClear = (error: string, duration = ERROR_CLEAR_DURATION) => {
        setMessageError(error);
        setTimeout(() => setMessageError(null), duration);
    }

    useEffect(() => {
        const getRoomChat = async () => {
            if (user?._id && isAuthenticated) {
                try {
                    setLoading(true);
                    const [roomResponse, usersResponse] = await Promise.all([
                        getRoomChatByIdUser(user._id),
                        getUsers()
                    ]);

                    console.log("✅ Loaded rooms:", roomResponse);

                    const roomsData = roomResponse.data || roomResponse || [];
                    setRooms(roomsData);

                    const filteredUsers = (usersResponse || []).filter((u: any) => u._id !== user._id);
                    setRealUsers(filteredUsers.map(transformUser));

                    const transformedConversations = roomsData.map((room: Room) =>
                        transformRoomToConversation(room, user)
                    );

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
                setRooms([]);
                setConversations([]);
                setRealUsers([]);
            }
        }
        getRoomChat()
    }, [user, isAuthenticated])

    const currentUser = {
        id: user?._id || "current-user",
        ten: user?.ten || "Người dùng",
        anhDaiDien: user?.anhDaiDien || "",
        tenDangNhap: user?.tenDangNhap || "",
        trangThai: user?.trangThai || "hoat_dong",
    }

    const users = !isAuthenticated ? [] : realUsers;
    const mockConversations = !isAuthenticated ? conversations : [];
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
            case "online": return "bg-gradient-to-r from-emerald-400 to-emerald-500"
            case "away": return "bg-gradient-to-r from-amber-400 to-amber-500"
            default: return "bg-gray-400"
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case "hoat_dong": return "Đang online"
            case "offline": return "Ngoại tuyến"
            case "dang_ky": return "Đang chờ"
            default: return "Không xác định"
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

    const handleChatSelection = async (chatItem: any) => {
        try {
            console.log("🎯 Chat item selected:", chatItem);
            setLoadingMessages(true);
            setMessageError(null);
            setSelectedChat(chatItem);

            const roomResponse = await getRoomById(chatItem.id);
            console.log("🏠 Full room data loaded:", roomResponse);

            const roomData = roomResponse.data || roomResponse;
            const transformedMessages = transformMessages(roomData.tinNhan || [], user, chatItem, roomData);

            console.log("💬 Setting messages from room data:", transformedMessages);
            setMessages(transformedMessages);
            setLastMessageCount(transformedMessages.length);

            setTimeout(scrollToBottom, 100);

        } catch (error: any) {
            console.error("❌ Error loading chat room:", error);
            setMessages([]);
            setErrorWithAutoClear(getErrorMessage(error));
        } finally {
            setLoadingMessages(false);
        }
    };

    const realtimeUpdateMessages = async (roomId: string) => {
        try {
            console.log("🔄 Realtime update for room:", roomId);

            const roomResponse = await getRoomById(roomId);
            const roomData = roomResponse.data || roomResponse;
            const freshMessages = transformMessages(roomData.tinNhan || [], user, selectedChat, roomData);

            if (freshMessages.length > lastMessageCount) {
                console.log("🆕 New messages detected:", freshMessages.length - lastMessageCount);

                setMessages(freshMessages);
                setLastMessageCount(freshMessages.length);
                setTimeout(scrollToBottom, 100);

                if (freshMessages.length > lastMessageCount + 1) {
                    console.log("📢 Multiple new messages received");
                }
            } else if (freshMessages.length !== messages.length) {
                console.log("🔄 Messages updated (modified/deleted)");
                setMessages(freshMessages);
                setLastMessageCount(freshMessages.length);
            }

        } catch (error) {
            console.warn("⚠️ Realtime update failed:", error);
        }
    };

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        if (selectedChat?.id && isAuthenticated && isRealtimeEnabled) {
            console.log("🚀 Starting realtime polling for room:", selectedChat.id);
            intervalId = setInterval(() => {
                realtimeUpdateMessages(selectedChat.id);
            }, REALTIME_POLL_INTERVAL);
        }

        return () => {
            if (intervalId) {
                console.log("🛑 Stopping realtime polling");
                clearInterval(intervalId);
            }
        };
    }, [selectedChat?.id, isAuthenticated, isRealtimeEnabled, lastMessageCount]);

    const uploadFiles = async (files: File[]): Promise<string[]> => {
        const uploadPromises = files.map(async (file) => {
            try {
                console.log("📤 Uploading file:", file.name);
                await new Promise(resolve => setTimeout(resolve, UPLOAD_SIMULATION_DELAY));

                return file.type.startsWith('image/')
                    ? URL.createObjectURL(file)
                    : `https://api.example.com/uploads/${file.name}`;
            } catch (error) {
                console.error("❌ Error uploading file:", file.name, error);
                throw new Error(`Không thể upload file ${file.name}`);
            }
        });

        return Promise.all(uploadPromises);
    };

    const updateMessagesAfterSend = async () => {
        const updatedRoomResponse = await getRoomById(selectedChat.id);
        const roomData = updatedRoomResponse.data || updatedRoomResponse;
        const transformedMessages = transformMessages(roomData.tinNhan || [], user, selectedChat, roomData);

        setMessages(transformedMessages);
        setLastMessageCount(transformedMessages.length);
        setTimeout(scrollToBottom, 100);
    }

    const handleSendMessage = async (files?: File[], audioBlob?: Blob) => {
        if ((!newMessage.trim() && (!files || files.length === 0) && !audioBlob) || !selectedChat?.id || !user?._id) {
            return;
        }

        try {
            console.log("🔄 Sending enhanced message:", {
                text: newMessage,
                filesCount: files?.length || 0,
                hasAudio: !!audioBlob,
                replyingTo: replyingTo?.id
            });

            setUploadingFiles(true);

            if (audioBlob) {
                const audioFile = new File([audioBlob], `voice_${Date.now()}.wav`, { type: 'audio/wav' });
                await uploadAndSendMessage("🎤 Tin nhắn thoại", [audioFile]);
                return;
            }

            let messageContent = newMessage.trim();
            let imageUrls: string[] = [];

            if (files && files.length > 0) {
                console.log("📤 Uploading files:", files);
                imageUrls = await uploadFiles(files);

                if (!messageContent) {
                    const fileNames = files.map(f => f.name).join(', ');
                    messageContent = files.length === 1
                        ? `📎 Đã gửi file: ${fileNames}`
                        : `📎 Đã gửi ${files.length} files: ${fileNames}`;
                }
            }

            if (!user?._id) throw new Error("User not authenticated");

            const messageData = {
                roomId: selectedChat.id,
                nguoiGuiId: user._id,
                noiDung: messageContent,
                hinhAnh: imageUrls.length > 0 ? imageUrls[0] : "",
                daDoc: false,
                trangThai: "sent",
                ...(replyingTo && { replyTo: replyingTo.id })
            };

            await socketSendMessage(messageContent, imageUrls.length > 0 ? imageUrls[0] : "");
            console.log("✅ Enhanced message sent via WebSocket");

            setNewMessage("");
            setReplyingTo(null);
            await updateMessagesAfterSend();

        } catch (error) {


        } finally {
            setUploadingFiles(false);
        }
    }

    const uploadAndSendMessage = async (content: string, files: File[]) => {
        try {
            if (!user?._id || !selectedChat?.id) {
                throw new Error("User not authenticated or no chat selected");
            }

            const imageUrls = await uploadFiles(files);

            const messageData = {
                roomId: selectedChat.id,
                nguoiGuiId: user._id,
                noiDung: content,
                hinhAnh: imageUrls[0] || "",
                daDoc: false,
                trangThai: "sent"
            };

            await createMessage(messageData);
            await updateMessagesAfterSend();

        } catch (error) {
            console.error("❌ Error in uploadAndSendMessage:", error);
            throw error;
        }
    };

    const handleReplyToMessage = (message: any) => {
        setReplyingTo(message);
        console.log("💬 Replying to message:", message);
    };

    const handleCancelReply = () => setReplyingTo(null);

    const handleTypingStart = () => setIsTyping(true);
    const handleTypingStop = () => setIsTyping(false);

    useEffect(() => {
        if (selectedChat?.id) {
            const interval = setInterval(() => {
                const shouldShowTyping = Math.random() > 0.8;
                if (shouldShowTyping && !isTyping) {
                    setTypingUsers([selectedChat.user.ten]);
                    setTimeout(() => setTypingUsers([]), 3000);
                }
            }, 10000);

            return () => clearInterval(interval);
        }
    }, [selectedChat?.id, isTyping]);

    const toggleRealtime = () => {
        setIsRealtimeEnabled(!isRealtimeEnabled);
        console.log("🔄 Realtime toggled:", !isRealtimeEnabled);
    };

    const handleStartChat = async (targetUser: any) => {
        try {
            console.log("🔄 Starting chat with user:", targetUser);

            const existingChat = displayConversations.find((conv) => conv.userId === (targetUser.id || targetUser._id))
            if (existingChat) {
                console.log("✅ Found existing chat:", existingChat);
                await handleChatSelection(existingChat);
            } else {
                if (!user?._id) throw new Error("User not authenticated");

                const targetUserId = targetUser.id || targetUser._id;
                console.log("🔄 Creating private room between:", user._id, "and", targetUserId);

                const response = await findOrCreatePrivateRoom(user._id, targetUserId);
                console.log("✅ Room response:", response);

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
                await handleChatSelection(newChat);
            }
            setActiveTab("chats")
        } catch (error: any) {
            console.error("❌ Error starting chat:", error);
            setErrorWithAutoClear(getSendErrorMessage(error));
        }
    }

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
                const transformedMessages = transformMessages(messagesData, user, selectedChat);

                setMessages(transformedMessages);
                console.log("✅ Messages reloaded successfully");
                setTimeout(scrollToBottom, 100);

            } catch (error: any) {
                console.error("❌ Error retrying to load messages:", error);
                setMessageError(getErrorMessage(error));
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
        setClickedMessage(message);
        setShowRoomsList(true);
    };

    const handleCloseRoomsList = () => {
        setShowRoomsList(false);
        setClickedMessage(null);
    };

    // Shared loading component
    const LoadingSpinner = ({ text }: { text: string }) => (
        <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                <p className="text-sm text-gray-500">{text}</p>
            </div>
        </div>
    );

    // Shared empty state component
    const EmptyState = ({ title, subtitle }: { title: string; subtitle: string }) => (
        <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">{title}</p>
                <p className="text-xs text-gray-400">{subtitle}</p>
            </div>
        </div>
    );

    // Error display component
    const ErrorDisplay = () => messageError ? (
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
    ) : null;

    // Upload progress component
    const UploadProgress = () => uploadingFiles ? (
        <div className="mx-4 mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                <p className="text-sm text-blue-600">Đang tải file lên...</p>
            </div>
        </div>
    ) : null;

    // Notification component
    // const NotificationPopup = () => newMessageNotification ? (
    //     <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-right duration-300">
    //         <div className="bg-white border border-blue-200 rounded-lg shadow-lg p-4 max-w-sm">
    //             <div className="flex items-start space-x-3">
    //                 <div className="flex-shrink-0">
    //                     <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
    //                         <MessageCircle className="w-4 h-4 text-white" />
    //                     </div>
    //                 </div>
    //                 <div className="flex-1 min-w-0">
    //                     <p className="text-sm font-medium text-gray-900">Tin nhắn mới</p>
    //                     <p className="text-sm text-gray-600 line-clamp-2">{newMessageNotification}</p>
    //                 </div>
    //                 <button
    //                     onClick={() => setNewMessageNotification(null)}
    //                     className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
    //                 >
    //                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    //                     </svg>
    //                 </button>
    //             </div>
    //         </div>
    //     </div>
    // ) : null;

    // Room list modal component
    const RoomListModal = () => showRoomsList ? (
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
    ) : null;

    return (
        <div className="h-screen mt-14! bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col fixed w-full">
            <HeaderChat
                isFullscreen={isFullscreen}
                setIsFullscreen={setIsFullscreen}
                isRealtimeEnabled={isRealtimeEnabled}
                toggleRealtime={toggleRealtime}
            />

            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar */}
                <div className="w-80 flex-shrink-0 bg-white/60 backdrop-blur-sm border-r border-gray-200/50">
                    <div className="h-full flex flex-col">
                        <HeaderSiderChat setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

                        {loading && isAuthenticated ? (
                            <LoadingSpinner text="Đang tải danh sách chat..." />
                        ) : (
                            <>
                                {isAuthenticated && !loading && (
                                    <>
                                        {conversations.length === 0 ? (
                                            <EmptyState
                                                title="Chưa có cuộc trò chuyện nào"
                                                subtitle="Bắt đầu trò chuyện với ai đó để hiển thị tại đây"
                                            />
                                        ) : filteredConversations.length === 0 && searchTerm ? (
                                            <EmptyState
                                                title="Không tìm thấy cuộc trò chuyện nào"
                                                subtitle="Thử tìm kiếm với từ khóa khác"
                                            />
                                        ) : null}
                                    </>
                                )}

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
                            <AreaHeaderChat
                                getStatusColor={getStatusColor}
                                getRoleBadge={getRoleBadge}
                                getStatusText={getStatusText}
                                selectedChat={selectedChat}
                            />

                            <ErrorDisplay />
                            <UploadProgress />

                            {loadingMessages ? (
                                <LoadingSpinner text="Đang tải tin nhắn..." />
                            ) : (
                                <AreaMesssageChat
                                    messages={messages}
                                    currentUser={currentUser}
                                    selectedChat={selectedChat}
                                    messagesEndRef={messagesEndRef}
                                    rooms={rooms}
                                    onMessageClick={handleMessageClick}
                                    onReplyToMessage={handleReplyToMessage}
                                />
                            )}

                            <AreaMessageInput
                                newMessage={newMessage}
                                setNewMessage={setNewMessage}
                                handleSendMessage={handleSendMessage}
                                replyingTo={replyingTo}
                                onCancelReply={handleCancelReply}
                                isTyping={typingUsers.length > 0}
                                selectedChat={selectedChat}
                                currentUser={currentUser}
                            />
                        </>
                    ) : (
                        <AreaChatReverse />
                    )}
                </div>
            </div>

            <RoomListModal />
        </div>
    )
}
