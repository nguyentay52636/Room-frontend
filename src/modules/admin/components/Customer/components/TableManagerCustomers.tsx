import { Table } from '@/components/ui/table'
import React from 'react'
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Mail, Phone, MapPin, Home, Heart, Star, Clock, MoreHorizontal, Edit, MessageSquare, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export default function TableManagerCustomers({ filteredCustomers, getTypeBadge, getStatusBadge, formatCurrency, handleViewCustomer, handleEditCustomer }: { filteredCustomers: any[], getTypeBadge: (type: string) => React.ReactNode, getStatusBadge: (status: string) => React.ReactNode, formatCurrency: (amount: number) => string, handleViewCustomer: (customer: any) => void, handleEditCustomer: (customer: any) => void }) {
    return (
        <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-[300px]">Khách hàng</TableHead>
                            <TableHead className="min-w-[120px]">Loại</TableHead>
                            <TableHead className="min-w-[120px]">Trạng thái</TableHead>
                            <TableHead className="min-w-[200px]">Bất động sản</TableHead>
                            <TableHead className="min-w-[150px]">Tổng chi tiêu</TableHead>
                            <TableHead className="min-w-[120px]">Đánh giá</TableHead>
                            <TableHead className="min-w-[180px]">Hoạt động cuối</TableHead>
                            <TableHead className="min-w-[100px] text-right">Hành động</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCustomers.map((customer) => (
                            <TableRow key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <TableCell className="min-w-[300px]">
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                                            <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-gray-100">{customer.name}</p>
                                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                <Mail className="h-3 w-3" />
                                                <span>{customer.email}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                <Phone className="h-3 w-3" />
                                                <span>{customer.phone}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                <MapPin className="h-3 w-3" />
                                                <span className="truncate max-w-48">{customer.address}</span>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="min-w-[120px]">{getTypeBadge(customer.type)}</TableCell>
                                <TableCell className="min-w-[120px]">{getStatusBadge(customer.status)}</TableCell>
                                <TableCell className="min-w-[200px]">
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <Home className="h-3 w-3 text-gray-400" />
                                            <span className="text-sm font-medium">{customer.propertiesRented}</span>
                                            <span className="text-xs text-gray-500">đã thuê</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Heart className="h-3 w-3 text-red-400" />
                                            <span className="text-sm">{customer.favoriteProperties}</span>
                                            <span className="text-xs text-gray-500">yêu thích</span>
                                        </div>
                                        {customer.currentProperty && (
                                            <p className="text-xs text-blue-600 truncate max-w-32">{customer.currentProperty}</p>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="min-w-[150px]">
                                    <div>
                                        <p className="font-medium text-green-600">{formatCurrency(customer.totalSpent)}</p>
                                        {customer.contractEnd && (
                                            <p className="text-xs text-gray-500">HĐ đến {customer.contractEnd}</p>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="min-w-[120px]">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex items-center space-x-1">
                                            <Star className="h-3 w-3 text-yellow-500" />
                                            <span className="text-sm font-medium">
                                                {customer.averageRating > 0 ? customer.averageRating.toFixed(1) : "N/A"}
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-500">({customer.reviews} đánh giá)</span>
                                    </div>
                                </TableCell>
                                <TableCell className="min-w-[180px]">
                                    <div className="flex items-center space-x-1 text-sm">
                                        <Clock className="h-3 w-3 text-gray-400" />
                                        <span>{customer.lastActivity}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="min-w-[100px] text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => handleViewCustomer(customer)}>
                                                <Eye className="h-4 w-4 mr-2" />
                                                Xem chi tiết
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleEditCustomer(customer)}>
                                                <Edit className="h-4 w-4 mr-2" />
                                                Chỉnh sửa
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <MessageSquare className="h-4 w-4 mr-2" />
                                                Nhắn tin
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Xóa khách hàng
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
    )
}
