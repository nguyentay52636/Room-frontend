
import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"

import {

    Home,
    DollarSign,
    Building,
    Users,

} from "lucide-react"
import { DialogAddManagerRealEstate } from "./components/Dialog/DialogAddManagerRealEstate"

import { properties } from "./components/Data/RealEstate"
import HeaderManagerRealEstate from "./components/HeaderManagerRealEstate"
import StatsCard from "./components/StatsCard"
import SearchFilterManagerRealEstate from "./components/SearchFilterManagerRealEstate"
import ListViewRealEstate from "./components/ListRealEstate/ListViewRealEstate"
import { BatDongSan } from "@/lib/apis/types"
import { getAllProperties } from "@/lib/apis/propertiesApi"




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
    const [batDongSans, setBatDongSans] = useState<BatDongSan[]>([])

    useEffect(() => {
        const fetchBatDongSans = async () => {
            const batDongSans = await getAllProperties();

            setBatDongSans(batDongSans);
        }
        fetchBatDongSans();
    }, [])


    const getStatusBadge = (status: string) => {
        switch (status) {
            case "dang_hoat_dong":
                return (
                    <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-sm">Có sẵn</Badge>
                )
            case "da_thue":
                return (
                    <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-sm">Đã thuê</Badge>
                )
            case "cho_duyet":
                return (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0 shadow-sm">
                        Chờ duyệt
                    </Badge>
                )
            case "bao_tri":
                return <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-sm">Bảo trì</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    const getTypeLabel = (type: string) => {
        switch (type) {
            case "can_ho":
                return "Căn hộ"
            case "nha_rieng":
                return "Nhà riêng"
            case "chung_cu":
                return "Chung cư"
            case "biet_thu":
                return "Biệt thự"
            case "studio":
                return "Studio"
            case "nha_pho":
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

    const filteredProperties = batDongSans.filter((property) => {
        const matchesSearch =
            property.tieuDe.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.diaChi.toLowerCase().includes(searchQuery.toLowerCase()) ||
            // property.nguoiDungId.ten.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.quanHuyen.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesType = filterType === "all" || property.loaiBds === filterType
        const matchesStatus = filterStatus === "all" || property.trangThai === filterStatus
        const matchesLocation = filterLocation === "all" || property.quanHuyen === filterLocation
        const matchesBeds = filterBeds === "all" || property.phongNgu.toString() === filterBeds
        const matchesBaths = filterBaths === "all" || property.phongTam.toString() === filterBaths
        const matchesPrice = property.gia >= priceRange[0] && property.gia <= priceRange[1]
        const matchesArea = property.dienTich >= areaRange[0] && property.dienTich <= areaRange[1]

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
            case "newest": {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA;
            }
            case "oldest": {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateA - dateB;
            }
            case "price-high":
                return b.gia - a.gia
            case "price-low":
                return a.gia - b.gia
            case "area-large":
                return b.dienTich - a.dienTich
            case "area-small":
                return a.dienTich - b.dienTich
            case "rating":
                return (b.overlay?.rating ?? 0) - (a.overlay?.rating ?? 0)
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
    const uniqueDistricts = [...new Set(batDongSans.map((p) => p.quanHuyen))]

    // Stats data for mapping
    const statsData = [
        {
            title: "Tổng BĐS",
            value: batDongSans.length,
            subtitle: "+12% tháng này",
            icon: <Building className="h-8 w-8" />,
            iconBgColor: "bg-blue-50 dark:bg-blue-900/30",
            iconColor: "text-blue-600 dark:text-blue-400",
            subtitleColor: "text-green-600"
        },
        {
            title: "Có sẵn",
            value: batDongSans.filter((p) => p.trangThai === "dang_hoat_dong").length,
            subtitle: `${Math.round((batDongSans.filter((p) => p.trangThai === "dang_hoat_dong").length / batDongSans.length) * 100)}% tổng số`,
            icon: <Home className="h-8 w-8" />,
            iconBgColor: "bg-green-50 dark:bg-green-900/30",
            iconColor: "text-green-600 dark:text-green-400",
            subtitleColor: "text-green-600"
        },
        {
            title: "Đã thuê",
            value: batDongSans.filter((p) => p.trangThai === "da_thue").length,
            subtitle: `${Math.round((batDongSans.filter((p) => p.trangThai === "da_thue").length / batDongSans.length) * 100)}% tổng số`,
            icon: <Users className="h-8 w-8" />,
            iconBgColor: "bg-blue-50 dark:bg-blue-900/30",
            iconColor: "text-blue-600 dark:text-blue-400",
            subtitleColor: "text-blue-600"
        },
        {
            title: "Giá trung bình",
            value: `${Math.round(batDongSans.reduce((sum, p) => sum + p.gia, 0) / batDongSans.length / 1000000)}M`,
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
