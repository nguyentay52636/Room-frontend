import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Search, SlidersHorizontal } from 'lucide-react'
import { Label } from '@/components/ui/label'
export default function SearchFilterManagerRealEstate({ uniqueDistricts, searchQuery, setSearchQuery, filterType, setFilterType, filterStatus, setFilterStatus, sortBy, setSortBy, filterLocation, setFilterLocation, filterBeds, setFilterBeds, filterBaths, setFilterBaths, priceRange, setPriceRange, areaRange, setAreaRange, showAdvancedFilters, setShowAdvancedFilters, clearFilters }: { uniqueDistricts: string[], searchQuery: string, setSearchQuery: (value: string) => void, filterType: string, setFilterType: (value: string) => void, filterStatus: string, setFilterStatus: (value: string) => void, sortBy: string, setSortBy: (value: string) => void, filterLocation: string, setFilterLocation: (value: string) => void, filterBeds: string, setFilterBeds: (value: string) => void, filterBaths: string, setFilterBaths: (value: string) => void, priceRange: [number, number], setPriceRange: (value: [number, number]) => void, areaRange: [number, number], setAreaRange: (value: [number, number]) => void, showAdvancedFilters: boolean, setShowAdvancedFilters: (value: boolean) => void, clearFilters: () => void }) {
  return (
    <>
      <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardContent className="p-6 space-y-4">
          {/* Main Search and Quick Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo tên, địa điểm, chủ sở hữu, quận..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40 border-gray-200 dark:border-gray-700">
                  <SelectValue placeholder="Loại BĐS" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả loại</SelectItem>
                  <SelectItem value="apartment">Căn hộ</SelectItem>
                  <SelectItem value="house">Nhà riêng</SelectItem>
                  <SelectItem value="condo">Chung cư</SelectItem>
                  <SelectItem value="villa">Biệt thự</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="townhouse">Nhà phố</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40 border-gray-200 dark:border-gray-700">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="available">Có sẵn</SelectItem>
                  <SelectItem value="rented">Đã thuê</SelectItem>
                  <SelectItem value="pending">Chờ duyệt</SelectItem>
                  <SelectItem value="maintenance">Bảo trì</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 border-gray-200 dark:border-gray-700">
                  <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                  <SelectItem value="oldest">Cũ nhất</SelectItem>
                  <SelectItem value="price-high">Giá cao → thấp</SelectItem>
                  <SelectItem value="price-low">Giá thấp → cao</SelectItem>
                  <SelectItem value="area-large">Diện tích lớn → nhỏ</SelectItem>
                  <SelectItem value="area-small">Diện tích nhỏ → lớn</SelectItem>
                  <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700 bg-transparent"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Lọc nâng cao
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Quận/Huyện</Label>
                  <Select value={filterLocation} onValueChange={setFilterLocation}>
                    <SelectTrigger className="border-gray-200 dark:border-gray-700">
                      <SelectValue placeholder="Chọn quận" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả quận</SelectItem>
                      {uniqueDistricts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Số phòng ngủ</Label>
                  <Select value={filterBeds} onValueChange={setFilterBeds}>
                    <SelectTrigger className="border-gray-200 dark:border-gray-700">
                      <SelectValue placeholder="Chọn số PN" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="1">1 phòng</SelectItem>
                      <SelectItem value="2">2 phòng</SelectItem>
                      <SelectItem value="3">3 phòng</SelectItem>
                      <SelectItem value="4">4+ phòng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Số phòng tắm</Label>
                  <Select value={filterBaths} onValueChange={setFilterBaths}>
                    <SelectTrigger className="border-gray-200 dark:border-gray-700">
                      <SelectValue placeholder="Chọn số PT" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="1">1 phòng</SelectItem>
                      <SelectItem value="2">2 phòng</SelectItem>
                      <SelectItem value="3">3+ phòng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 bg-transparent"
                  >
                    Xóa bộ lọc
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Khoảng giá (VND): {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
                  </Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={100000000}
                    min={0}
                    step={1000000}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Diện tích (m²): {areaRange[0]} - {areaRange[1]}
                  </Label>
                  <Slider
                    value={areaRange}
                    onValueChange={setAreaRange}
                    max={500}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </>
  )
}
