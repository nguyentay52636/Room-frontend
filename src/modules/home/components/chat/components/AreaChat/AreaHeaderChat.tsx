import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import React from 'react'
import { CheckCircle2, MoreVertical, Phone, Video } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AvatarImage } from '@/components/ui/avatar'

export default function AreaHeaderChat({ getStatusColor, getRoleBadge, getStatusText, selectedChat }: { getStatusColor: (value: string) => string, getRoleBadge: (value: string) => React.ReactNode, getStatusText: (value: string) => string, selectedChat: any }) {
    return (
        <div className="flex-shrink-0 p-2 sm:p-4 border-b border-gray-200/50 bg-white/60 backdrop-blur-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                    <div className="relative flex-shrink-0">
                        <Avatar className="h-8 w-8 sm:h-12 sm:w-12 ring-1 sm:ring-2 ring-blue-200 shadow-lg">
                            <AvatarImage
                                src={selectedChat.user?.anhDaiDien || selectedChat.anhDaiDien}
                                alt={selectedChat.user?.ten || selectedChat.ten}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold text-xs sm:text-sm">
                                {(selectedChat.user?.ten || selectedChat.ten).charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        {selectedChat.user && (
                            <div
                                className={`absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 h-2.5 w-2.5 sm:h-4 sm:w-4 rounded-full border-1 sm:border-2 border-white shadow-sm ${getStatusColor(
                                    selectedChat.user.trangThai,
                                )}`}
                            ></div>
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="font-medium sm:font-semibold text-sm sm:text-base text-gray-900 flex items-center gap-1 sm:gap-2 truncate">
                            <span className="truncate">{selectedChat.user?.ten || selectedChat.ten}</span>
                            {selectedChat.user?.isVerified && <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />}
                            {selectedChat.members && (
                                <Badge variant="outline" className="hidden sm:inline-flex text-xs bg-green-50/80 text-green-700 border-green-200 flex-shrink-0">
                                    {selectedChat.members} thành viên
                                </Badge>
                            )}
                        </h3>
                        <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500">
                            {selectedChat.user ? (
                                <>
                                    <span className="truncate">{getStatusText(selectedChat.user.trangThai)}</span>
                                    <span className="hidden sm:inline">•</span>
                                    <div className="hidden sm:flex">
                                        {getRoleBadge(selectedChat.user.vaiTro)}
                                    </div>
                                </>
                            ) : (
                                <span className="truncate">{selectedChat.description}</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                    {/* Desktop buttons */}
                    <Button variant="outline" size="sm" className="hidden sm:flex rounded-xl bg-white/50 backdrop-blur-sm">
                        <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="hidden sm:flex rounded-xl bg-white/50 backdrop-blur-sm">
                        <Video className="w-4 h-4" />
                    </Button>

                    {/* Mobile compact buttons */}
                    <Button variant="outline" size="sm" className="sm:hidden rounded-lg bg-white/50 backdrop-blur-sm h-7 w-7 p-0">
                        <Phone className="w-3 h-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="sm:hidden rounded-lg bg-white/50 backdrop-blur-sm h-7 w-7 p-0">
                        <Video className="w-3 h-3" />
                    </Button>

                    <Button variant="outline" size="sm" className="rounded-lg sm:rounded-xl bg-white/50 backdrop-blur-sm h-7 w-7 sm:h-auto sm:w-auto p-0 sm:px-3">
                        <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
