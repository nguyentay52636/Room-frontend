import { Button } from '@/components/ui/button'
import { Building } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import PaginationRealEstate from '../PaginationRealEstate'
import ListViewItem from './ListViewItem'
import ListVIewItemGrid from './ListVIewItemGrid'

export default function ListViewRealEstate({ paginatedProperties, totalItems, currentPage, totalPages, handlePageChange, getTypeLabel, getStatusBadge, clearFilters, viewMode, searchQuery, filterType, filterStatus, filterLocation, filterBeds, filterBaths, priceRange, areaRange, showAdvancedFilters, setShowAdvancedFilters, handleViewProperty, handleEditProperty, handleDeleteProperty }: any) {
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
                            {paginatedProperties.map((property: any) => (
                                <ListVIewItemGrid
                                    key={property.id}
                                    property={property}
                                    getStatusBadge={getStatusBadge}
                                    getTypeLabel={getTypeLabel}
                                    handleViewProperty={handleViewProperty}
                                    handleEditProperty={handleEditProperty}
                                    handleDeleteProperty={handleDeleteProperty}
                                />
                            ))}
                        </div>
                    ) : (
                
                        <ListViewItem
                            paginatedProperties={paginatedProperties}
                            getStatusBadge={getStatusBadge}
                            getTypeLabel={getTypeLabel}
                            handleViewProperty={handleViewProperty}
                            handleEditProperty={handleEditProperty}
                            handleDeleteProperty={handleDeleteProperty}
                        />
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
                />
            </Card >
        </>
    )
}
