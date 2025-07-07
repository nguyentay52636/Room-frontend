import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'

export default function FilterSearchLeftSiderChatManager({ setSearchTerm, searchTerm, setStatusFilter, statusFilter }: { setSearchTerm: (value: string) => void, searchTerm: string, setStatusFilter: (value: string) => void, statusFilter: string }) {
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-800 sticky top-0!">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="🔍 Tìm kiếm cuộc trò chuyện..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white dark:bg-gray-800 border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
        />
      </div>
      <div className="flex gap-2">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="flex-1 bg-white dark:bg-gray-800 rounded-xl border-gray-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">🌟 Tất cả</SelectItem>
            <SelectItem value="active">💚 Hoạt động</SelectItem>
            <SelectItem value="pending">⏳ Chờ xử lý</SelectItem>
            <SelectItem value="resolved">✅ Đã giải quyết</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl border-gray-200 hover:bg-blue-50 bg-transparent"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
