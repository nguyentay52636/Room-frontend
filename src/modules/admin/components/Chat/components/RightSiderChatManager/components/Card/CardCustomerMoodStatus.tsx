import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Heart } from 'lucide-react'

export default function CardCustomerMoodStatus({ selectedChat }: { selectedChat: any }) {
  return (
    <>
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Heart className="h-4 w-4 text-pink-500" />
            Trạng thái khách hàng
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-center">

            <p className="font-medium capitalize text-gray-700 dark:text-gray-300">
              {selectedChat.mood === "excited"
                ? "Rất hứng thú"
                : selectedChat.mood === "satisfied"
                  ? "Hài lòng"
                  : selectedChat.mood === "concerned"
                    ? "Quan tâm"
                    : "Đang tìm hiểu"}
            </p>
            <p className="text-sm text-gray-500">{selectedChat.lastSeen}</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
