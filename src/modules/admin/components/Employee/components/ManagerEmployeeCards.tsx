import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, Users, UserCheck, Calendar, Crown } from 'lucide-react'
export default function ManagerEmployeeCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng nhân viên</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">32</p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% tháng này
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/30 group-hover:scale-110 transition-transform duration-300">
              <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Đang làm việc</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">28</p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                87.5% tổng số
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-green-50 dark:bg-green-900/30 group-hover:scale-110 transition-transform duration-300">
              <UserCheck className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Đang nghỉ phép</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">3</p>
              <p className="text-sm text-yellow-600 flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                9.4% tổng số
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-yellow-50 dark:bg-yellow-900/30 group-hover:scale-110 transition-transform duration-300">
              <Calendar className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Quản lý</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">4</p>
              <p className="text-sm text-purple-600 flex items-center">
                <Crown className="h-3 w-3 mr-1" />
                12.5% tổng số
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-900/30 group-hover:scale-110 transition-transform duration-300">
              <Crown className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
