import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/redux/slices/authSlice';
import { getRoomChatByIdUser, getRoomById } from '@/lib/apis/roomApi';

interface NotificationContextType {
    newMessageNotification: string | null;
    setNewMessageNotification: (msg: string | null) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [newMessageNotification, setNewMessageNotification] = useState<string | null>(null);
    const { isAuthenticated, user } = useSelector(selectAuth);
    const [lastMessageCounts, setLastMessageCounts] = useState<{ [roomId: string]: number }>({});

    // Global polling for new messages across all rooms
    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        const checkForNewMessages = async () => {
            if (!user?._id || !isAuthenticated) return;

            try {
                const roomsResponse = await getRoomChatByIdUser(user._id);
                const rooms = roomsResponse.data || roomsResponse || [];

                for (const room of rooms) {
                    const roomId = room._id;
                    const currentMessageCount = room.tinNhan?.length || 0;
                    const lastKnownCount = lastMessageCounts[roomId] || 0;

                    if (currentMessageCount > lastKnownCount && lastKnownCount > 0) {
                        // New message detected
                        const latestMessage = room.tinNhan?.[room.tinNhan.length - 1];
                        if (latestMessage) {
                            const senderId = typeof latestMessage.nguoiGuiId === 'object'
                                ? latestMessage.nguoiGuiId._id
                                : latestMessage.nguoiGuiId;

                            // Only show notification if message is from other user
                            if (senderId !== user._id) {
                                const senderName = typeof latestMessage.nguoiGuiId === 'object'
                                    ? latestMessage.nguoiGuiId.ten
                                    : 'Người dùng';

                                setNewMessageNotification(`💬 ${senderName}: ${latestMessage.noiDung}`);

                                // Auto hide after 4 seconds
                                setTimeout(() => setNewMessageNotification(null), 4000);
                            }
                        }
                    }

                    // Update the count for this room
                    setLastMessageCounts(prev => ({
                        ...prev,
                        [roomId]: currentMessageCount
                    }));
                }
            } catch (error) {
                console.warn('⚠️ Global notification check failed:', error);
            }
        };

        if (isAuthenticated && user?._id) {
            // Initial load to set baseline counts
            checkForNewMessages();

            // Poll every 5 seconds for new messages
            intervalId = setInterval(checkForNewMessages, 5000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [user?._id, isAuthenticated, lastMessageCounts]);

    return (
        <NotificationContext.Provider value={{ newMessageNotification, setNewMessageNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error('useNotification must be used within NotificationProvider');
    return context;
};
