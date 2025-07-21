import { MessageCircle } from "lucide-react";
import { useNotification } from "../contexts/NotificationContext";

const NotificationPopup = () => {
    const { newMessageNotification, setNewMessageNotification } = useNotification();

    if (!newMessageNotification) return null;

    return (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-right duration-300">
            <div className="bg-white border border-blue-200 rounded-lg shadow-lg p-4 max-w-sm">
                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <MessageCircle className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">Tin nhắn mới</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{newMessageNotification}</p>
                    </div>
                    <button
                        onClick={() => setNewMessageNotification(null)}
                        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationPopup;
