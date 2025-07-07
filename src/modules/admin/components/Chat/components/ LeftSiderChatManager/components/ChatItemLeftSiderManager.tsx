import { AvatarFallback } from '@/components/ui/avatar'
import { AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Pin, Star, Building2 } from 'lucide-react'

export default function ChatItemLeftSiderManager({ getStatusColor, chat, handleChatSelect, activeChat }: { getStatusColor: (status: string) => string, chat: any, handleChatSelect: (chat: any) => void, activeChat: any }) {
  return (
    <div
      key={chat.id}
      onClick={() => handleChatSelect(chat)}
      className={`p-4 rounded-2xl mb-3 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${activeChat === chat.id
        ? "bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 shadow-lg border-2 border-blue-200 dark:border-blue-800"
        : "bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 dark:hover:from-gray-700 dark:hover:to-blue-900 hover:shadow-md"
        }`}
    >
      <div className="flex items-start space-x-3">
        <div className="relative">
          <Avatar className="h-12 w-12 ring-2 ring-white shadow-md">
            <AvatarImage src={chat.customerAvatar || "/placeholder.svg"} alt={chat.customerName} />
            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold">
              {chat.customerName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div
            className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white shadow-sm ${chat.isOnline ? "bg-gradient-to-r from-emerald-400 to-emerald-500" : "bg-gray-400"
              }`}
          >
            {chat.isOnline && (
              <div className="absolute inset-0 rounded-full animate-ping bg-emerald-400"></div>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 truncate flex items-center gap-1">
                {chat.customerName}

              </h4>
              {chat.isPinned && <Pin className="h-3 w-3 text-blue-500" />}
              {chat.isStarred && <Star className="h-3 w-3 text-yellow-500 fill-current" />}
            </div>
            <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              {chat.lastMessageTime}
            </span>
          </div>

          <div className="flex items-center space-x-2 mb-2">
            <Badge
              variant="outline"
              className="text-xs px-2 py-0 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
            >
              ✨ {chat.projectPhase}
            </Badge>
            <div className={`w-2 h-2 rounded-full ${getStatusColor(chat.status)} shadow-sm`}></div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2 leading-relaxed">
            {chat.lastMessage}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building2 className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-500 truncate">{chat.propertyName}</span>
            </div>
            <div className="flex items-center space-x-2">
              {chat.unreadCount > 0 && (
                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-0 animate-pulse">
                  {chat.unreadCount}
                </Badge>
              )}
              <span className="text-xs text-gray-400">{chat.lastSeen}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
