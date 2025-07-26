import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, Users, UserCheck, Calendar, Crown } from 'lucide-react'
import { Employee } from '@/lib/apis/types'

interface ManagerEmployeeCardsProps {
  employees: Employee[]
}

export default function ManagerEmployeeCards({ employees }: ManagerEmployeeCardsProps) {
  const totalEmployees = employees.length
  const activeEmployees = employees.filter(emp => {
    const status = emp.trangThai?.toLowerCase() || ''
    return status === 'dang_hoat_dong' ||
      status === 'active' ||
      status === 'hoạt động' ||
      status === 'đang hoạt động'
  }).length

  // Filter employees on leave
  const onLeaveEmployees = employees.filter(emp => {
    const status = emp.trangThai?.toLowerCase() || ''
    return status === 'nghi_phep' ||
      status === 'onleave' ||
      status === 'nghỉ phép' ||
      status === 'đang nghỉ phép'
  }).length

  // Filter manager employees
  const managerEmployees = employees.filter(emp => {
    const position = emp.chucVu?.toLowerCase() || ''
    return position === 'quan ly' ||
      position === 'manager' ||
      position === 'admin' ||
      position === 'quan_tri_vien' ||
      position === 'quản lý' ||
      position === 'quản trị viên'
  }).length

  // Calculate percentages with proper handling for zero division
  const activePercentage = totalEmployees > 0 ? ((activeEmployees / totalEmployees) * 100).toFixed(1) : '0'
  const onLeavePercentage = totalEmployees > 0 ? ((onLeaveEmployees / totalEmployees) * 100).toFixed(1) : '0'
  const managerPercentage = totalEmployees > 0 ? ((managerEmployees / totalEmployees) * 100).toFixed(1) : '0'

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng nhân viên</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{totalEmployees}</p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {totalEmployees > 0 ? `${totalEmployees} nhân viên` : 'Chưa có dữ liệu'}
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
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{activeEmployees}</p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {activePercentage}% tổng số
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
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{onLeaveEmployees}</p>
              <p className="text-sm text-yellow-600 flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {onLeavePercentage}% tổng số
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
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{managerEmployees}</p>
              <p className="text-sm text-purple-600 flex items-center">
                <Crown className="h-3 w-3 mr-1" />
                {managerPercentage}% tổng số
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
