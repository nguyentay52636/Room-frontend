import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import React from 'react'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react'
import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'

interface ActionItemProps {
    property: any;
    handleViewProperty: (property: any) => void;
    handleEditProperty: (property: any) => void;
    handleDeleteProperty: (property: any) => void;
}

export default function ActionItem({ property, handleViewProperty, handleEditProperty, handleDeleteProperty }: ActionItemProps) {
    return (
        <div className="absolute bottom-3 right-3">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                        onClick={() => handleViewProperty(property)}
                        className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                        <Eye className="h-4 w-4 mr-2 text-blue-600" />
                        Xem chi tiết
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleEditProperty(property)}
                        className="hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                        <Edit className="h-4 w-4 mr-2 text-green-600" />
                        Chỉnh sửa
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => handleDeleteProperty(property.id)}
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Xóa
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
