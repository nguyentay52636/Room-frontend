
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Mail, Phone, MoreHorizontal, Calendar, Edit, Settings, Trash2, Eye } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
export default function TableManagerAccount({ filteredAccounts, getRoleIcon, getRoleName, getStatusBadge, handleViewAccount, handleEditAccount }: { filteredAccounts: any, getRoleIcon: any, getRoleName: any, getStatusBadge: any, handleViewAccount: any, handleEditAccount: any }) {
    return (
        <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                <Table>
                    <TableHeader className="sticky top-0 bg-white dark:bg-gray-950 z-10">
                        <TableRow>
                            <TableHead className="min-w-[250px]">Tài khoản</TableHead>
                            <TableHead className="min-w-[150px]">Vai trò</TableHead>
                            <TableHead className="min-w-[120px]">Trạng thái</TableHead>
                            <TableHead className="min-w-[100px]">Bất động sản</TableHead>
                            <TableHead className="min-w-[180px]">Đăng nhập cuối</TableHead>
                            <TableHead className="min-w-[120px]">Tham gia</TableHead>
                            <TableHead className="min-w-[100px] text-right">Hành động</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAccounts.map((account: any) => (
                            <TableRow key={account.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <TableCell className="min-w-[250px]">
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={account.avatar || "/placeholder.svg"} alt={account.name} />
                                            <AvatarFallback>{account.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-gray-100">{account.name}</p>
                                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                <Mail className="h-3 w-3" />
                                                <span>{account.email}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                <Phone className="h-3 w-3" />
                                                <span>{account.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="min-w-[150px]">
                                    <div className="flex items-center space-x-2">
                                        {getRoleIcon(account.role)}
                                        <span className="font-medium">{getRoleName(account.role)}</span>
                                    </div>
                                    <p className="text-xs text-gray-500">{account.department}</p>
                                </TableCell>
                                <TableCell className="min-w-[120px]">{getStatusBadge(account.status)}</TableCell>
                                <TableCell className="min-w-[100px]">
                                    <div className="text-center">
                                        <p className="font-medium">{account.properties}</p>
                                        <p className="text-xs text-gray-500">bất động sản</p>
                                    </div>
                                </TableCell>
                                <TableCell className="min-w-[180px]">
                                    <div>
                                        <p className="text-sm">{account.lastLogin}</p>
                                        <p className="text-xs text-gray-500">{account.loginCount} lần đăng nhập</p>
                                    </div>
                                </TableCell>
                                <TableCell className="min-w-[120px]">
                                    <div className="flex items-center space-x-1 text-sm">
                                        <Calendar className="h-3 w-3 text-gray-400" />
                                        <span>{account.createdAt}</span>
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
                                            <DropdownMenuItem onClick={() => handleViewAccount(account)}>
                                                <Eye className="h-4 w-4 mr-2" />
                                                Xem chi tiết
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleEditAccount(account)}>
                                                <Edit className="h-4 w-4 mr-2" />
                                                Chỉnh sửa
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Settings className="h-4 w-4 mr-2" />
                                                Cài đặt
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Xóa tài khoản
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
