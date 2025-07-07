import { Sparkles } from 'lucide-react'
import React from 'react'

export default function Loader() {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-950 min-h-screen">
        <div className="flex items-center justify-center h-96">
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-blue-600 animate-pulse" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Đang tải đánh giá khách hàng...
              </h3>
              <p className="text-gray-500 text-sm">Vui lòng chờ trong giây lát</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
