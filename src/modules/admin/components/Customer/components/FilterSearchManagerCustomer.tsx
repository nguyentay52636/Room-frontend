import { SelectContent } from '@/components/ui/select'
import { SelectValue } from '@/components/ui/select'
import { SelectTrigger } from '@/components/ui/select'
import { SelectItem } from '@/components/ui/select'
import { Select } from '@/components/ui/select'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'

export default function FilterSearchManagerCustomer({ searchTerm, statusFilter, typeFilter, setSearchTerm, setStatusFilter, setTypeFilter }: { searchTerm: string, statusFilter: string, typeFilter: string, setSearchTerm: (value: string) => void, setStatusFilter: (value: string) => void, setTypeFilter: (value: string) => void }) {
    return (
        <>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Tìm kiếm theo tên, email, số điện thoại, địa chỉ..."
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
                        <SelectItem value="pending">Chờ duyệt</SelectItem>
                        <SelectItem value="blocked">Bị khóa</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Loại khách hàng" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tất cả loại</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="regular">Thường</SelectItem>
                        <SelectItem value="new">Mới</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Bộ lọc
                </Button>
            </div>
        </>
    )
}
