
import { useState, useRef, useEffect, useCallback, useMemo } from "react"

import { Badge } from "@/components/ui/badge"

import {
    Home,
    Users,
    MessageCircle,
    ArrowLeft,
    Menu as MenuIcon
} from "lucide-react"
import HeaderChat from "./components/HeaderChat"
import HeaderSiderChat from "./components/LeftSiderChat/HeaderSiderChat"
import TabsSiderChat from "./components/LeftSiderChat/TabsSiderChat"
import AreaHeaderChat from "./components/AreaChat/AreaHeaderChat"
import AreaMesssageChat from "./components/AreaChat/AreaMesssageChat"
import AreaMessageInput from "./components/AreaChat/AreaMessageInput"
import AreaChatReverse from "./components/AreaChat/AreaChatReverse"
import { Room } from "@/lib/apis/types"
import { Button } from "@/components/ui/button"

import { useSelector } from "react-redux"
import { selectAuth } from "@/redux/slices/authSlice"
import { getRoomChatByIdUser, findOrCreatePrivateRoom, getRoomById } from "@/lib/apis/roomApi"
import { getMessagesByRoom, createMessage } from "@/lib/apis/messageApi"
import { getUsers } from "@/lib/apis/userApi"
import useChatSocket from "@/services/socketService"

// Import responsive hooks
import { useMobileFirst, useBreakpoint, responsive } from "@/hooks/useResponsive"
import {
    ResponsiveContainer,
    ShowOn,
    HideOn,
    ResponsiveText,
    ResponsiveSpacing
} from "@/components/ResponsiveProvider"
import { Header } from "@/components/Header/Header"

// Constants
const REALTIME_POLL_INTERVAL = 4000
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

    // Enhanced responsive states
    const { isMobile, isTablet, isDesktop, isLargeDesktop } = useMobileFirst()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isSmallScreen = useBreakpoint('md') === false; // < 768px
    const isLargeScreen = useBreakpoint('lg'); // >= 1024px

    // Enhanced chat features states
    const [replyingTo, setReplyingTo] = useState<any>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [typingUsers, setTypingUsers] = useState<string[]>([]);
    const [uploadingFiles, setUploadingFiles] = useState<boolean>(false);

    // WebSocket integration
    const { sendMessage: socketSendMessage } = useChatSocket({ roomId: selectedChat?.id });

    // Enhanced responsive handler
    useEffect(() => {
        const handleResize = () => {
            // Auto-close sidebar on larger screens
            if (isLargeScreen && isSidebarOpen) {
                setIsSidebarOpen(false);
            }

            // Auto-open sidebar on mobile when no chat is selected
            if (isMobile && !selectedChat && !isSidebarOpen) {
                setIsSidebarOpen(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobile, isLargeScreen, isSidebarOpen, selectedChat]);

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

    // Auto-clear error message utility - DISABLED per user request
    const setErrorWithAutoClear = useCallback((error: string, duration = ERROR_CLEAR_DURATION) => {
        // Completely disabled - do nothing
        console.log("🔇 Error message suppressed:", error);
    }, []);

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

    // Memoized currentUser to prevent unnecessary re-renders
    const currentUser = useMemo(() => ({
        id: user?._id || "current-user",
        ten: user?.ten || "Người dùng",
        anhDaiDien: user?.anhDaiDien || "",
        tenDangNhap: user?.tenDangNhap || "",
        trangThai: user?.trangThai || "hoat_dong",
        _id: user?._id || "current-user"
    }), [user?._id, user?.ten, user?.anhDaiDien, user?.tenDangNhap, user?.trangThai])

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

            // Close sidebar on mobile when selecting chat
            if (isMobile) {
                setIsSidebarOpen(false);
            }

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
            // Disable error notification per user request
            // setErrorWithAutoClear(getErrorMessage(error));
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
                console.error("❌ Error uploading file (silently ignored):", file.name, error);
                return ""; // Return empty string instead of throwing
            }
        });

        try {
            const results = await Promise.all(uploadPromises);
            return results.filter(url => url !== ""); // Filter out failed uploads
        } catch (error) {
            console.error("❌ Error in uploadFiles (silently ignored):", error);
            return []; // Return empty array on failure
        }
    };

    const updateMessagesAfterSend = async () => {
        try {
            const updatedRoomResponse = await getRoomById(selectedChat.id);
            const roomData = updatedRoomResponse.data || updatedRoomResponse;
            const transformedMessages = transformMessages(roomData.tinNhan || [], user, selectedChat, roomData);

            setMessages(transformedMessages);
            setLastMessageCount(transformedMessages.length);
            setTimeout(scrollToBottom, 100);
        } catch (error) {
            console.error("❌ Error updating messages after send (silently ignored):", error);
            // Don't throw error - just log it and continue
        }
    }

    const uploadAndSendMessage = useCallback(async (content: string, files: File[]) => {
        try {
            if (!user?._id || !selectedChat?.id) {
                console.warn("⚠️ User not authenticated or no chat selected - silently ignoring");
                return;
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
            console.error("❌ Error in uploadAndSendMessage (silently ignored):", error);
            // Don't throw error - just log it and continue
        }
    }, [user?._id, selectedChat?.id, uploadFiles, updateMessagesAfterSend]);

    // Optimized handleSendMessage with useCallback
    const handleSendMessage = useCallback(async (files?: File[], audioBlob?: Blob) => {
        console.log('🔧 DEBUG: Using NEW version of handleSendMessage (error notifications disabled)');

        if ((!newMessage.trim() && (!files || files.length === 0) && !audioBlob) || !selectedChat?.id || !user?._id) {
            return;
        }

        let messageContent = newMessage.trim();
        let imageUrls: string[] = [];

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
                setNewMessage("");
                setReplyingTo(null);
                return;
            }

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

            // Clear message immediately to improve UX
            setNewMessage("");
            setReplyingTo(null);

            try {
                await socketSendMessage(messageContent, imageUrls.length > 0 ? imageUrls[0] : "");
                console.log("✅ Enhanced message sent via WebSocket");
            } catch (socketError: any) {
                console.warn("⚠️ Socket send warning (ignored):", socketError.message);
                // Completely ignore all socket errors/warnings - don't show anything to user
                // The message sending will continue normally regardless of socket issues
            }

            // Always try to update messages after sending
            await updateMessagesAfterSend();

        } catch (error) {
            console.error("❌ Error sending message:", error);
            // Disable error notification per user request
            // setErrorWithAutoClear("Không thể gửi tin nhắn. Vui lòng thử lại.");
            // Restore message content if there was a real error
            if (!newMessage.trim()) {
                setNewMessage(messageContent || "");
            }
        } finally {
            setUploadingFiles(false);
        }
    }, [newMessage, selectedChat?.id, user?._id, replyingTo, socketSendMessage, uploadFiles, uploadAndSendMessage, updateMessagesAfterSend])

    // Optimized message handlers
    const handleReplyToMessage = useCallback((message: any) => {
        setReplyingTo(message);
        console.log("💬 Replying to message:", message);
    }, []);

    const handleCancelReply = useCallback(() => setReplyingTo(null), []);

    // Optimized setNewMessage to reduce re-renders
    const optimizedSetNewMessage = useCallback((value: string) => {
        setNewMessage(value);
    }, []);

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
            // Disable error notification per user request  
            // setErrorWithAutoClear(getSendErrorMessage(error));
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
                // Disable error notification per user request
                // setMessageError(getErrorMessage(error));
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

    // Back to chat list handler (mobile)
    const handleBackToList = () => {
        setSelectedChat(null);
        if (isMobile) {
            setIsSidebarOpen(true);
        }
    };

    // Enhanced responsive loading component
    const LoadingSpinner = ({ text }: { text: string }) => (
        <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center">
                <div className={`animate-spin rounded-full border-b-2 border-blue-500 mx-auto mb-2 ${isMobile ? 'h-6 w-6' : 'h-8 w-8'
                    }`}></div>
                <ResponsiveText
                    className="text-gray-500"
                    size={{ mobile: 'text-sm', tablet: 'text-base' }}
                >
                    {text}
                </ResponsiveText>
            </div>
        </div>
    );

    // Enhanced responsive empty state component
    const EmptyState = ({ title, subtitle }: { title: string; subtitle: string }) => (
        <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center max-w-sm mx-auto">
                <div className={`mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center ${isMobile ? 'w-12 h-12' : 'w-16 h-16'
                    }`}>
                    <MessageCircle className={`text-gray-400 ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
                </div>
                <ResponsiveText
                    className="text-gray-500 mb-2 font-medium"
                    size={{ mobile: 'text-sm', tablet: 'text-base' }}
                >
                    {title}
                </ResponsiveText>
                <ResponsiveText
                    className="text-gray-400"
                    size={{ mobile: 'text-xs', tablet: 'text-sm' }}
                >
                    {subtitle}
                </ResponsiveText>
            </div>
        </div>
    );

    // Error display component - DISABLED per user request
    const ErrorDisplay = () => null; // Always return null to disable all error displays

    // Enhanced responsive upload progress component
    const UploadProgress = () => uploadingFiles ? (
        <ResponsiveContainer className="mx-4 mt-2" maxWidth="full">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center">
                    <div className={`animate-spin rounded-full border-b-2 border-blue-500 mr-2 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'
                        }`}></div>
                    <ResponsiveText
                        className="text-blue-600"
                        size={{ mobile: 'text-sm', tablet: 'text-base' }}
                    >
                        Đang tải file lên...
                    </ResponsiveText>
                </div>

                {/* Progress bar for mobile */}
                <ShowOn breakpoints={['mobile']}>
                    <div className="mt-2 w-full bg-blue-200 rounded-full h-1">
                        <div className="bg-blue-600 h-1 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                    </div>
                </ShowOn>
            </div>
        </ResponsiveContainer>
    ) : null;


    // Enhanced responsive room list modal component
    const RoomListModal = () => showRoomsList ? (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <ResponsiveContainer
                className="bg-white rounded-lg shadow-xl max-h-[80vh] overflow-hidden"
                maxWidth={isMobile ? 'full' : 'md'}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <ResponsiveText
                        className="font-semibold text-gray-900"
                        size={{ mobile: 'text-lg', tablet: 'text-xl', desktop: 'text-xl' }}
                    >
                        Danh sách phòng chat ({rooms.length})
                    </ResponsiveText>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCloseRoomsList}
                        className="text-gray-400 hover:text-gray-600 transition-colors h-8 w-8 p-0"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Button>
                </div>

                <div className="p-4">
                    {clickedMessage && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                            <ResponsiveText className="text-blue-800" size={{ mobile: 'text-sm', tablet: 'text-base' }}>
                                <span className="font-medium">Tin nhắn được chọn:</span> "{clickedMessage.content}"
                            </ResponsiveText>
                            <ResponsiveText className="text-blue-600 mt-1" size={{ mobile: 'text-xs', tablet: 'text-sm' }}>
                                Từ: {clickedMessage.senderName} - {clickedMessage.timestamp}
                            </ResponsiveText>
                        </div>
                    )}

                    <div className={`space-y-2 overflow-y-auto ${isMobile ? 'max-h-60' : 'max-h-96'}`}>
                        {rooms.length > 0 ? (
                            rooms.map((room: any) => (
                                <div
                                    key={room._id}
                                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                                        {room.tenPhong ? room.tenPhong.charAt(0).toUpperCase() : 'R'}
                                    </div>
                                    <div className="ml-3 flex-1 min-w-0">
                                        <ResponsiveText
                                            className="font-medium text-gray-900 truncate"
                                            size={{ mobile: 'text-sm', tablet: 'text-base' }}
                                        >
                                            {room.tenPhong || `Phòng ${room._id.slice(-6)}`}
                                        </ResponsiveText>
                                        <div className="flex flex-wrap items-center text-gray-500 mt-1 gap-1">
                                            <ResponsiveText size={{ mobile: 'text-xs', tablet: 'text-sm' }}>
                                                ID: {room._id.slice(-6)}
                                            </ResponsiveText>
                                            <span className="hidden sm:inline">•</span>
                                            <ResponsiveText size={{ mobile: 'text-xs', tablet: 'text-sm' }}>
                                                {room.loaiPhong}
                                            </ResponsiveText>
                                            <span className="hidden sm:inline">•</span>
                                            <ResponsiveText size={{ mobile: 'text-xs', tablet: 'text-sm' }}>
                                                {room.thanhVien?.length || 0} thành viên
                                            </ResponsiveText>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 ml-2">
                                        <Button
                                            onClick={() => {
                                                console.log("🎯 Room selected:", room);
                                                handleCloseRoomsList();
                                            }}
                                            size={isMobile ? "sm" : "default"}
                                            className="text-blue-600 hover:text-blue-800 font-medium border border-blue-200 hover:bg-blue-50 transition-colors bg-white"
                                        >
                                            Chọn
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <ResponsiveText className="text-gray-400" size={{ mobile: 'text-sm', tablet: 'text-base' }}>
                                    Không có phòng chat nào
                                </ResponsiveText>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 border-t bg-gray-50">
                    <Button
                        onClick={handleCloseRoomsList}
                        className="w-full bg-gray-600 text-white hover:bg-gray-700 transition-colors"
                        size={isMobile ? "sm" : "default"}
                    >
                        Đóng
                    </Button>

                    <ResponsiveSpacing size={{ mobile: 'h-2', tablet: 'h-1' }} />

                    <ShowOn breakpoints={['mobile']}>
                        <ResponsiveText className="text-center text-gray-500 mt-2" size={{ mobile: 'text-xs' }}>
                            Vuốt xuống để đóng
                        </ResponsiveText>
                    </ShowOn>
                </div>
            </ResponsiveContainer>
        </div>
    ) : null;

    return (
        <ResponsiveContainer className="h-screen pt-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col fixed w-full overflow-hidden" maxWidth="full" padding={false}>
            {/* Responsive Header - Desktop only on large screens, mobile shows conditionally */}
            <ShowOn breakpoints={['desktop', 'large-desktop']}>
                <HeaderChat
                    isFullscreen={isFullscreen}
                    setIsFullscreen={setIsFullscreen}
                    isRealtimeEnabled={isRealtimeEnabled}
                    toggleRealtime={toggleRealtime}
                />
            </ShowOn>

            {/* Mobile Header - Only show when in fullscreen mode on small screens */}
            <HideOn breakpoints={['desktop', 'large-desktop']}>
                {isFullscreen && (
                    <HeaderChat
                        isFullscreen={isFullscreen}
                        setIsFullscreen={setIsFullscreen}
                        isRealtimeEnabled={isRealtimeEnabled}
                        toggleRealtime={toggleRealtime}
                    />
                )}
            </HideOn>

            <div className="flex-1 flex overflow-hidden relative">
                {/* Mobile Overlay for sidebar */}
                <HideOn breakpoints={['tablet', 'desktop', 'large-desktop']}>
                    {isSidebarOpen && (
                        <div
                            className="fixed inset-0 bg-black/50 z-40"
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    )}
                </HideOn>

                {/* Responsive Sidebar */}
                <div className={`
                    ${isMobile
                        ? `fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen || !selectedChat ? 'translate-x-0' : '-translate-x-full'
                        } w-full sm:w-80`
                        : 'w-80 flex-shrink-0 relative'
                    }
                `}
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                        backdropFilter: 'blur(8px)',
                        borderRight: '1px solid rgba(229, 231, 235, 0.5)',
                        display: isMobile && selectedChat && !isSidebarOpen ? 'none' : 'block'
                    }}>
                    <div className="h-full flex flex-col">
                        {/* Mobile header for sidebar */}
                        <HideOn breakpoints={['tablet', 'desktop', 'large-desktop']}>
                            <div className="flex items-center justify-between p-4 border-b border-gray-200/50 bg-white/80">
                                <ResponsiveText
                                    className="font-semibold text-gray-900"
                                    size={{ mobile: 'text-lg', tablet: 'text-xl' }}
                                >
                                    💬 Tin nhắn
                                </ResponsiveText>
                                {selectedChat && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setIsSidebarOpen(false)}
                                        className="h-8 w-8 p-0"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </HideOn>

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

                {/* Responsive Chat Area */}
                <div className={`
                    flex-1 flex flex-col bg-white/40 backdrop-blur-sm
                    ${isMobile && !selectedChat ? 'hidden' : 'flex'}
                `}>
                    {selectedChat ? (
                        <>

                            {/* Enhanced responsive chat header */}
                            <div className="flex items-center bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
                                {/* Mobile back button */}
                                <HideOn breakpoints={['tablet', 'desktop', 'large-desktop']}>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleBackToList}
                                        className="ml-2 h-8 w-8 p-0"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                    </Button>
                                </HideOn>

                                {/* Tablet menu button */}
                                <ShowOn breakpoints={['tablet']}>
                                    {selectedChat && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setIsSidebarOpen(true)}
                                            className="ml-2 h-8 w-8 p-0"
                                        >
                                            <MenuIcon className="h-4 w-4" />
                                        </Button>
                                    )}
                                </ShowOn>

                                <div className="flex-1">
                                    <AreaHeaderChat
                                        getStatusColor={getStatusColor}
                                        getRoleBadge={getRoleBadge}
                                        getStatusText={getStatusText}
                                        selectedChat={selectedChat}
                                    />
                                </div>
                            </div>

                            <ErrorDisplay />
                            <UploadProgress />

                            {/* Responsive spacing */}
                            <ResponsiveSpacing size={{ mobile: 'h-2', tablet: 'h-4', desktop: 'h-4' }} />

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
                                setNewMessage={optimizedSetNewMessage}
                                handleSendMessage={handleSendMessage}
                                replyingTo={replyingTo}
                                onCancelReply={handleCancelReply}
                                isTyping={typingUsers.length > 0}
                                selectedChat={selectedChat}
                                currentUser={currentUser}
                            />
                        </>
                    ) : (
                        <>
                            {/* Mobile-optimized empty state */}
                            <HideOn breakpoints={['tablet', 'desktop', 'large-desktop']}>
                                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mb-4">
                                        <MessageCircle className="w-8 h-8 text-white" />
                                    </div>
                                    <ResponsiveText
                                        className="font-semibold text-gray-900 mb-2"
                                        size={{ mobile: 'text-lg', tablet: 'text-xl' }}
                                    >
                                        Chào mừng đến với Chat
                                    </ResponsiveText>
                                    <ResponsiveText
                                        className="text-gray-500 mb-6 text-center px-4"
                                        size={{ mobile: 'text-sm', tablet: 'text-base' }}
                                    >
                                        Chọn một cuộc trò chuyện để bắt đầu nhắn tin
                                    </ResponsiveText>
                                    <Button
                                        onClick={() => setIsSidebarOpen(true)}
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3"
                                    >
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        Xem danh sách chat
                                    </Button>
                                </div>
                            </HideOn>

                            {/* Desktop empty state */}
                            <ShowOn breakpoints={['tablet', 'desktop', 'large-desktop']}>
                                <AreaChatReverse />
                            </ShowOn>
                        </>
                    )}
                </div>
            </div>

            <RoomListModal />
        </ResponsiveContainer>
    )
}
