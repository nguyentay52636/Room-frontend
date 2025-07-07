import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'
export default function FilterSearchReviewsManager({ searchTerm, setSearchTerm, ratingFilter, setRatingFilter, categoryFilter, setCategoryFilter }: { searchTerm: string, setSearchTerm: any, ratingFilter: string, setRatingFilter: any, categoryFilter: string, setCategoryFilter: any }) {
    return (
        <>
            <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0">
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                        <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl">
                            <Search className="h-5 w-5 text-white" />
                        </div>
                        <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                            Tìm kiếm và lọc đánh giá
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative group">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            <Input
                                placeholder="🔍 Tìm theo tên khách hàng, nội dung đánh giá hoặc tên bất động sản..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 h-12 bg-white dark:bg-gray-800 border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl text-base"
                            />
                        </div>
                        <div className="flex gap-3">
                            <Select value={ratingFilter} onValueChange={setRatingFilter}>
                                <SelectTrigger className="w-44 h-12 bg-white dark:bg-gray-800 rounded-xl border-gray-200 focus:border-blue-400">
                                    <SelectValue placeholder="⭐ Lọc theo sao" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">🌟 Tất cả đánh giá</SelectItem>
                                    <SelectItem value="5">⭐⭐⭐⭐⭐ 5 sao xuất sắc</SelectItem>
                                    <SelectItem value="4">⭐⭐⭐⭐ 4 sao tốt</SelectItem>
                                    <SelectItem value="3">⭐⭐⭐ 3 sao trung bình</SelectItem>
                                    <SelectItem value="2">⭐⭐ 2 sao kém</SelectItem>
                                    <SelectItem value="1">⭐ 1 sao rất kém</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-44 h-12 bg-white dark:bg-gray-800 rounded-xl border-gray-200 focus:border-blue-400">
                                    <SelectValue placeholder="🏠 Loại BĐS" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">🏠 Tất cả loại</SelectItem>
                                    <SelectItem value="Căn hộ">🏢 Căn hộ</SelectItem>
                                    <SelectItem value="Villa">🏡 Villa</SelectItem>
                                    <SelectItem value="Nhà phố">🏘️ Nhà phố</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-12 px-4 rounded-xl border-blue-200 hover:bg-blue-50 hover:border-blue-600 bg-transparent transition-all duration-200"
                            >
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
