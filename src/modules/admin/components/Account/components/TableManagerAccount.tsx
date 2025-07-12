
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Mail, Phone, MoreHorizontal, Calendar, Edit, Settings, Trash2, Eye, EyeOff } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function TableManagerAccount({ filteredAccounts, getRoleIcon, getRoleName, getStatusBadge, handleViewAccount, handleEditAccount }: { filteredAccounts: any, getRoleIcon: any, getRoleName: any, getStatusBadge: any, handleViewAccount: any, handleEditAccount: any }) {
    const [visiblePasswords, setVisiblePasswords] = useState<{ [key: string]: boolean }>({})

    const togglePasswordVisibility = (accountId: string) => {
        setVisiblePasswords(prev => ({
            ...prev,
            [accountId]: !prev[accountId]
        }))
    }

    return (
        <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                <Table>
                    <TableHeader className="sticky top-0 bg-white dark:bg-gray-950 z-10">
                        <TableRow>
                            <TableHead className="min-w-[50px]">STT</TableHead>
                            <TableHead className="min-w-[250px]">Tài khoản</TableHead>
                            <TableHead className="min-w-[150px]">Email</TableHead>
                            <TableHead className="min-w-[150px]">Tên đăng nhập</TableHead>
                            <TableHead className="min-w-[150px]">
                                <div className="flex items-center space-x-2">
                                    <span>Mật khẩu</span>
                                    <Eye className="h-4 w-4 text-gray-500" />
                                </div>
                            </TableHead>
                            <TableHead className="min-w-[150px]">Số điện thoại</TableHead>
                            <TableHead className="min-w-[100px]">Ảnh đại diện</TableHead>
                            <TableHead className="min-w-[120px]">Vai trò</TableHead>
                            <TableHead className="min-w-[120px]">Trạng thái</TableHead>
                            <TableHead className="min-w-[100px] text-right">Hành động</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAccounts.map((account: any, index: number) => (
                            <TableRow key={account._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <TableCell className="min-w-[50px]">
                                    {index + 1}
                                </TableCell>
                                <TableCell className="min-w-[250px]">
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={account.anhDaiDien || "/placeholder.svg"} alt={account.ten} />
                                            <AvatarFallback>{account.ten?.charAt(0) || 'U'}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-gray-100">{account.ten}</p>
                                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                <Mail className="h-3 w-3" />
                                                <span>{account.email}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                <Phone className="h-3 w-3" />
                                                <span>{account.soDienThoai}</span>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="min-w-[150px]">{account.email}</TableCell>
                                <TableCell className="min-w-[150px]">{account.tenDangNhap}</TableCell>
                                <TableCell className="min-w-[150px]">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-500">
                                            {visiblePasswords[account._id] ? account.matKhau || '••••••••' : '••••••••'}
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            onClick={() => togglePasswordVisibility(account._id)}
                                        >
                                            {visiblePasswords[account._id] ? (
                                                <EyeOff className="h-3 w-3 text-gray-500" />
                                            ) : (
                                                <Eye className="h-3 w-3 text-gray-500" />
                                            )}
                                        </Button>
                                    </div>
                                </TableCell>
                                <TableCell className="min-w-[150px]">{account.soDienThoai}</TableCell>
                                <TableCell className="min-w-[100px]">
                                    {account.anhDaiDien ? (
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={account.anhDaiDien} alt={account.ten} />
                                            <AvatarFallback>{account.ten?.charAt(0) || 'U'}</AvatarFallback>
                                        </Avatar>
                                    ) : (
                                        <span className="text-gray-400">Không có</span>
                                    )}
                                </TableCell>
                                <TableCell className="min-w-[120px]">
                                    <div className="flex items-center space-x-2">
                                        {getRoleIcon(typeof account.vaiTro === 'object' ? account.vaiTro?.ten : account.vaiTro || 'customer')}
                                        <span className="font-medium">{getRoleName(typeof account.vaiTro === 'object' ? account.vaiTro?.ten : account.vaiTro || 'customer')}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="min-w-[120px]">{getStatusBadge(account.trangThai)}</TableCell>
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
