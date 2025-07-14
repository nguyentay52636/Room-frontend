import { Card, CardContent } from '@/components/ui/card'
import { Award, MessageSquare } from 'lucide-react'
import { Home } from 'lucide-react'
import React from 'react'

export default function QuickActionsProfileCard() {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Home className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold mb-2">Tìm nhà mới</h3>
                        <p className="text-sm text-gray-600">Khám phá các bất động sản phù hợp</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-semibold mb-2">Tin nhắn</h3>
                        <p className="text-sm text-gray-600">Liên hệ với chủ nhà</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Award className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold mb-2">Ưu đãi</h3>
                        <p className="text-sm text-gray-600">Xem các chương trình khuyến mãi</p>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
