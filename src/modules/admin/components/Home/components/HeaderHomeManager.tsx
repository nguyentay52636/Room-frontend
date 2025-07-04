import React from 'react'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { Clock, RefreshCw, Bell, MoreHorizontal, Download, Filter, Settings, Plus, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'


export default function HeaderHomeManager({ currentTime, timeRange, setTimeRange, handleRefresh, notifications, isLoading }: { currentTime: Date, timeRange: string, setTimeRange: (timeRange: string) => void, handleRefresh: () => void, notifications: number, isLoading: boolean }) {
    return (
        <header className="sticky top-0 z-40 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900 dark:to-gray-900 border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm">
            <div className="flex h-16 items-center gap-2 px-4">


                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-gray-900 dark:text-gray-100 font-medium">Tổng quan</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="hidden md:flex items-center ml-4 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {currentTime.toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                    })}
                </div>

                <div className="ml-auto flex items-center gap-2">
                    {/* Time Range Selector */}
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-32 h-8 text-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1d">Hôm nay</SelectItem>
                            <SelectItem value="7d">7 ngày</SelectItem>
                            <SelectItem value="30d">30 ngày</SelectItem>
                            <SelectItem value="90d">3 tháng</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Action Buttons */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRefresh}
                        disabled={isLoading}
                        className="hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    </Button>

                    <Button variant="ghost" size="sm" className="relative hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Bell className="h-4 w-4" />
                        {notifications > 0 && (
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 hover:bg-red-500">
                                {notifications}
                            </Badge>
                        )}
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Xuất báo cáo
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Filter className="h-4 w-4 mr-2" />
                                Bộ lọc nâng cao
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="h-4 w-4 mr-2" />
                                Cài đặt dashboard
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
                    >
                        <Eye className="h-4 w-4 mr-2" />
                        Xem
                    </Button>
                    <Button
                        size="sm"
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Thêm
                    </Button>
                </div>
            </div>
        </header>

    )
}
