import React from 'react'
import { MapPin, Bed, Bath, Square, Star, User, Calendar, Eye, MoreHorizontal, Edit, Trash2, Badge } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'

export default function RealEstateItem({ property, getStatusBadge, getTypeLabel, handleViewProperty, handleEditProperty, handleDeleteProperty }: { property: any, getStatusBadge: (status: string) => React.ReactNode, getTypeLabel: (type: string) => string, handleViewProperty: (property: any) => void, handleEditProperty: (property: any) => void, handleDeleteProperty: (id: number) => void }) {
    return (
        <div
            key={property.id}
            className="group flex items-center space-x-4 p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 bg-white dark:bg-gray-800"
        >
            <div className="relative overflow-hidden rounded-lg flex-shrink-0">
                <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-32 h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2">{getStatusBadge(property.status)}</div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                        <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {property.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="h-4 w-4 mr-1" />
                            {property.location}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {property.description}
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center">
                                <Bed className="h-4 w-4 mr-1" />
                                {property.beds} phòng ngủ
                            </div>
                            <div className="flex items-center">
                                <Bath className="h-4 w-4 mr-1" />
                                {property.baths} phòng tắm
                            </div>
                            <div className="flex items-center">
                                <Square className="h-4 w-4 mr-1" />
                                {property.area}m²
                            </div>
                            <div className="flex items-center">
                                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                                {property.rating}
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center">
                                <User className="h-3 w-3 mr-1" />
                                Chủ: {property.owner}
                            </div>
                            <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(property.createdAt).toLocaleDateString("vi-VN")}
                            </div>
                            <div className="flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                {property.views} lượt xem
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end space-y-3 ml-4">
                        <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">{property.price.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">VND/tháng</div>
                        </div>
                        <Badge variant="outline" className="border-gray-300 dark:border-gray-600">
                            {getTypeLabel(property.type)}
                        </Badge>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-700">
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
                </div>
            </div>
        </div>
    )
}
