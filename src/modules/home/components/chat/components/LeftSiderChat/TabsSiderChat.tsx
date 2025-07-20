import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import React, { useState } from 'react'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CheckCircle2, Pin, Star, MapPin, MessageCircle, Users, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function TabsSiderChat({ getStatusColor, getRoleBadge, getStatusText, activeTab, setActiveTab, filteredConversations, filteredUsers, groupChats, selectedChat, setSelectedChat, handleStartChat }: { getStatusColor: (value: string) => string, getRoleBadge: (value: string) => React.ReactNode, getStatusText: (value: string) => string, activeTab: string, setActiveTab: (value: string) => void, filteredConversations: any[], filteredUsers: any[], groupChats: any[], selectedChat: any, setSelectedChat: (value: any) => void, handleStartChat: (value: any) => void }) {
    const [loadingChatId, setLoadingChatId] = useState<string | null>(null);

    const handleChatClick = async (conv: any) => {
        try {
            setLoadingChatId(conv.id);
            console.log("🖱️ Chat item clicked:", conv);
            console.log("📝 Room ID:", conv.id);
            console.log("🏠 Room data:", conv.roomData);

            // Call the enhanced chat selection handler
            await setSelectedChat(conv);

        } catch (error) {
            console.error("❌ Error handling chat click:", error);
        } finally {
            setLoadingChatId(null);
        }
    };

    const handleGroupClick = async (group: any) => {
        try {
            setLoadingChatId(group.id);
            console.log("🖱️ Group item clicked:", group);
            console.log("📝 Room ID:", group.id);

            // Call the enhanced chat selection handler
            await setSelectedChat(group);

        } catch (error) {
            console.error("❌ Error handling group click:", error);
        } finally {
            setLoadingChatId(null);
        }
    };

    return (
        <div className="flex-1 flex flex-col p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-3 mb-4 bg-white/50 backdrop-blur-sm">
                    <TabsTrigger value="chats" className="text-xs">
                        Trò chuyện
                        {filteredConversations.length > 0 && (
                            <Badge className="ml-1 h-4 w-4 p-0 text-xs bg-blue-500 text-white">
                                {filteredConversations.length}
                            </Badge>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="users" className="text-xs">
                        Người dùng
                        {filteredUsers.length > 0 && (
                            <Badge className="ml-1 h-4 w-4 p-0 text-xs bg-green-500 text-white">
                                {filteredUsers.length}
                            </Badge>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="groups" className="text-xs">
                        Nhóm
                        {groupChats.length > 0 && (
                            <Badge className="ml-1 h-4 w-4 p-0 text-xs bg-purple-500 text-white">
                                {groupChats.length}
                            </Badge>
                        )}
                    </TabsTrigger>
                </TabsList>

                {/* Chat List */}
                <TabsContent value="chats" className="flex-1">
                    <ScrollArea className="h-full">
                        <div className="space-y-2">
                            {filteredConversations.length > 0 ? (
                                filteredConversations.map((conv) => (
                                    <div
                                        key={conv.id}
                                        onClick={() => handleChatClick(conv)}
                                        className={`p-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] relative ${selectedChat?.id === conv.id
                                            ? "bg-gradient-to-r from-blue-100/80 to-purple-100/80 shadow-md border-2 border-blue-200 backdrop-blur-sm"
                                            : "bg-white/50 hover:bg-gradient-to-r hover:from-gray-50/80 hover:to-blue-50/80 hover:shadow-sm backdrop-blur-sm"
                                            } ${loadingChatId === conv.id ? 'opacity-70' : ''}`}
                                    >
                                        {/* Loading overlay */}
                                        {loadingChatId === conv.id && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-xl">
                                                <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                                            </div>
                                        )}

                                        <div className="flex items-start space-x-3">
                                            <div className="relative">
                                                <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                                                    <AvatarImage src={conv.user.anhDaiDien || "/placeholder.svg"} alt={conv.user.ten} />
                                                    <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold text-sm">
                                                        {conv.user.ten.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div
                                                    className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(
                                                        conv.user.trangThai,
                                                    )}`}
                                                ></div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h4 className="font-semibold text-sm text-gray-900 truncate flex items-center gap-1">
                                                        {conv.user.ten}
                                                        {conv.user.isVerified && <CheckCircle2 className="w-3 h-3 text-blue-500" />}
                                                        {conv.isPinned && <Pin className="w-3 h-3 text-yellow-500" />}
                                                    </h4>
                                                    <span className="text-xs text-gray-500">{conv.lastMessageTime}</span>
                                                </div>
                                                <div className="flex items-center justify-between mb-1">
                                                    {getRoleBadge(conv.user.vaiTro)}
                                                </div>
                                                <p className="text-xs text-gray-600 line-clamp-2 mb-1">{conv.lastMessage}</p>
                                                <div className="flex items-center justify-between">
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs bg-gray-50/80 text-gray-600 border-gray-200"
                                                    >
                                                        {conv.topic}
                                                    </Badge>
                                                    {conv.unreadCount > 0 && (
                                                        <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-0">
                                                            {conv.unreadCount}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <MessageCircle className="w-12 h-12 text-gray-300 mb-3" />
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Chưa có cuộc trò chuyện</h3>
                                    <p className="text-xs text-gray-400">Bắt đầu trò chuyện với ai đó để hiển thị tại đây</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </TabsContent>

                {/* Users List */}
                <TabsContent value="users" className="flex-1">
                    <ScrollArea className="h-full">
                        <div className="space-y-3">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        className="p-3 bg-white/50 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-100/50 backdrop-blur-sm"
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div className="relative">
                                                <Avatar className="h-12 w-12 ring-2 ring-white shadow-sm">
                                                    <AvatarImage src={user.anhDaiDien || "/placeholder.svg"} alt={user.ten} />
                                                    <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold">
                                                        {user.ten.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div
                                                    className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${getStatusColor(
                                                        user.trangThai,
                                                    )}`}
                                                ></div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h4 className="font-semibold text-sm text-gray-900 flex items-center gap-1">
                                                        {user.ten}
                                                        {user.isVerified && <CheckCircle2 className="w-3 h-3 text-blue-500" />}
                                                    </h4>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                        <span className="text-xs text-gray-600">{user.soSao}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    {getRoleBadge(user.vaiTro)}
                                                    <span className="text-xs text-gray-500">{getStatusText(user.trangThai)}</span>
                                                </div>
                                                <p className="text-xs text-gray-600 line-clamp-2 mb-2">{user.gioiThieu}</p>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {user.diaChi}
                                                    </p>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleStartChat(user)}
                                                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-xs px-3 py-1 h-7 rounded-lg"
                                                    >
                                                        <MessageCircle className="w-3 h-3 mr-1" />
                                                        Chat
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <Users className="w-12 h-12 text-gray-300 mb-3" />
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Không có người dùng nào</h3>
                                    <p className="text-xs text-gray-400">Danh sách người dùng sẽ hiển thị ở đây</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </TabsContent>

                {/* Groups List */}
                <TabsContent value="groups" className="flex-1">
                    <ScrollArea className="h-full">
                        <div className="space-y-3">
                            {groupChats.map((group) => (
                                <div
                                    key={group.id}
                                    onClick={() => handleGroupClick(group)}
                                    className={`p-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] relative ${selectedChat?.id === group.id
                                        ? "bg-gradient-to-r from-green-100/80 to-emerald-100/80 shadow-md border-2 border-green-200 backdrop-blur-sm"
                                        : "bg-white/50 hover:bg-gradient-to-r hover:from-gray-50/80 hover:to-green-50/80 hover:shadow-sm backdrop-blur-sm"
                                        } ${loadingChatId === group.id ? 'opacity-70' : ''}`}
                                >
                                    {/* Loading overlay */}
                                    {loadingChatId === group.id && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-xl">
                                            <Loader2 className="w-4 h-4 animate-spin text-green-500" />
                                        </div>
                                    )}

                                    <div className="flex items-start space-x-3">
                                        <div className="relative">
                                            <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                                                <AvatarImage src={group.anhDaiDien || "/placeholder.svg"} alt={group.ten} />
                                                <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-500 text-white font-semibold text-sm">
                                                    {group.ten.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                                                {group.members > 99 ? "99+" : group.members}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="font-semibold text-sm text-gray-900 truncate flex items-center gap-1">
                                                    {group.ten}
                                                    {group.isPinned && <Pin className="w-3 h-3 text-yellow-500" />}
                                                </h4>
                                                <span className="text-xs text-gray-500">{group.lastMessageTime}</span>
                                            </div>
                                            <p className="text-xs text-gray-600 mb-1">{group.description}</p>
                                            <p className="text-xs text-gray-600 line-clamp-1 mb-2">{group.lastMessage}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs bg-green-50/80 text-green-700 border-green-200"
                                                    >
                                                        <Users className="w-3 h-3 mr-1" />
                                                        {group.members} thành viên
                                                    </Badge>
                                                </div>
                                                {group.unreadCount > 0 && (
                                                    <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-0">
                                                        {group.unreadCount}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </div>
    )
}
