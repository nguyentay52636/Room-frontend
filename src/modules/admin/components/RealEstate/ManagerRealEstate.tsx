
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import {
    Search,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    MapPin,
    Star,
    Bed,
    Bath,
    Square,
    Home,
    DollarSign,
    Building,
    Users,
    SlidersHorizontal,
    Calendar,
    User,
} from "lucide-react"
import { DialogAddManagerRealEstate } from "./components/Dialog/DialogAddManagerRealEstate"
import PaginationRealEstate from "./components/PaginationRealEstate"
import { properties } from "./components/Data/RealEstate"
import HeaderManagerRealEstate from "./components/HeaderManagerRealEstate"
import StatsCard from "./components/StatsCard"
import SearchFilterManagerRealEstate from "./components/SearchFilterManagerRealEstate"
import ListViewRealEstate from "./components/ListRealEstate/ListViewRealEstate"




export default function ManagerRealEstate() {
    const [searchQuery, setSearchQuery] = useState("")
    const [filterType, setFilterType] = useState("all")
    const [filterStatus, setFilterStatus] = useState("all")
    const [filterLocation, setFilterLocation] = useState("all")
    const [filterBeds, setFilterBeds] = useState("all")
    const [filterBaths, setFilterBaths] = useState("all")
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000000])
    const [areaRange, setAreaRange] = useState<[number, number]>([0, 500])
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogMode, setDialogMode] = useState<"add" | "edit" | "view">("add")
    const [selectedProperty, setSelectedProperty] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(12)
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [sortBy, setSortBy] = useState("newest")

    // Sample properties data


    const getStatusBadge = (status: string) => {
        switch (status) {
            case "available":
                return (
                    <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-sm">Có sẵn</Badge>
                )
            case "rented":
                return (
                    <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-sm">Đã thuê</Badge>
                )
            case "pending":
                return (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0 shadow-sm">
                        Chờ duyệt
                    </Badge>
                )
            case "maintenance":
                return <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-sm">Bảo trì</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    const getTypeLabel = (type: string) => {
        switch (type) {
            case "apartment":
                return "Căn hộ"
            case "house":
                return "Nhà riêng"
            case "condo":
                return "Chung cư"
            case "villa":
                return "Biệt thự"
            case "studio":
                return "Studio"
            case "townhouse":
                return "Nhà phố"
            default:
                return type
        }
    }

    const handleAddProperty = () => {
        setDialogMode("add")
        setSelectedProperty(null)
        setDialogOpen(true)
    }

    const handleEditProperty = (property: any) => {
        setDialogMode("edit")
        setSelectedProperty(property)
        setDialogOpen(true)
    }

    const handleViewProperty = (property: any) => {
        setDialogMode("view")
        setSelectedProperty(property)
        setDialogOpen(true)
    }

    const handleDeleteProperty = (id: number) => {
        if (confirm("Bạn có chắc chắn muốn xóa bất động sản này?")) {
            console.log("Deleting property:", id)
            // Add delete logic here
        }
    }

    const filteredProperties = properties.filter((property) => {
        const matchesSearch =
            property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.district.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesType = filterType === "all" || property.type === filterType
        const matchesStatus = filterStatus === "all" || property.status === filterStatus
        const matchesLocation = filterLocation === "all" || property.district === filterLocation
        const matchesBeds = filterBeds === "all" || property.beds.toString() === filterBeds
        const matchesBaths = filterBaths === "all" || property.baths.toString() === filterBaths
        const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1]
        const matchesArea = property.area >= areaRange[0] && property.area <= areaRange[1]

        return (
            matchesSearch &&
            matchesType &&
            matchesStatus &&
            matchesLocation &&
            matchesBeds &&
            matchesBaths &&
            matchesPrice &&
            matchesArea
        )
    })

    // Sort properties
    const sortedProperties = [...filteredProperties].sort((a, b) => {
        switch (sortBy) {
            case "newest":
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            case "oldest":
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            case "price-high":
                return b.price - a.price
            case "price-low":
                return a.price - b.price
            case "area-large":
                return b.area - a.area
            case "area-small":
                return a.area - b.area
            case "rating":
                return b.rating - a.rating
            default:
                return 0
        }
    })

    // Pagination calculations
    const totalItems = sortedProperties.length
    const totalPages = Math.ceil(totalItems / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const paginatedProperties = sortedProperties.slice(startIndex, endIndex)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const clearFilters = () => {
        setSearchQuery("")
        setFilterType("all")
        setFilterStatus("all")
        setFilterLocation("all")
        setFilterBeds("all")
        setFilterBaths("all")
        setPriceRange([0, 100000000])
        setAreaRange([0, 500])
        setSortBy("newest")
    }

    // Get unique districts for filter
    const uniqueDistricts = [...new Set(properties.map((p) => p.district))]

    // Stats data for mapping
    const statsData = [
        {
            title: "Tổng BĐS",
            value: properties.length,
            subtitle: "+12% tháng này",
            icon: <Building className="h-8 w-8" />,
            iconBgColor: "bg-blue-50 dark:bg-blue-900/30",
            iconColor: "text-blue-600 dark:text-blue-400",
            subtitleColor: "text-green-600"
        },
        {
            title: "Có sẵn",
            value: properties.filter((p) => p.status === "available").length,
            subtitle: `${Math.round((properties.filter((p) => p.status === "available").length / properties.length) * 100)}% tổng số`,
            icon: <Home className="h-8 w-8" />,
            iconBgColor: "bg-green-50 dark:bg-green-900/30",
            iconColor: "text-green-600 dark:text-green-400",
            subtitleColor: "text-green-600"
        },
        {
            title: "Đã thuê",
            value: properties.filter((p) => p.status === "rented").length,
            subtitle: `${Math.round((properties.filter((p) => p.status === "rented").length / properties.length) * 100)}% tổng số`,
            icon: <Users className="h-8 w-8" />,
            iconBgColor: "bg-blue-50 dark:bg-blue-900/30",
            iconColor: "text-blue-600 dark:text-blue-400",
            subtitleColor: "text-blue-600"
        },
        {
            title: "Giá trung bình",
            value: `${Math.round(properties.reduce((sum, p) => sum + p.price, 0) / properties.length / 1000000)}M`,
            subtitle: "VND/tháng",
            icon: <DollarSign className="h-8 w-8" />,
            iconBgColor: "bg-purple-50 dark:bg-purple-900/30",
            iconColor: "text-purple-600 dark:text-purple-400",
            subtitleColor: "text-purple-600"
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="p-6 space-y-8">
                <HeaderManagerRealEstate viewMode={viewMode} setViewMode={setViewMode} totalItems={totalItems} handleAddProperty={handleAddProperty} />


                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsData.map((stat, index) => (
                        <StatsCard
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            subtitle={stat.subtitle}
                            icon={stat.icon}
                            iconBgColor={stat.iconBgColor}
                            iconColor={stat.iconColor}
                            subtitleColor={stat.subtitleColor}
                        />
                    ))}
                </div>

                {/* Search and Filters */}
                <SearchFilterManagerRealEstate
                    uniqueDistricts={uniqueDistricts}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    filterType={filterType}
                    setFilterType={setFilterType}
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    filterLocation={filterLocation}
                    setFilterLocation={setFilterLocation}
                    filterBeds={filterBeds}
                    setFilterBeds={setFilterBeds}
                    filterBaths={filterBaths}
                    setFilterBaths={setFilterBaths}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    areaRange={areaRange}
                    setAreaRange={setAreaRange}
                    showAdvancedFilters={showAdvancedFilters}
                    setShowAdvancedFilters={setShowAdvancedFilters}
                    clearFilters={clearFilters}
                />

                {/* Properties Display */}
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
                    />
                </Card>
                {/* <ListViewRealEstate
                        paginatedProperties={paginatedProperties}
                        totalItems={totalItems}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                        clearFilters={clearFilters}
                        viewMode={viewMode}
                        searchQuery={searchQuery}
                        filterType={filterType}
                        filterStatus={filterStatus}
                        filterLocation={filterLocation}
                        filterBeds={filterBeds}
                        filterBaths={filterBaths}
                        priceRange={priceRange}
                        areaRange={areaRange}
                        showAdvancedFilters={showAdvancedFilters}
                        setShowAdvancedFilters={setShowAdvancedFilters}
                        handleViewProperty={handleViewProperty}
                        handleEditProperty={handleEditProperty}
                        handleDeleteProperty={handleDeleteProperty}
                        
                    /> */}
            </div>

            <DialogAddManagerRealEstate open={dialogOpen} onOpenChange={setDialogOpen} property={selectedProperty} mode={dialogMode} />
        </div>
    )
}
