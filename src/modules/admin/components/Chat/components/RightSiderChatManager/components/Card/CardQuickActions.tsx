import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import React from 'react'
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Calendar, FileText, Phone, Gift, Zap } from 'lucide-react'

export default function CardQuickActions() {
  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Zap className="h-4 w-4 text-purple-500" />
            Hành động nhanh
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 hover:from-blue-100 hover:to-purple-100 rounded-xl"
          >
            <Calendar className="h-4 w-4 mr-2" />📅 Lên lịch hẹn
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:from-green-100 hover:to-emerald-100 rounded-xl"
          >
            <FileText className="h-4 w-4 mr-2" />📋 Gửi tài liệu
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200 hover:from-orange-100 hover:to-yellow-100 rounded-xl"
          >
            <Phone className="h-4 w-4 mr-2" />📞 Gọi điện
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start bg-gradient-to-r from-pink-50 to-red-50 border-pink-200 hover:from-pink-100 hover:to-red-100 rounded-xl"
          >
            <Gift className="h-4 w-4 mr-2" />🎁 Ưu đãi đặc biệt
          </Button>
        </CardContent>
      </Card>
    </>
  )
}
