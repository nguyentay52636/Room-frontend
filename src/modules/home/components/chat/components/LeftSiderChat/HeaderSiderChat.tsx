import { Search, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Input } from '@/components/ui/input'

export default function HeaderSiderChat({ setSearchTerm, searchTerm }: { setSearchTerm: (value: string) => void, searchTerm: string }) {
    return (
        <div className="flex-shrink-0 p-4 border-b border-gray-200/50">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Danh bạ</h2>
                <Button size="sm" variant="outline" className="rounded-xl bg-white/50">
                    <Plus className="w-4 h-4" />
                </Button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Tìm kiếm người dùng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/70 border-gray-200/50 focus:border-blue-400 focus:ring-blue-400 rounded-xl backdrop-blur-sm"
                />
            </div>
        </div>
    )
}
