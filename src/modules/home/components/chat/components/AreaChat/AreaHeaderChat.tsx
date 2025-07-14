import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import React from 'react'
import { CheckCircle2, MoreVertical, Phone, Video } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AvatarImage } from '@/components/ui/avatar'
export default function AreaHeaderChat({ getStatusColor, getRoleBadge, getStatusText, selectedChat }: { getStatusColor: (value: string) => string, getRoleBadge: (value: string) => React.ReactNode, getStatusText: (value: string) => string, selectedChat: any }) {
    return (
        <div className="flex-shrink-0 p-4 border-b border-gray-200/50 bg-white/60 backdrop-blur-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Avatar className="h-12 w-12 ring-2 ring-blue-200 shadow-lg">
                            <AvatarImage
                                src={selectedChat.user?.anhDaiDien || selectedChat.anhDaiDien}
                                alt={selectedChat.user?.ten || selectedChat.ten}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold">
                                {(selectedChat.user?.ten || selectedChat.ten).charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        {selectedChat.user && (
                            <div
                                className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white shadow-sm ${getStatusColor(
                                    selectedChat.user.trangThai,
                                )}`}
                            ></div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            {selectedChat.user?.ten || selectedChat.ten}
                            {selectedChat.user?.isVerified && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                            {selectedChat.members && (
                                <Badge variant="outline" className="text-xs bg-green-50/80 text-green-700 border-green-200">
                                    {selectedChat.members} thành viên
                                </Badge>
                            )}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                            {selectedChat.user ? (
                                <>
                                    <span>{getStatusText(selectedChat.user.trangThai)}</span>
                                    <span>•</span>
                                    {getRoleBadge(selectedChat.user.vaiTro)}
                                </>
                            ) : (
                                <span>{selectedChat.description}</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="rounded-xl bg-white/50 backdrop-blur-sm">
                        <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-xl bg-white/50 backdrop-blur-sm">
                        <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-xl bg-white/50 backdrop-blur-sm">
                        <MoreVertical className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
