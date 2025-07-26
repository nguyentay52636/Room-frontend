import { MoreHorizontal, Eye, Edit, Settings, Trash2 } from 'lucide-react'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
export default function ActionsTableAccounts({ handleViewAccount, handleEditAccount, account }: { handleViewAccount: any, handleEditAccount: any, account: any }) {
    return (
        <>
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
        </>
    )
}
