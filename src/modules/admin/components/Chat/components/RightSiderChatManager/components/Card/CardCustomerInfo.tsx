import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Users, Star } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export default function CardCustomerInfo({ selectedChat }: { selectedChat: any }) {
    return (
        <>
            <Card className="hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        Thông tin khách hàng
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <Avatar className="h-14 w-14 ring-2 ring-blue-200 shadow-lg">
                            <AvatarImage
                                src={selectedChat.customerAvatar || "/placeholder.svg"}
                                alt={selectedChat.customerName}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold text-lg">
                                {selectedChat.customerName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-lg">{selectedChat.customerName}</p>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500" />
                                Khách hàng VIP
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3 text-sm">
                        <div className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <span className="text-lg">📧</span>
                            <span>{selectedChat.customerEmail}</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <span className="text-lg">📱</span>
                            <span>{selectedChat.customerPhone || "Chưa cập nhật"}</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <span className="text-lg">📍</span>
                            <span>TP. Hồ Chí Minh</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
