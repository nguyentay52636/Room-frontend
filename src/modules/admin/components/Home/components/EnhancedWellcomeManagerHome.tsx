import { Input } from '@/components/ui/input'
import { Activity, Search } from 'lucide-react'
import React from 'react'

export default function EnhancedWellcomeManagerHome() {
  return (
    <div className="mb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
              Xin chào, Admin
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Chào mừng đến với bảng điều khiển quản trị NewLife • {currentTime.toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>

        {/* Quick Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Tìm kiếm nhanh..." className="pl-10 w-64 border-gray-200 dark:border-gray-700" />
        </div>
      </div>
    </div>
  )
}
