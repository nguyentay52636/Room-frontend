import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Building2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function CardProjectDetails({ selectedChat }: { selectedChat: any }) {
  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Building2 className="h-4 w-4 text-green-500" />
            Chi tiết dự án
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl">
              <p className="font-semibold text-base flex items-center gap-2">
                🏢 {selectedChat.propertyName}
              </p>
              <p className="text-gray-500">Mã: {selectedChat.propertyId}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
                <p className="text-gray-500 text-xs">Ngân sách</p>
                <p className="font-semibold text-green-600">💰 {selectedChat.budget}</p>
              </div>
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
                <p className="text-gray-500 text-xs">Timeline</p>
                <p className="font-semibold">📅 {selectedChat.timeline}</p>
              </div>
            </div>

            <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-xl">
              <p className="text-gray-500 mb-2 text-xs">Giai đoạn hiện tại:</p>
              <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200">
                ✨ {selectedChat.projectPhase}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
