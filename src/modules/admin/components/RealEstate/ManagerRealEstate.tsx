
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
    Plus,
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
    TrendingUp,
    DollarSign,
    Building,
    Users,
    SlidersHorizontal,
    Grid3X3,
    List,
    Calendar,
    User,
} from "lucide-react"
import { DialogAddManagerRealEstate } from "./components/Dialog/DialogAddManagerRealEstate"
import PaginationRealEstate from "./components/PaginationRealEstate"




export default function ManagerRealEstate() {
    const [searchQuery, setSearchQuery] = useState("")
    const [filterType, setFilterType] = useState("all")
    const [filterStatus, setFilterStatus] = useState("all")
    const [filterLocation, setFilterLocation] = useState("all")
    const [filterBeds, setFilterBeds] = useState("all")
    const [filterBaths, setFilterBaths] = useState("all")
    const [priceRange, setPriceRange] = useState([0, 100000000])
    const [areaRange, setAreaRange] = useState([0, 500])
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogMode, setDialogMode] = useState<"add" | "edit" | "view">("add")
    const [selectedProperty, setSelectedProperty] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(12)
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [sortBy, setSortBy] = useState("newest")

    // Sample properties data
    const properties = [
        {
            id: 1,
            title: "Golden Ridge Luxury Apartment",
            location: "123 Nguyễn Huệ, Quận 1, TP.HCM",
            district: "Quận 1",
            city: "TP.HCM",
            price: 25000000,
            currency: "VND",
            type: "apartment",
            status: "available",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
            beds: 3,
            baths: 2,
            area: 120,
            description:
                "Căn hộ cao cấp với view thành phố tuyệt đẹp, đầy đủ nội thất hiện đại, gần trung tâm thương mại và các tiện ích công cộng",
            amenities: ["Hồ bơi", "Gym", "Parking", "Security 24/7", "Balcony", "Air Conditioning", "Elevator"],
            owner: "Nguyễn Văn Minh",
            ownerPhone: "0901234567",
            ownerEmail: "nguyenvanminh@email.com",
            createdAt: "2024-01-15",
            updatedAt: "2024-01-20",
            views: 245,
            yearBuilt: 2020,
            floor: 15,
            totalFloors: 25,
            furnished: true,
            petAllowed: false,
            images: [
                "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400&h=300&fit=crop"
            ],
        },
        {
            id: 2,
            title: "Riverstone Estate Villa",
            location: "456 Đường Thảo Điền, Quận 2, TP.HCM",
            district: "Quận 2",
            city: "TP.HCM",
            price: 45000000,
            currency: "VND",
            type: "villa",
            status: "rented",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400&h=300&fit=crop",
            beds: 5,
            baths: 4,
            area: 300,
            description:
                "Biệt thự sang trọng bên sông với khu vườn riêng, garage 2 xe, không gian sống rộng rãi cho gia đình lớn",
            amenities: ["Private Garden", "Garage", "River View", "BBQ Area", "Swimming Pool", "Maid Room", "Wine Cellar"],
            owner: "Trần Thị Hương",
            ownerPhone: "0902345678",
            ownerEmail: "tranthihuong@email.com",
            createdAt: "2024-01-10",
            updatedAt: "2024-01-18",
            views: 189,
            yearBuilt: 2019,
            floor: 1,
            totalFloors: 3,
            furnished: true,
            petAllowed: true,
            images: [
                "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?w=400&h=300&fit=crop"
            ],
        },
        {
            id: 3,
            title: "Ocean Breeze Condo",
            location: "789 Nguyễn Văn Linh, Quận 7, TP.HCM",
            district: "Quận 7",
            city: "TP.HCM",
            price: 18000000,
            currency: "VND",
            type: "condo",
            status: "pending",
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=300&fit=crop",
            beds: 2,
            baths: 2,
            area: 85,
            description: "Căn hộ chung cư hiện đại với view biển, gần khu vui chơi giải trí và trung tâm thương mại lớn",
            amenities: ["Ocean View", "Gym", "Parking", "Playground", "Shopping Mall", "Spa", "Tennis Court"],
            owner: "Lê Văn Đức",
            ownerPhone: "0903456789",
            ownerEmail: "levanduc@email.com",
            createdAt: "2024-01-05",
            updatedAt: "2024-01-15",
            views: 312,
            yearBuilt: 2021,
            floor: 8,
            totalFloors: 20,
            furnished: false,
            petAllowed: true,
            images: [
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400&h=300&fit=crop",
                "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=400&h=300&fit=crop"
            ],
        },
        {
            id: 4,
            title: "Lakeside Retreat House",
            location: "321 Võ Văn Tần, Quận 3, TP.HCM",
            district: "Quận 3",
            city: "TP.HCM",
            price: 22000000,
            currency: "VND",
            type: "house",
            status: "available",
            rating: 4.6,
            image: "/placeholder.svg?height=300&width=400&text=Lakeside+House",
            beds: 4,
            baths: 3,
            area: 180,
            description: "Nhà riêng yên tĩnh gần hồ với không gian xanh mát, phù hợp cho gia đình yêu thích sự riêng tư",
            amenities: ["Lake View", "Garden", "Parking", "Terrace", "Fireplace", "Study Room", "Storage"],
            owner: "Phạm Thị Mai",
            ownerPhone: "0904567890",
            ownerEmail: "phamthimai@email.com",
            createdAt: "2024-01-01",
            updatedAt: "2024-01-12",
            views: 156,
            yearBuilt: 2018,
            floor: 1,
            totalFloors: 2,
            furnished: true,
            petAllowed: false,
            images: [
                "/placeholder.svg?height=300&width=400&text=House+Front+View",
                "/placeholder.svg?height=300&width=400&text=Lake+View+Terrace",
                "/placeholder.svg?height=300&width=400&text=Cozy+Interior",
                "/placeholder.svg?height=300&width=400&text=Beautiful+Garden",
            ],
        },
        {
            id: 5,
            title: "Downtown Studio Apartment",
            location: "567 Lê Lợi, Quận 1, TP.HCM",
            district: "Quận 1",
            city: "TP.HCM",
            price: 12000000,
            currency: "VND",
            type: "studio",
            status: "available",
            rating: 4.5,
            image: "/placeholder.svg?height=300&width=400&text=Downtown+Studio",
            beds: 1,
            baths: 1,
            area: 45,
            description: "Studio hiện đại ngay trung tâm thành phố, tiện lợi đi lại, phù hợp cho người trẻ và dân văn phòng",
            amenities: ["City Center", "Metro Station", "Restaurants", "Shopping", "Wifi", "Laundry", "Concierge"],
            owner: "Hoàng Văn Nam",
            ownerPhone: "0905678901",
            ownerEmail: "hoangvannam@email.com",
            createdAt: "2023-12-20",
            updatedAt: "2024-01-08",
            views: 89,
            yearBuilt: 2022,
            floor: 5,
            totalFloors: 10,
            furnished: true,
            petAllowed: false,
            images: [
                "/placeholder.svg?height=300&width=400&text=Compact+Studio+Space",
                "/placeholder.svg?height=300&width=400&text=Efficient+Kitchen",
                "/placeholder.svg?height=300&width=400&text=Modern+Bathroom",
                "/placeholder.svg?height=300&width=400&text=City+Skyline+View",
            ],
        },
        {
            id: 6,
            title: "Family Townhouse Complex",
            location: "890 Đường D2, Quận 9, TP.HCM",
            district: "Quận 9",
            city: "TP.HCM",
            price: 28000000,
            currency: "VND",
            type: "townhouse",
            status: "maintenance",
            rating: 4.4,
            image: "/placeholder.svg?height=300&width=400&text=Family+Townhouse",
            beds: 4,
            baths: 3,
            area: 200,
            description:
                "Nhà phố rộng rãi trong khu compound an ninh, có sân vườn và garage, môi trường sống lý tưởng cho gia đình",
            amenities: ["Compound Security", "Garden", "Garage", "Rooftop", "Storage", "Laundry Room", "Playground"],
            owner: "Võ Thị Lan",
            ownerPhone: "0906789012",
            ownerEmail: "vothilan@email.com",
            createdAt: "2023-12-15",
            updatedAt: "2024-01-05",
            views: 203,
            yearBuilt: 2017,
            floor: 1,
            totalFloors: 3,
            furnished: false,
            petAllowed: true,
            images: [
                "/placeholder.svg?height=300&width=400&text=Townhouse+Exterior",
                "/placeholder.svg?height=300&width=400&text=Spacious+Living+Room",
                "/placeholder.svg?height=300&width=400&text=Modern+Kitchen+Design",
                "/placeholder.svg?height=300&width=400&text=Rooftop+Garden",
            ],
        },
        {
            id: 7,
            title: "Saigon Pearl Luxury Condo",
            location: "92 Nguyễn Hữu Cảnh, Bình Thạnh, TP.HCM",
            district: "Bình Thạnh",
            city: "TP.HCM",
            price: 35000000,
            currency: "VND",
            type: "condo",
            status: "available",
            rating: 4.9,
            image: "/placeholder.svg?height=300&width=400&text=Saigon+Pearl+Luxury",
            beds: 3,
            baths: 2,
            area: 140,
            description: "Căn hộ cao cấp tại dự án Saigon Pearl với đầy đủ tiện ích 5 sao, view sông Sài Gòn tuyệt đẹp",
            amenities: ["River View", "5-Star Facilities", "Infinity Pool", "Sky Bar", "Valet Parking", "Concierge", "Spa"],
            owner: "Đặng Minh Tuấn",
            ownerPhone: "0907890123",
            ownerEmail: "dangminhtuan@email.com",
            createdAt: "2024-01-20",
            updatedAt: "2024-01-25",
            views: 445,
            yearBuilt: 2023,
            floor: 22,
            totalFloors: 36,
            furnished: true,
            petAllowed: false,
            images: [
                "/placeholder.svg?height=300&width=400&text=Luxury+Living+Room",
                "/placeholder.svg?height=300&width=400&text=Saigon+River+View",
                "/placeholder.svg?height=300&width=400&text=Premium+Kitchen",
                "/placeholder.svg?height=300&width=400&text=Master+Suite",
            ],
        },
        {
            id: 8,
            title: "Cozy Garden House",
            location: "15 Đường Số 10, Quận 2, TP.HCM",
            district: "Quận 2",
            city: "TP.HCM",
            price: 16000000,
            currency: "VND",
            type: "house",
            status: "rented",
            rating: 4.3,
            image: "/placeholder.svg?height=300&width=400&text=Cozy+Garden+House",
            beds: 3,
            baths: 2,
            area: 110,
            description:
                "Nhà vườn nhỏ xinh với không gian xanh mát, phù hợp cho những ai yêu thích cuộc sống gần gũi với thiên nhiên",
            amenities: ["Large Garden", "Fruit Trees", "Parking", "Outdoor Kitchen", "Pet Area", "Storage Shed"],
            owner: "Bùi Văn Hòa",
            ownerPhone: "0908901234",
            ownerEmail: "buivanhoa@email.com",
            createdAt: "2023-11-30",
            updatedAt: "2024-01-03",
            views: 167,
            yearBuilt: 2015,
            floor: 1,
            totalFloors: 1,
            furnished: false,
            petAllowed: true,
            images: [
                "/placeholder.svg?height=300&width=400&text=Garden+House+Front",
                "/placeholder.svg?height=300&width=400&text=Lush+Garden+Area",
                "/placeholder.svg?height=300&width=400&text=Simple+Interior",
                "/placeholder.svg?height=300&width=400&text=Outdoor+Space",
            ],
        },
        {
            id: 9,
            title: "Modern Penthouse Suite",
            location: "88 Đồng Khởi, Quận 1, TP.HCM",
            district: "Quận 1",
            city: "TP.HCM",
            price: 65000000,
            currency: "VND",
            type: "apartment",
            status: "available",
            rating: 5.0,
            image: "/placeholder.svg?height=300&width=400&text=Modern+Penthouse",
            beds: 4,
            baths: 3,
            area: 250,
            description: "Penthouse đẳng cấp với thiết kế hiện đại, sân thượng riêng, view 360 độ toàn thành phố",
            amenities: [
                "Private Rooftop",
                "360° City View",
                "Jacuzzi",
                "Wine Cellar",
                "Smart Home",
                "Private Elevator",
                "Butler Service",
            ],
            owner: "Lý Thành Công",
            ownerPhone: "0909012345",
            ownerEmail: "lythanhcong@email.com",
            createdAt: "2024-01-25",
            updatedAt: "2024-01-28",
            views: 678,
            yearBuilt: 2024,
            floor: 35,
            totalFloors: 35,
            furnished: true,
            petAllowed: false,
            images: [
                "/placeholder.svg?height=300&width=400&text=Penthouse+Living",
                "/placeholder.svg?height=300&width=400&text=Private+Rooftop",
                "/placeholder.svg?height=300&width=400&text=Panoramic+View",
                "/placeholder.svg?height=300&width=400&text=Luxury+Bedroom",
            ],
        },
        {
            id: 10,
            title: "Student Housing Complex",
            location: "234 Võ Văn Ngân, Thủ Đức, TP.HCM",
            district: "Thủ Đức",
            city: "TP.HCM",
            price: 8000000,
            currency: "VND",
            type: "studio",
            status: "available",
            rating: 4.2,
            image: "/placeholder.svg?height=300&width=400&text=Student+Housing",
            beds: 1,
            baths: 1,
            area: 35,
            description:
                "Căn hộ mini dành cho sinh viên, gần các trường đại học, đầy đủ tiện nghi cơ bản với giá cả phải chăng",
            amenities: ["Near Universities", "Study Area", "Shared Kitchen", "Laundry", "Wifi", "Security", "Bike Parking"],
            owner: "Ngô Thị Hạnh",
            ownerPhone: "0910123456",
            ownerEmail: "ngothihanh@email.com",
            createdAt: "2023-12-01",
            updatedAt: "2024-01-10",
            views: 234,
            yearBuilt: 2020,
            floor: 3,
            totalFloors: 8,
            furnished: true,
            petAllowed: false,
            images: [
                "/placeholder.svg?height=300&width=400&text=Compact+Student+Room",
                "/placeholder.svg?height=300&width=400&text=Study+Desk+Area",
                "/placeholder.svg?height=300&width=400&text=Shared+Facilities",
                "/placeholder.svg?height=300&width=400&text=Building+Exterior",
            ],
        },
        {
            id: 11,
            title: "Executive Business Suite",
            location: "77 Hàm Nghi, Quận 1, TP.HCM",
            district: "Quận 1",
            city: "TP.HCM",
            price: 42000000,
            currency: "VND",
            type: "apartment",
            status: "pending",
            rating: 4.8,
            image: "/placeholder.svg?height=300&width=400&text=Executive+Suite",
            beds: 2,
            baths: 2,
            area: 95,
            description:
                "Căn hộ dành cho doanh nhân với không gian làm việc riêng, gần trung tâm tài chính và các tòa nhà văn phòng",
            amenities: [
                "Business Center",
                "Meeting Room",
                "High-Speed Internet",
                "Printer Access",
                "Concierge",
                "Valet",
                "Gym",
            ],
            owner: "Trương Văn Thành",
            ownerPhone: "0911234567",
            ownerEmail: "truongvanthanh@email.com",
            createdAt: "2024-01-12",
            updatedAt: "2024-01-22",
            views: 356,
            yearBuilt: 2021,
            floor: 18,
            totalFloors: 30,
            furnished: true,
            petAllowed: false,
            images: [
                "/placeholder.svg?height=300&width=400&text=Executive+Living",
                "/placeholder.svg?height=300&width=400&text=Home+Office+Space",
                "/placeholder.svg?height=300&width=400&text=Business+Amenities",
                "/placeholder.svg?height=300&width=400&text=City+Business+View",
            ],
        },
        {
            id: 12,
            title: "Riverside Family Villa",
            location: "456 Đường Riverside, Quận 7, TP.HCM",
            district: "Quận 7",
            city: "TP.HCM",
            price: 55000000,
            currency: "VND",
            type: "villa",
            status: "maintenance",
            rating: 4.7,
            image: "/placeholder.svg?height=300&width=400&text=Riverside+Villa",
            beds: 6,
            baths: 5,
            area: 400,
            description: "Biệt thự ven sông với không gian sống rộng lớn, bến thuyền riêng, khu vườn nhiệt đới và hồ bơi",
            amenities: [
                "Private Dock",
                "Tropical Garden",
                "Swimming Pool",
                "Guest House",
                "3-Car Garage",
                "Wine Room",
                "Gym",
            ],
            owner: "Phan Thị Ngọc",
            ownerPhone: "0912345678",
            ownerEmail: "phanthingoc@email.com",
            createdAt: "2023-11-15",
            updatedAt: "2024-01-01",
            views: 289,
            yearBuilt: 2016,
            floor: 1,
            totalFloors: 2,
            furnished: true,
            petAllowed: true,
            images: [
                "/placeholder.svg?height=300&width=400&text=Villa+Riverside+View",
                "/placeholder.svg?height=300&width=400&text=Private+Dock",
                "/placeholder.svg?height=300&width=400&text=Tropical+Garden",
                "/placeholder.svg?height=300&width=400&text=Luxury+Pool+Area",
            ],
        },
    ]

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

    const handleRowsPerPageChange = (rows: number) => {
        setRowsPerPage(rows)
        setCurrentPage(1)
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

    const uniqueDistricts = [...new Set(properties.map((p) => p.district))]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="p-6 space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Building className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                                    Quản lý Bất động sản
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Quản lý và theo dõi tất cả bất động sản trong hệ thống ({totalItems} bất động sản)
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                            <Button
                                variant={viewMode === "grid" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setViewMode("grid")}
                                className="h-9"
                            >
                                <Grid3X3 className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === "list" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setViewMode("list")}
                                className="h-9"
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                        <Button
                            onClick={handleAddProperty}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Thêm bất động sản
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng BĐS</p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{properties.length}</p>
                                    <p className="text-sm text-green-600 flex items-center">
                                        <TrendingUp className="h-3 w-3 mr-1" />
                                        +12% tháng này
                                    </p>
                                </div>
                                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/30 group-hover:scale-110 transition-transform duration-300">
                                    <Building className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Có sẵn</p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                        {properties.filter((p) => p.status === "available").length}
                                    </p>
                                    <p className="text-sm text-green-600 flex items-center">
                                        <TrendingUp className="h-3 w-3 mr-1" />
                                        {Math.round((properties.filter((p) => p.status === "available").length / properties.length) * 100)}%
                                        tổng số
                                    </p>
                                </div>
                                <div className="p-4 rounded-2xl bg-green-50 dark:bg-green-900/30 group-hover:scale-110 transition-transform duration-300">
                                    <Home className="h-8 w-8 text-green-600 dark:text-green-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Đã thuê</p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                        {properties.filter((p) => p.status === "rented").length}
                                    </p>
                                    <p className="text-sm text-blue-600 flex items-center">
                                        <Users className="h-3 w-3 mr-1" />
                                        {Math.round((properties.filter((p) => p.status === "rented").length / properties.length) * 100)}%
                                        tổng số
                                    </p>
                                </div>
                                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/30 group-hover:scale-110 transition-transform duration-300">
                                    <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Giá trung bình</p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                        {Math.round(properties.reduce((sum, p) => sum + p.price, 0) / properties.length / 1000000)}M
                                    </p>
                                    <p className="text-sm text-purple-600 flex items-center">
                                        <DollarSign className="h-3 w-3 mr-1" />
                                        VND/tháng
                                    </p>
                                </div>
                                <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-900/30 group-hover:scale-110 transition-transform duration-300">
                                    <DollarSign className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search and Filters */}
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
            </div>

            <DialogAddManagerRealEstate open={dialogOpen} onOpenChange={setDialogOpen} property={selectedProperty} mode={dialogMode} />
        </div>
    )
}
