import RealEstateItem from "./RealEstateItem";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Building, MapPin, Bed, Bath, Square, Star, User, Calendar, Eye, MoreHorizontal, Edit, Trash2, Badge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import PaginationRealEstate from "../PaginationRealEstate";


export default function ListViewRealEstate({ paginatedProperties, totalItems, currentPage, totalPages, handlePageChange, clearFilters, viewMode, searchQuery, filterType, filterStatus, filterLocation, filterBeds, filterBaths, priceRange, areaRange, showAdvancedFilters, setShowAdvancedFilters, handleViewProperty, handleEditProperty, handleDeleteProperty, getStatusBadge, getTypeLabel }: { paginatedProperties: any[], totalItems: number, currentPage: number, totalPages: number, handlePageChange: (page: number) => void, clearFilters: () => void, viewMode: string, searchQuery: string, filterType: string, filterStatus: string, filterLocation: string, filterBeds: string, filterBaths: string, priceRange: number[], areaRange: number[], showAdvancedFilters: boolean, setShowAdvancedFilters: (show: boolean) => void, handleViewProperty: (property: any) => void, handleEditProperty: (property: any) => void, handleDeleteProperty: (id: number) => void, getStatusBadge: (status: string) => React.ReactNode, getTypeLabel: (type: string) => string }) {
    return (
        <>
            <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <CardTitle className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                                    <Building className="h-4 w-4 text-white" />
                                </div>
                                <span>Danh sách bất động sản</span>
                            </CardTitle>
                            <CardDescription>
                                Hiển thị {paginatedProperties.length} trên {totalItems} bất động sản
                                {searchQuery && ` • Tìm kiếm: "${searchQuery}"`}
                                {(filterType !== "all" || filterStatus !== "all" || filterLocation !== "all") && " • Đã lọc"}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {paginatedProperties.map((property) => (
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
                            ))}
                        </div>
                    ) : (
                        // List View
                        <div className="space-y-4">
                            {paginatedProperties.map((property) => (
                                <RealEstateItem property={property} getStatusBadge={getStatusBadge} getTypeLabel={getTypeLabel} handleViewProperty={handleViewProperty} handleEditProperty={handleEditProperty} handleDeleteProperty={handleDeleteProperty} />
                            ))}
                        </div>
                    )}

                    {paginatedProperties.length === 0 && (
                        <div className="text-center py-12">
                            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                Không tìm thấy bất động sản
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                            <Button onClick={clearFilters} variant="outline">
                                Xóa bộ lọc
                            </Button>
                        </div>
                    )}
                </CardContent>
                <PaginationRealEstate
                 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    totalItems={totalItems}
                    viewMode={viewMode}
                />
            </Card>
        </>
    )
}
