import { SelectContent } from '@/components/ui/select'
import { SelectValue } from '@/components/ui/select'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { SelectItem } from '@/components/ui/select'
import { SelectTrigger } from '@/components/ui/select'
import { Filter } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export default function FilterSearchManagerAccount() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [roleFilter, setRoleFilter] = useState("all")
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Tìm kiếm theo tên, email, số điện thoại..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                    <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="inactive">Không hoạt động</SelectItem>
                    <SelectItem value="suspended">Tạm khóa</SelectItem>
                </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-48">
                    <SelectValue placeholder="Vai trò" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Tất cả vai trò</SelectItem>
                    <SelectItem value="admin">Quản trị viên</SelectItem>
                    <SelectItem value="manager">Quản lý</SelectItem>
                    <SelectItem value="staff">Nhân viên</SelectItem>
                    <SelectItem value="owner">Chủ nhà</SelectItem>
                    <SelectItem value="customer">Khách hàng</SelectItem>
                </SelectContent>
            </Select>
            <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Bộ lọc
            </Button>
        </div>
    )
}
