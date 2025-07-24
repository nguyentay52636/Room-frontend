import React from 'react'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuContent
} from '@radix-ui/react-dropdown-menu'
import { Button } from '@/components/ui/button'
import { Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react'
import { Employee } from '@/lib/apis/types'

interface EmployeeActionProps {
    employee: Employee,
    onEdit: (employee: Employee) => void;
    onViewDetail: (employee: Employee) => void;
    onDelete: (employee: Employee) => void;
}

export default function ActionTableEmployee({
    employee,
    onEdit,
    onViewDetail,
    onDelete
}: EmployeeActionProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"

                >
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                    onClick={() => onViewDetail(employee)}
                    className="hover:bg-blue-50 dark:hover:bg-blu"
                >
                    <Eye className="h-4 w-4 mr-2 text-blue-600" />
                    Xem chi tiết
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => onEdit(employee)}
                    className="hover:bg-green-50 dark:hover:bg-green-900/20"
                >
                    <Edit className="h-4 w-4 mr-2 text-green-600" />
                    Chỉnh sửa
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => onDelete(employee)}
                    className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Xóa
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
