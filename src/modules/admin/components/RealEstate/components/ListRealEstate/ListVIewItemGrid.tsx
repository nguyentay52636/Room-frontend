import React from 'react'
import { Bed, Badge, Edit, Eye, MapPin, Star, Bath, User, Trash2, Calendar, Square, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export default function ListVIewItemGrid({ property, getStatusBadge, getTypeLabel, handleViewProperty, handleEditProperty, handleDeleteProperty }: any) {
    return (
        <div
            key={property.id}
            className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
        >
            <div className="relative">
                <img
                    src={property.image || "/placeholder.svg?height=200&width=300"}
                    alt={property.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">{getStatusBadge(property.status)}</div>
                <div className="absolute top-3 right-3 flex items-center space-x-1 bg-white/90 dark:bg-gray-800/90 rounded-full px-2 py-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{property.rating}</span>
                </div>
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
            </div>

            <div className="p-4 space-y-3">
                <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                        {property.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {property.location}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-green-600">{property.price.toLocaleString()} VND</div>
                    <Badge variant="outline" className="border-gray-300 dark:border-gray-600">
                        {getTypeLabel(property.type)}
                    </Badge>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                            <Bed className="h-3 w-3 mr-1" />
                            {property.beds}
                        </div>
                        <div className="flex items-center">
                            <Bath className="h-3 w-3 mr-1" />
                            {property.baths}
                        </div>
                        <div className="flex items-center">
                            <Square className="h-3 w-3 mr-1" />
                            {property.area}m²
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {property.owner}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {property.views}
                    </div>
                </div>
            </div>
        </div>
    )
}
