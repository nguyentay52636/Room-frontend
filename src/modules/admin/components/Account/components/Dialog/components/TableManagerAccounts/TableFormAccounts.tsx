import React from 'react'
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Mail, Phone, Eye, EyeOff } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ActionsTableCustomer from './ActionsTableAccounts'

export default function TableFormAccounts({ filteredAccounts, getRoleIcon, getRoleName, getStatusBadge, handleViewAccount, handleEditAccount }: { filteredAccounts: any, getRoleIcon: any, getRoleName: any, getStatusBadge: any, handleViewAccount: any, handleEditAccount: any }) {
    const [visiblePasswords, setVisiblePasswords] = useState<{ [key: string]: boolean }>({})

    const togglePasswordVisibility = (accountId: string) => {
        setVisiblePasswords(prev => ({
            ...prev,
            [accountId]: !prev[accountId]
        }))
    }

    return (
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            {/* Desktop Table */}
            <div className="hidden lg:block">
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
                                    <ActionsTableCustomer handleViewAccount={handleViewAccount} handleEditAccount={handleEditAccount} account={account} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile/Tablet Cards */}
            <div className="lg:hidden space-y-4">
                {filteredAccounts.map((account: any, index: number) => (
                    <div key={account._id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-3">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                                <Avatar className="h-12 w-12 flex-shrink-0">
                                    <AvatarImage src={account.anhDaiDien || "/placeholder.svg"} alt={account.ten} />
                                    <AvatarFallback>{account.ten?.charAt(0) || 'U'}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 dark:text-gray-100 truncate">{account.ten}</p>
                                    <p className="text-sm text-gray-500 truncate">{account.email}</p>
                                    <p className="text-sm text-gray-500 truncate">{account.tenDangNhap}</p>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <ActionsTableCustomer handleViewAccount={handleViewAccount} handleEditAccount={handleEditAccount} account={account} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-600 dark:text-gray-300">{account.soDienThoai}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                {getRoleIcon(typeof account.vaiTro === 'object' ? account.vaiTro?.ten : account.vaiTro || 'customer')}
                                <span className="text-gray-600 dark:text-gray-300">{getRoleName(typeof account.vaiTro === 'object' ? account.vaiTro?.ten : account.vaiTro || 'customer')}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">Mật khẩu:</span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                    {visiblePasswords[account._id] ? account.matKhau || '••••••••' : '••••••••'}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0"
                                    onClick={() => togglePasswordVisibility(account._id)}
                                >
                                    {visiblePasswords[account._id] ? (
                                        <EyeOff className="h-3 w-3 text-gray-500" />
                                    ) : (
                                        <Eye className="h-3 w-3 text-gray-500" />
                                    )}
                                </Button>
                            </div>
                            <div>
                                {getStatusBadge(account.trangThai)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
