import { useEffect, useState, useCallback } from 'react';
import { Message, Room } from '../../../../lib/apis/types';
import { findOrCreatePrivateRoom, getRoomById } from '../../../../lib/apis/roomApi';
import { getMessagesByRoom } from '../../../../lib/apis/messageApi';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../../redux/slices/authSlice';
import useChatSocket from '@/services/socketService';

// Preset user IDs for easy testing
const PRESET_USERS = [
    { id: 'user001', name: 'Alice', color: 'bg-blue-500' },
    { id: 'user002', name: 'Bob', color: 'bg-green-500' },
    { id: 'user003', name: 'Charlie', color: 'bg-purple-500' },
    { id: 'user004', name: 'Diana', color: 'bg-pink-500' },
];

export default function TwoUserChat() {
    const [currentUser, setCurrentUser] = useState('');
    const [targetUser, setTargetUser] = useState('');
    const [input, setInput] = useState('');
    const [targetUserInput, setTargetUserInput] = useState('');
    const [roomId, setRoomId] = useState('');
    const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [isSendingMessage, setIsSendingMessage] = useState(false);


    const { user, isAuthenticated } = useSelector(selectAuth);


    const {

        messages,
        setMessages,
        isConnected: socketConnected,
        error: socketError,
        connectionStatus,
        sendMessage: socketSendMessage,

        leaveRoom
    } = useChatSocket({ roomId });

    // Function to load messages from room
    const loadMessagesFromRoom = useCallback(async () => {
        if (!roomId) return;

        try {
            console.log('🔄 Loading messages for room:', roomId);
            const messagesData = await getMessagesByRoom(roomId);
            console.log('📨 Loaded messages data:', messagesData);

            if (messagesData && Array.isArray(messagesData)) {
                console.log('📨 Setting', messagesData.length, 'messages');
                // Filter out any messages that might already exist to prevent duplicates
                setMessages(prev => {
                    // If we're reloading, replace completely
                    if (prev.length === 0) {
                        return messagesData;
                    }

                    // Otherwise, merge avoiding duplicates
                    const existingIds = new Set(prev.map((msg: Message) => msg._id));
                    const newMessages = messagesData.filter((msg: Message) => !existingIds.has(msg._id));
                    return [...prev, ...newMessages];
                });
            } else {
                console.log('📨 No messages found, setting empty array');
                setMessages([]);
            }
        } catch (error) {
            console.warn('⚠️ Could not load messages from room:', error);
            setMessages([]);
        }
    }, [roomId, setMessages]);

    // Function to load room info with populated messages
    const loadRoomInfo = useCallback(async () => {
        if (!roomId) return;

        try {
            console.log('🔄 Loading room info with messages...');
            const roomData = await getRoomById(roomId);
            console.log('📨 Loaded room data:', roomData);

            if (roomData) {
                setCurrentRoom(roomData);

                // Backend populate tinNhan, so we can use it directly
                if (roomData.tinNhan && Array.isArray(roomData.tinNhan)) {
                    console.log('📨 Setting messages from room.tinNhan:', roomData.tinNhan.length, 'messages');
                    // Only replace messages if this is initial load or we have fewer messages locally
                    setMessages(prev => {
                        if (prev.length === 0 || roomData.tinNhan.length > prev.length) {
                            return roomData.tinNhan;
                        }

                        // Otherwise merge avoiding duplicates
                        const existingIds = new Set(prev.map((msg: Message) => msg._id));
                        const newMessages = roomData.tinNhan.filter((msg: Message) => !existingIds.has(msg._id));
                        return [...prev, ...newMessages];
                    });
                } else {
                    console.log('📨 Room tinNhan empty, loading via messages API');
                    loadMessagesFromRoom();
                }
            }
        } catch (error) {
            console.warn('⚠️ Could not load room info:', error);
            loadMessagesFromRoom();
        }
    }, [roomId, loadMessagesFromRoom, setMessages]);

    // Real-time message polling (as backup to socket)
    useEffect(() => {
        if (!isConnected || !roomId) return;

        loadRoomInfo();

        const pollInterval = setInterval(() => {
            if (!socketConnected) {
                console.log('⏰ Socket disconnected, polling room data...');
                loadRoomInfo();
            }
        }, 5000);

        return () => {
            clearInterval(pollInterval);
        };
    }, [isConnected, loadRoomInfo, socketConnected]);

    const startChat = async () => {
        if (!isAuthenticated) {
            alert('Vui lòng đăng nhập trước khi sử dụng chat!');
            return;
        }

        if (targetUserInput.trim() === '') return;

        setIsLoading(true);


        const authenticatedUserId = user?._id || '';
        console.log('🚀 Starting chat between:', authenticatedUserId, 'and', targetUserInput.trim());
        console.log('🔑 Authenticated user full info:', user);

        setCurrentUser(authenticatedUserId);
        setTargetUser(targetUserInput.trim());
        setIsConnected(true);

        try {
            console.log('📤 Finding or creating private room...');
            const roomResponse = await findOrCreatePrivateRoom(authenticatedUserId, targetUserInput.trim());
            console.log('✅ Room response:', roomResponse);

            const room = roomResponse.room;
            const isNewRoom = roomResponse.isNewRoom;

            if (room) {
                console.log(`${isNewRoom ? '🆕 Created new room:' : '📁 Found existing room:'} ${room._id}`);
                setCurrentRoom(room);
                setRoomId(room._id);

                if (room.tinNhan && Array.isArray(room.tinNhan) && room.tinNhan.length > 0) {
                    console.log('📨 Setting initial messages:', room.tinNhan.length, 'messages');
                    setMessages(room.tinNhan);
                } else {
                    console.log('📨 No initial messages');
                    setMessages([]);
                }

                console.log('🏠 Room ID set, socket will auto join');
            }

        } catch (error) {
            console.error('❌ Error finding/creating private room:', error);
            alert('Lỗi tạo phòng chat. Vui lòng thử lại!');
        } finally {
            setIsLoading(false);
        }
    }

    const sendMessage = async () => {
        if (input.trim() === '' || !roomId) {
            console.log('❌ Cannot send message: empty input or no room');
            return;
        }

        const messageContent = input.trim();
        console.log('📤 Sending message:', messageContent);

        setIsSendingMessage(true);

        // Clear input immediately for better UX (optimistic UI)
        setInput('');

        try {
            // Send message through socket hook (which handles both API and socket)
            await socketSendMessage(messageContent);
            console.log('✅ Message sent and saved successfully');

        } catch (error: any) {
            console.error('❌ Error sending message:', error);
            // Restore input if failed
            setInput(messageContent);

            // Handle authentication errors silently - redirect if needed
            if (error.message.includes('Phiên đăng nhập')) {
                setTimeout(() => {
                    window.location.href = '/auth/login';
                }, 1000);
            }
        } finally {
            setIsSendingMessage(false);
        }
    }

    // Helper function to get user color
    const getUserColor = (userId: string) => {
        const presetUser = PRESET_USERS.find(u => u.id === userId);
        return presetUser ? presetUser.color : 'bg-gray-500';
    };

    // Helper function to get user name - now handles real user IDs too
    const getUserName = (userId: string) => {
        // First check if it's current user
        if (userId === user?._id) {
            return user?.tenDangNhap || user?.ten || 'Bạn';
        }

        // Then check preset users
        const presetUser = PRESET_USERS.find(u => u.id === userId);
        if (presetUser) {
            return `${presetUser.name} (${userId})`;
        }

        // Return the ID if not found
        return userId || 'Unknown';
    };

    // Authentication check
    if (!isAuthenticated) {
        return (
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-8 text-red-600">
                    🔒 Yêu cầu đăng nhập
                </h1>
                <div className="text-center">
                    <p className="text-gray-600 mb-4">
                        Bạn cần đăng nhập để sử dụng tính năng chat.
                    </p>
                    <button
                        onClick={() => window.location.href = '/auth/login'}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition duration-200"
                    >
                        Đăng nhập ngay
                    </button>
                </div>
            </div>
        );
    }

    if (!isConnected) {
        return (
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    🚀 Chat Trực Tiếp Giữa 2 User
                </h1>

                {/* Authentication Status */}
                <div className="mb-6 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Đã đăng nhập: {user?.tenDangNhap || user?.ten} (ID: {user?._id})
                    </span>
                </div>

                {/* Connection Status */}
                <div className="mb-6 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${connectionStatus === 'connected' ? 'bg-green-100 text-green-800' :
                        connectionStatus === 'connecting' ? 'bg-yellow-100 text-yellow-800' :
                            connectionStatus === 'error' ? 'bg-red-100 text-red-800' :
                                connectionStatus === 'no_auth' ? 'bg-red-100 text-red-800' :
                                    'bg-gray-100 text-gray-800'
                        }`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${connectionStatus === 'connected' ? 'bg-green-500' :
                            connectionStatus === 'connecting' ? 'bg-yellow-500' :
                                connectionStatus === 'error' ? 'bg-red-500' :
                                    connectionStatus === 'no_auth' ? 'bg-red-500' :
                                        'bg-gray-500'
                            }`}></span>
                        Socket: {connectionStatus}
                        {socketError && (
                            <span className="ml-2 text-xs">({socketError})</span>
                        )}
                    </span>
                </div>

                {/* Preset Users for Quick Testing */}
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">👥 User Preset (Dành cho Test)</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {PRESET_USERS.map((presetUser) => (
                            <div
                                key={presetUser.id}
                                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${presetUser.color} text-white hover:scale-105`}
                                onClick={() => {
                                    if (presetUser.id !== user?._id) {
                                        setTargetUserInput(presetUser.id);
                                    }
                                }}
                            >
                                <div className="text-sm font-medium">{presetUser.name}</div>
                                <div className="text-xs opacity-80">{presetUser.id}</div>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">💡 Click để chọn người muốn chat</p>
                </div>

                <div className="grid md:grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            👤 ID người muốn chat
                        </label>
                        <input
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập ID người muốn chat hoặc chọn preset user"
                            value={targetUserInput}
                            onChange={(e) => setTargetUserInput(e.target.value)}
                        />
                        <div className="text-xs text-gray-500 mt-1">
                            Hiển thị: {targetUserInput ? getUserName(targetUserInput) : 'Chưa chọn'}
                        </div>
                        <div className="text-xs text-blue-600 mt-1">
                            💡 Bạn có thể nhập ID thật của user khác hoặc dùng preset: user001, user002, user003, user004
                        </div>
                    </div>
                </div>

                <button
                    onClick={startChat}
                    disabled={isLoading || !targetUserInput.trim() || connectionStatus !== 'connected'}
                    className="w-full mt-6 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-md transition duration-200 flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Đang kết nối...
                        </>
                    ) : (
                        '🚀 Bắt đầu Chat'
                    )}
                </button>

                {connectionStatus !== 'connected' && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                            ⚠️ Đang kết nối socket... Vui lòng chờ kết nối thành công trước khi bắt đầu chat.
                        </p>
                    </div>
                )}


            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">
                            💬 Chat: {user?.tenDangNhap || user?.ten} ↔ {getUserName(targetUser)}
                        </h2>
                        {currentRoom ? (
                            <div className="text-sm text-blue-100 mt-1">
                                <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">
                                    Room: {currentRoom._id}
                                </span>
                                <span className="ml-2">📨 {messages.length} tin nhắn</span>
                                <span className={`ml-2 ${socketConnected ? 'text-green-200' : 'text-red-200'}`}>
                                    {socketConnected ? '🟢 Socket Connected' : '🔴 Socket Disconnected'}
                                </span>
                                <span className="ml-2">🔐 User ID: {user?._id}</span>
                            </div>
                        ) : (
                            <p className="text-sm text-blue-200">
                                Room: {roomId} (Fallback mode)
                            </p>
                        )}
                    </div>
                    <button
                        onClick={() => {
                            if (currentRoom?._id || roomId) {
                                leaveRoom(currentRoom?._id || roomId);
                            }
                            setIsConnected(false);
                            setMessages([]);
                            setCurrentUser('');
                            setTargetUser('');
                            setCurrentRoom(null);
                            setRoomId('');
                        }}
                        className="text-blue-200 hover:text-white bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded transition"
                    >
                        ← Quay lại
                    </button>
                </div>
            </div>

            {/* Error Display */}
            {socketError && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <div className="flex">
                        <div className="ml-3">
                            <p className="text-sm text-red-700">
                                ⚠️ Lỗi socket: {socketError}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 bg-gray-50 space-y-3">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20">
                        <div className="text-6xl mb-4">💬</div>
                        <div className="text-lg font-medium">Chưa có tin nhắn nào</div>
                        <div className="text-sm">Hãy gửi tin nhắn đầu tiên để bắt đầu cuộc trò chuyện!</div>
                    </div>
                ) : (
                    messages.map((msg, idx) => {
                        // Handle case where nguoiGuiId might be an object with populated user data
                        const nguoiGuiId: any = msg.nguoiGuiId;
                        const senderId = typeof nguoiGuiId === 'string' ? nguoiGuiId : (nguoiGuiId?._id || '');

                        // Enhanced debug logging
                        console.log('🔍 Message debug:', {
                            index: idx,
                            senderId,
                            currentUserId: user?._id,
                            currentUserFromState: currentUser,
                            nguoiGuiId: nguoiGuiId,
                            msgContent: msg.noiDung,
                            msgCreatedAt: msg.createdAt,
                            msgObject: msg
                        });

                        // More robust isCurrentUser check
                        const isCurrentUser = senderId === user?._id ||
                            senderId === currentUser ||
                            (typeof nguoiGuiId === 'object' && nguoiGuiId?._id === user?._id);

                        const userColor = getUserColor(senderId);

                        console.log('👤 User check result:', {
                            senderId,
                            currentUserId: user?._id,
                            currentUserFromState: currentUser,
                            isCurrentUser,
                            userColor,
                            messageContent: msg.noiDung,
                            messageAlignment: isCurrentUser ? 'RIGHT (MY MESSAGE)' : 'LEFT (OTHER MESSAGE)',
                            messageStatus: msg.trangThai
                        });

                        // Add visual indicator for debugging and message status
                        const debugBorder = isCurrentUser ? 'border-l-4 border-blue-500' : 'border-l-4 border-green-500';
                        const isPending = msg.trangThai === 'pending' || msg._id?.startsWith('temp_');
                        const isTemporary = msg._id?.startsWith('temp_');

                        return (
                            <div key={`${msg._id || idx}`} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4 ${debugBorder} ${isPending ? 'opacity-75' : ''}`}>
                                {/* Avatar for other user (left side) */}
                                {!isCurrentUser && (
                                    <div className={`w-8 h-8 rounded-full ${userColor} flex items-center justify-center text-white text-xs font-medium mr-3 flex-shrink-0`}>
                                        {typeof nguoiGuiId === 'string'
                                            ? getUserName(nguoiGuiId).charAt(0).toUpperCase()
                                            : (nguoiGuiId?.ten?.charAt(0) || nguoiGuiId?.tenDangNhap?.charAt(0) || senderId.charAt(0)).toUpperCase()
                                        }
                                    </div>
                                )}

                                <div className={`max-w-xs lg:max-w-md ${isCurrentUser ? 'order-2' : 'order-1'}`}>
                                    {/* User name with debug info */}
                                    <div className={`text-xs text-gray-500 mb-1 ${isCurrentUser ? 'text-right' : 'text-left'}`}>
                                        <span className={`inline-block px-2 py-1 rounded text-white text-xs ${userColor}`}>
                                            {typeof nguoiGuiId === 'string'
                                                ? getUserName(nguoiGuiId)
                                                : (nguoiGuiId?.ten || nguoiGuiId?.tenDangNhap || getUserName(senderId))
                                            }
                                        </span>
                                        <span className="ml-1 text-xs text-gray-400">
                                            (ID: {senderId.substring(0, 8)}...)
                                        </span>
                                        {/* Message Status Indicator */}

                                    </div>

                                    {/* Message bubble */}
                                    <div className={`px-4 py-2 rounded-lg shadow relative ${isCurrentUser
                                        ? `bg-blue-500 text-white rounded-br-sm ${isPending ? 'bg-opacity-70' : ''}`
                                        : `bg-white border border-gray-200 text-gray-800 rounded-bl-sm ${isPending ? 'bg-opacity-70' : ''}`
                                        }`}>
                                        <div className="break-words">{msg.noiDung}</div>

                                        {/* Message timestamp and status */}
                                        <div className={`text-xs mt-1 flex items-center justify-between ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                                            }`}>
                                            <span>
                                                {msg.createdAt &&
                                                    new Date(msg.createdAt).toLocaleTimeString('vi-VN', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })
                                                }
                                            </span>


                                        </div>



                                    </div>
                                </div>

                                {/* Avatar for current user (right side) */}
                                {isCurrentUser && (
                                    <div className={`w-8 h-8 rounded-full ${getUserColor(user?._id || currentUser)} flex items-center justify-center text-white text-xs font-medium ml-3 flex-shrink-0`}>
                                        {(user?.tenDangNhap || user?.ten || currentUser).charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-full ${getUserColor(user?._id || currentUser)} flex items-center justify-center text-white font-medium`}>
                        {(user?.tenDangNhap || user?.ten || currentUser).charAt(0).toUpperCase()}
                    </div>
                    <input
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        placeholder={isSendingMessage ? "Đang gửi..." : "Nhập tin nhắn..."}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !isSendingMessage && sendMessage()}
                        disabled={!socketConnected || isSendingMessage}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim() || !socketConnected || isSendingMessage}
                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition duration-200 font-medium flex items-center"
                    >
                        {isSendingMessage ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Đang gửi...
                            </>
                        ) : (
                            'Gửi'
                        )}
                    </button>
                </div>

                {/* Connection Status */}
                <div className="mt-2 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-4">
                        <span className={`flex items-center ${socketConnected ? 'text-green-600' : 'text-red-600'}`}>
                            <span className={`w-2 h-2 rounded-full mr-1 ${socketConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            {socketConnected ? 'Kết nối ổn định' : 'Mất kết nối'}
                        </span>

                        {messages.length > 0 && (
                            <span className="text-gray-500">
                                📨 {messages.length} tin nhắn
                            </span>
                        )}
                    </div>

                    {isSendingMessage && (
                        <span className="text-blue-600 flex items-center">
                            <span className="animate-pulse mr-1">💾</span>
                            Đang lưu tin nhắn...
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}