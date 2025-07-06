import { Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
export default function HeaderManagerCustomers() {
    return (
        <div className="flex flex-col my-4 mx-4 md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                            Quản lý khách hàng
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">Quản lý và theo dõi tất cả nhân viên trong hệ thống</p>
                    </div>
                </div>
            </div>
            <Button
                className="bg-gradient-to-r cursor-pointer from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300"
            >
                <Plus className="h-4 w-4 mr-2" />
                Thêm tài khoản
            </Button>
        </div>
        
    )
}
