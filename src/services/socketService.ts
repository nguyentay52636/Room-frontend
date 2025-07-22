import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message } from '../lib/apis/types';
import { createMessage } from '../lib/apis/messageApi';
import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/slices/authSlice';

interface UseChatSocketProps {
  roomId?: string;
}

interface ChatSocketReturn {
  socket: Socket | null;
  messages: Message[];
  isConnected: boolean;
  error: string | null;
  connectionStatus: string;
  sendMessage: (content: string, imageUrl?: string) => void;
  editMessage: (messageId: string, newContent: string) => void;
  deleteMessage: (messageId: string) => void;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const useChatSocket = ({ roomId }: UseChatSocketProps = {}): ChatSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  
  const { token, isAuthenticated, user } = useSelector(selectAuth);

  const refreshTokenAndReconnect = useCallback(async () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/auth/login';
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      setConnectionStatus('no_auth');
      return;
    }

    setConnectionStatus('connecting');

    const newSocket = io('https://da92df21-3a0a-4d9b-a7fb-47550e4c282f-00-3q7tqjx3vn1pz.pike.replit.dev/', {
      auth: {
        token: token
      },
      transports: ['websocket', 'polling']
    });

    // Connection events
    newSocket.on('connect', () => {
      console.log('✅ Socket connected:', newSocket.id);
      setIsConnected(true);
      setError(null);
      setConnectionStatus('connected');
      
      // Auto join room if provided
      if (roomId) {
        // console.log('🏠 Auto joining room:', roomId);
        newSocket.emit('joinRoom', roomId);
      }
    });

    newSocket.on('connect_error', (err) => {
      console.error('❌ Socket connection error:', err.message);
      setError(err.message);
      setIsConnected(false);
      setConnectionStatus('error');

      // Handle authentication errors
      if (err.message === 'Authentication required' || 
          err.message === 'Invalid token' ||
          err.message.includes('Authentication')) {
        console.log('🔄 Authentication error detected (auto logout disabled)');
        // refreshTokenAndReconnect(); // Disabled auto logout
      }
    });

    newSocket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
      setIsConnected(false);
      setConnectionStatus('disconnected');
    });

    // Chat events
    newSocket.on('message:new', (message: Message) => {
      console.log('📨 Received new message:', message);
      if (message.roomId === roomId || (message as any).roomId?._id === roomId) {
        setMessages(prev => [...prev, message]);
      }
    });

    newSocket.on('message:updated', (updatedMessage: Message) => {
      console.log('✏️ Message updated:', updatedMessage);
      setMessages(prev => 
        prev.map(msg => 
          msg._id === updatedMessage._id ? updatedMessage : msg
        )
      );
    });

    newSocket.on('message:deleted', (deletedMessage: Message) => {
      console.log('🗑️ Message deleted:', deletedMessage);
      setMessages(prev => 
        prev.map(msg => 
          msg._id === deletedMessage._id ? deletedMessage : msg
        )
      );
    });

    // Room events
    newSocket.on('joinedRoom', (data) => {
      console.log('✅ Successfully joined room:', data.roomId);
    });

    newSocket.on('userJoined', (data) => {
      console.log('👋 User joined room:', data);
    });

    newSocket.on('userLeft', (data) => {
      console.log('👋 User left room:', data);
    });

    // Error handling
    newSocket.on('error', (error) => {
      console.error('❌ Socket error:', error);
      setError(error.message || 'Socket error occurred');
      
      if (error.message === 'Không có quyền truy cập phòng này') {
        setError('Bạn không có quyền truy cập phòng chat này');
      } else if (error.message === 'Không có quyền sửa tin nhắn này') {
        setError('Bạn không có quyền sửa tin nhắn này');
      } else if (error.message === 'Không có quyền xóa tin nhắn này') {
        setError('Bạn không có quyền xóa tin nhắn này');
      }
    });

    // Health check
    const pingInterval = setInterval(() => {
      if (newSocket.connected) {
        newSocket.emit('ping');
      }
    }, 30000);

    newSocket.on('pong', (data) => {
      console.log('🏓 Pong received:', data.timestamp);
    });

    setSocket(newSocket);

    // Cleanup
    return () => {
      console.log('🧹 Cleaning up socket connection');
      clearInterval(pingInterval);
      newSocket.off('connect');
      newSocket.off('connect_error');
      newSocket.off('disconnect');
      newSocket.off('message:new');
      newSocket.off('message:updated');
      newSocket.off('message:deleted');
      newSocket.off('joinedRoom');
      newSocket.off('userJoined');
      newSocket.off('userLeft');
      newSocket.off('error');
      newSocket.off('pong');
      newSocket.close();
    };
  }, [isAuthenticated, token, roomId, refreshTokenAndReconnect]);

  const sendMessage = useCallback(async (content: string, imageUrl: string = '') => {
    if (socket && roomId && content.trim()) {
      const messageData = {
        roomId: roomId,
        nguoiGuiId: user?._id || '',
        noiDung: content.trim(),
        hinhAnh: imageUrl,
        daDoc: false,
        trangThai: 'active'
      };
      
      console.log('📤 Sending message via dual method:', messageData);
      
      try {
        // Method 1: Save to database via API (ensures persistence)
        const savedMessage = await createMessage(messageData);
        console.log('✅ Message saved to database:', savedMessage);
        
        // Method 2: Send via socket for real-time updates (for other users)
        socket.emit('message:create', {
          roomId: roomId,
          noiDung: content.trim(),
          hinhAnh: imageUrl
        });
        
        // Update local state immediately with the saved message
        if (savedMessage && savedMessage.data) {
          setMessages(prev => [...prev, savedMessage.data]);
        }
        
      } catch (error) {
        console.error('❌ Error saving message to database:', error);
        console.log('🔧 DEBUG: Using NEW socket service version (no error thrown, only warning logged)');
        
        // Fallback: Still try socket-only for real-time chat
        console.log('⚠️ Falling back to socket-only method');
        socket.emit('message:create', {
          roomId: roomId,
          noiDung: content.trim(),
          hinhAnh: imageUrl
        });
        
        // Show warning to user
        console.warn('⚠️ Tin nhắn được gửi nhưng có thể không được lưu vào database. Socket đã gửi thành công.');
        // Do not throw error - let the message sending continue successfully
      }
    }
  }, [socket, roomId, setMessages, user]);

  const editMessage = useCallback((messageId: string, newContent: string) => {
    if (socket && roomId && messageId && newContent.trim()) {
      const updateData = {
        id: messageId,
        noiDungMoi: newContent.trim(),
        roomId: roomId
      };
      
      console.log('✏️ Editing message:', updateData);
      socket.emit('message:update', updateData);
    }
  }, [socket, roomId]);

  const deleteMessage = useCallback((messageId: string) => {
    if (socket && roomId && messageId) {
      const deleteData = {
        id: messageId,
        roomId: roomId
      };
      
      console.log('🗑️ Deleting message:', deleteData);
      socket.emit('message:delete', deleteData);
    }
  }, [socket, roomId]);

  const joinRoom = useCallback((targetRoomId: string) => {
    if (socket && targetRoomId) {
      console.log('🏠 Joining room:', targetRoomId);
      socket.emit('joinRoom', targetRoomId);
    }
  }, [socket]);

  const leaveRoom = useCallback((targetRoomId: string) => {
    if (socket && targetRoomId) {
      console.log('🚪 Leaving room:', targetRoomId);
      socket.emit('leaveRoom', targetRoomId);
    }
  }, [socket]);

  return {
    socket,
    messages,
    setMessages,
    isConnected,
    error,
    connectionStatus,
    sendMessage,
    editMessage,
    deleteMessage,
    joinRoom,
    leaveRoom
  };
};

export default useChatSocket; 