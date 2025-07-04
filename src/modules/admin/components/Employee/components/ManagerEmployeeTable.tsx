import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Mail, Phone, MoreHorizontal, Eye, Edit, Trash2, Filter, DollarSign, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'

export default function ManagerEmployeeTable({ filteredStaff, searchQuery, setSearchQuery, handleViewStaff, handleEditStaff, handleDeleteStaff, paginatedStaff, getPositionIcon, getPositionLabel, getDepartmentLabel, getStatusBadge }: { filteredStaff: any, searchQuery: any, setSearchQuery: any, handleViewStaff: any, handleEditStaff: any, handleDeleteStaff: any, paginatedStaff: any, getPositionIcon: any, getPositionLabel: any, getDepartmentLabel: any, getStatusBadge: any }) {
    return (
        <>
            <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <CardTitle className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                                    <Users className="h-4 w-4 text-white" />
                                </div>
                                <span>Danh sách nhân viên</span>
                            </CardTitle>
                            <CardDescription>
                                Quản lý và theo dõi tất cả nhân viên ({filteredStaff.length} nhân viên)
                            </CardDescription>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Tìm kiếm nhân viên..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 w-64 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                                />
                            </div>
                            <Button variant="outline" size="sm" className="hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent">
                                <Filter className="h-4 w-4 mr-2" />
                                Lọc
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="max-h-[600px] overflow-y-auto">
                            <Table>
                                <TableHeader className="sticky top-0 bg-gray-50 dark:bg-gray-800/50 z-10">
                                    <TableRow>
                                        <TableHead className="font-semibold bg-gray-50 dark:bg-gray-800/50">Nhân viên</TableHead>
                                        <TableHead className="font-semibold bg-gray-50 dark:bg-gray-800/50">Liên hệ</TableHead>
                                        <TableHead className="font-semibold bg-gray-50 dark:bg-gray-800/50">Vị trí</TableHead>
                                        <TableHead className="font-semibold bg-gray-50 dark:bg-gray-800/50">Phòng ban</TableHead>
                                        <TableHead className="font-semibold bg-gray-50 dark:bg-gray-800/50">Trạng thái</TableHead>
                                        <TableHead className="font-semibold bg-gray-50 dark:bg-gray-800/50">Hiệu suất</TableHead>
                                        <TableHead className="font-semibold bg-gray-50 dark:bg-gray-800/50">Lương (VNĐ)</TableHead>
                                        <TableHead className="text-right font-semibold bg-gray-50 dark:bg-gray-800/50">Thao tác</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedStaff.map((person: any) => (
                                        <TableRow key={person.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <TableCell>
                                                <div className="flex items-center space-x-4">
                                                    <div className="relative">
                                                        <Avatar className="h-10 w-10 border-2 border-gray-200 dark:border-gray-700">
                                                            <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                                                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                                                                {person.name.charAt(0)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900 dark:text-gray-100">{person.name}</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            ID: #{person.id.toString().padStart(3, "0")}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-2">
                                                    <div className="flex items-center text-sm bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-1">
                                                        <Mail className="h-3 w-3 mr-2 text-blue-600" />
                                                        <span className="truncate">{person.email}</span>
                                                    </div>
                                                    <div className="flex items-center text-sm bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-1">
                                                        <Phone className="h-3 w-3 mr-2 text-green-600" />
                                                        <span>{person.phone}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    {getPositionIcon(person.position)}
                                                    <span className="font-medium">{getPositionLabel(person.position)}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="border-gray-300 dark:border-gray-600">
                                                    {getDepartmentLabel(person.department)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(person.status)}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                        <div
                                                            className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                                                            style={{ width: `${person.performance}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm font-medium text-green-600">{person.performance}%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-1 font-semibold text-green-600">
                                                    <DollarSign className="h-4 w-4" />
                                                    <span>{Number.parseInt(person.salary).toLocaleString("vi-VN")}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48">
                                                        <DropdownMenuItem
                                                            onClick={() => handleViewStaff(person)}
                                                            className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                                        >
                                                            <Eye className="h-4 w-4 mr-2 text-blue-600" />
                                                            Xem chi tiết
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleEditStaff(person)}
                                                            className="hover:bg-green-50 dark:hover:bg-green-900/20"
                                                        >
                                                            <Edit className="h-4 w-4 mr-2 text-green-600" />
                                                            Chỉnh sửa
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                            onClick={() => handleDeleteStaff(person.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Xóa
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
