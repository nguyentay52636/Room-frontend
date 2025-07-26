// components/ActionTableCustomer.tsx
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Edit, MessageSquare, Trash2, Eye } from 'lucide-react'
import { Customer } from '@/lib/apis/types';
interface ActionTableCustomerProps {
    customer: Customer;
    handleView: (customer: Customer) => void;
    handleEdit: (customer: Customer) => void;
    handleDelete?: (customer: Customer) => void;
}

export default function ActionTableCustomer({
    customer,
    handleView,
    handleEdit,
    handleDelete
}: ActionTableCustomerProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleView(customer)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Xem chi tiết
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleEdit(customer)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Chỉnh sửa
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Nhắn tin
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => handleDelete?.(customer)}
                    className="text-red-600"
                >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Xóa khách hàng
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
