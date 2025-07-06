
import { useState } from "react"

import { Badge } from "@/components/ui/badge"

import {

    Home,
    DollarSign,
    Building,
    Users,

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



                <ListViewRealEstate
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
                    getTypeLabel={getTypeLabel}
                    getStatusBadge={getStatusBadge}

                />
            </div>

            <DialogAddManagerRealEstate open={dialogOpen} onOpenChange={setDialogOpen} property={selectedProperty} mode={dialogMode} />
        </div>
    )
}
