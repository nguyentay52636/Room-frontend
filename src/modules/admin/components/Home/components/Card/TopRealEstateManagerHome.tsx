import { CardContent, CardTitle } from '@/components/ui/card'
import { CardHeader } from '@/components/ui/card'
import { Card } from '@/components/ui/card'
import { Building } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { MapPin, Star, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function TopRealEstateManagerHome({ topProperties }: { topProperties: any }) {
    return (
        <>
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                <Building className="h-4 w-4 text-white" />
                            </div>
                            <span>Bất động sản hàng đầu</span>
                        </CardTitle>
                        <Button variant="ghost" size="sm">
                            Xem tất cả
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {topProperties.map((property: any) => (
                            <div
                                key={property.id}
                                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            >
                                <img
                                    src={property.image || "/placeholder.svg"}
                                    alt={property.name}
                                    className="w-16 h-12 rounded-lg object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 dark:text-gray-100 truncate">{property.name}</p>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                        <MapPin className="h-3 w-3" />
                                        <span>{property.location}</span>
                                    </div>
                                    <div className="flex items-center space-x-4 mt-1">
                                        <span className="text-sm font-semibold text-green-600">₫{property.price}</span>
                                        <div className="flex items-center space-x-1">
                                            <Star className="h-3 w-3 text-yellow-500" />
                                            <span className="text-xs">{property.rating}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Eye className="h-3 w-3 text-gray-400" />
                                            <span className="text-xs">{property.views}</span>
                                        </div>
                                    </div>
                                </div>
                                <Badge
                                    variant={
                                        property.status === "available"
                                            ? "default"
                                            : property.status === "rented"
                                                ? "secondary"
                                                : "outline"
                                    }
                                >
                                    {property.status === "available"
                                        ? "Có sẵn"
                                        : property.status === "rented"
                                            ? "Đã thuê"
                                            : "Chờ duyệt"}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
