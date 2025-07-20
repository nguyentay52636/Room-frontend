import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/slices/authSlice';
import useChatSocket from '../../hooks/useChatSocket';

interface AuthenticatedChatProps {
    roomId: string;
    roomName?: string;
}

const AuthenticatedChat: React.FC<AuthenticatedChatProps> = ({
    roomId,
    roomName = 'Chat Room'
}) => {
    const [message, setMessage] = useState('');
    const { user, isAuthenticated } = useSelector(selectAuth);

    const {
        messages,
        isConnected,
        error,
        connectionStatus,
        sendMessage,
        editMessage,
        deleteMessage
    } = useChatSocket({ roomId });

    const handleSendMessage = () => {
        if (message.trim()) {
            sendMessage(message.trim());
            setMessage('');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    🔒 Authentication Required
                </h3>
                <p className="text-yellow-700 mb-4">
                    Bạn cần đăng nhập để sử dụng chat.
                </p>
                <button
                    onClick={() => window.location.href = '/auth/login'}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded transition"
                >
                    Đăng nhập
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold">{roomName}</h2>
                        <p className="text-sm text-blue-200">
                            User: {user?.tenDangNhap} | Room: {roomId}
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'
                            }`}></span>
                        <span className="text-sm">
                            {connectionStatus}
                        </span>
                    </div>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-3">
                    <p className="text-red-700 text-sm">❌ {error}</p>
                </div>
            )}

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20">
                        <div className="text-4xl mb-2">💬</div>
                        <p>Chưa có tin nhắn nào. Bắt đầu cuộc trò chuyện!</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {messages.map((msg, index) => {
                            const isOwn = msg.nguoiGuiId === user?._id || msg.nguoiGuiId === user?.tenDangNhap;

                            return (
                                <div
                                    key={index}
                                    className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isOwn
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white border border-gray-200'
                                        }`}>
                                        {!isOwn && (
                                            <p className="text-xs text-gray-500 mb-1">
                                                {msg.nguoiGuiId}
                                            </p>
                                        )}
                                        <p className="break-words">{msg.noiDung}</p>
                                        {msg.createdAt && (
                                            <p className={`text-xs mt-1 ${isOwn ? 'text-blue-200' : 'text-gray-400'
                                                }`}>
                                                {new Date(msg.createdAt).toLocaleTimeString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Nhập tin nhắn..."
                        disabled={!isConnected}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!message.trim() || !isConnected}
                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition"
                    >
                        Gửi
                    </button>
                </div>

                {!isConnected && (
                    <p className="text-xs text-red-500 mt-2">
                        ⚠️ Disconnected - reconnecting...
                    </p>
                )}
            </div>
        </div>
    );
};

export default AuthenticatedChat; 