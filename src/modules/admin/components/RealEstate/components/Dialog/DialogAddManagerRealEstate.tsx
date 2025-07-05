
import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
    Building,
    MapPin,
    DollarSign,
    Home,
    Bed,
    Bath,
    Square,
    Upload,
    Star,
    User,
    FileText,
    X,
    Camera,
    Plus,
    Phone,
    Mail,
    Calendar,
    Eye,
    Layers,
    PawPrint,
    Sofa,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"

interface PropertyDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    property?: any
    mode: "add" | "edit" | "view"
}

interface FormData {
    title: string
    location: string
    district: string
    city: string
    price: string
    currency: string
    type: string
    status: string
    beds: string
    baths: string
    area: string
    description: string
    owner: string
    ownerPhone: string
    ownerEmail: string
    amenities: string[]
    images: string[]
    yearBuilt: string
    floor: string
    totalFloors: string
    furnished: boolean
    petAllowed: boolean
}

const initialFormData: FormData = {
    title: "",
    location: "",
    district: "",
    city: "TP.HCM",
    price: "",
    currency: "VND",
    type: "apartment",
    status: "available",
    beds: "1",
    baths: "1",
    area: "",
    description: "",
    owner: "",
    ownerPhone: "",
    ownerEmail: "",
    amenities: [],
    images: [],
    yearBuilt: new Date().getFullYear().toString(),
    floor: "1",
    totalFloors: "1",
    furnished: false,
    petAllowed: false,
}

export function DialogAddManagerRealEstate({ open, onOpenChange, property, mode }: PropertyDialogProps) {
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
    const [newAmenity, setNewAmenity] = useState("")
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const isReadOnly = mode === "view"

    useEffect(() => {
        if (property) {
            setFormData({
                title: property.title || "",
                location: property.location || "",
                district: property.district || "",
                city: property.city || "TP.HCM",
                price: property.price?.toString() || "",
                currency: property.currency || "VND",
                type: property.type || "apartment",
                status: property.status || "available",
                beds: property.beds?.toString() || "1",
                baths: property.baths?.toString() || "1",
                area: property.area?.toString() || "",
                description: property.description || "",
                owner: property.owner || "",
                ownerPhone: property.ownerPhone || "",
                ownerEmail: property.ownerEmail || "",
                amenities: property.amenities || [],
                images: property.images || [property.image || ""],
                yearBuilt: property.yearBuilt?.toString() || new Date().getFullYear().toString(),
                floor: property.floor?.toString() || "1",
                totalFloors: property.totalFloors?.toString() || "1",
                furnished: property.furnished || false,
                petAllowed: property.petAllowed || false,
            })
            setErrors({})
            setCurrentImageIndex(0)
        } else if (mode === "add") {
            setFormData(initialFormData)
            setErrors({})
            setCurrentImageIndex(0)
        }
    }, [property, mode])

    const handleInputChange = (field: keyof FormData, value: string | string[] | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {}

        if (!formData.title.trim()) newErrors.title = "Tên bất động sản là bắt buộc"
        if (!formData.location.trim()) newErrors.location = "Địa điểm là bắt buộc"
        if (!formData.district.trim()) newErrors.district = "Quận/Huyện là bắt buộc"
        if (!formData.price.trim()) {
            newErrors.price = "Giá là bắt buộc"
        } else if (Number.parseInt(formData.price) <= 0) {
            newErrors.price = "Giá phải lớn hơn 0"
        }
        if (!formData.area.trim()) {
            newErrors.area = "Diện tích là bắt buộc"
        } else if (Number.parseInt(formData.area) <= 0) {
            newErrors.area = "Diện tích phải lớn hơn 0"
        }
        if (!formData.owner.trim()) newErrors.owner = "Chủ sở hữu là bắt buộc"
        if (!formData.ownerPhone.trim()) {
            newErrors.ownerPhone = "Số điện thoại là bắt buộc"
        } else if (!/^[0-9]{10,11}$/.test(formData.ownerPhone.replace(/\s/g, ""))) {
            newErrors.ownerPhone = "Số điện thoại không hợp lệ"
        }
        if (!formData.ownerEmail.trim()) {
            newErrors.ownerEmail = "Email là bắt buộc"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.ownerEmail)) {
            newErrors.ownerEmail = "Email không hợp lệ"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (validateForm()) {
            console.log("Submitting property:", formData)
            onOpenChange(false)
        }
    }

    const addAmenity = () => {
        if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
            handleInputChange("amenities", [...formData.amenities, newAmenity.trim()])
            setNewAmenity("")
        }
    }

    const removeAmenity = (amenity: string) => {
        handleInputChange(
            "amenities",
            formData.amenities.filter((a) => a !== amenity),
        )
    }

    const getDialogTitle = () => {
        switch (mode) {
            case "add":
                return "Thêm bất động sản mới"
            case "edit":
                return "Chỉnh sửa bất động sản"
            case "view":
                return "Chi tiết bất động sản"
            default:
                return ""
        }
    }

    const getDialogDescription = () => {
        switch (mode) {
            case "add":
                return "Tạo bất động sản mới trong hệ thống"
            case "edit":
                return "Cập nhật thông tin bất động sản"
            case "view":
                return `ID: #${property?.id || "N/A"} • Tạo: ${property?.createdAt ? new Date(property.createdAt).toLocaleDateString("vi-VN") : "N/A"} • Cập nhật: ${property?.updatedAt ? new Date(property.updatedAt).toLocaleDateString("vi-VN") : "N/A"}`
            default:
                return ""
        }
    }

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

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % formData.images.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + formData.images.length) % formData.images.length)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
            <DialogContent className=" overflow-hidden p-0 gap-0 bg-white dark:bg-gray-900 sm:max-w-6xl sm:max-h-[95vh]! ">
                {/* Header */}
                <DialogHeader className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                                <Building className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                    {getDialogTitle()}
                                </DialogTitle>
                                <DialogDescription className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {getDialogDescription()}
                                </DialogDescription>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            {mode === "view" && property && (
                                <div className="flex items-center space-x-2">
                                    <div className="flex items-center space-x-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-full">
                                        <Star className="h-3 w-3 text-yellow-500" />
                                        <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">{property.rating}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full">
                                        <Eye className="h-3 w-3 text-blue-500" />
                                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{property.views}</span>
                                    </div>
                                </div>
                            )}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onOpenChange(false)}
                                className="h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </DialogHeader>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(95vh-140px)]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                        {/* Left Column - Images and Basic Info */}
                        <div className="space-y-6">
                            {/* Image Gallery */}
                            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        <Camera className="h-5 w-5 text-blue-600" />
                                        <span>Hình ảnh ({formData.images.length})</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {formData.images.length > 0 ? (
                                        <div className="space-y-4">
                                            {/* Main Image */}
                                            <div className="relative group">
                                                <img
                                                    src={formData.images[currentImageIndex] || "/placeholder.svg?height=300&width=400"}
                                                    alt={`Property ${currentImageIndex + 1}`}
                                                    className="w-full h-64 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                                                />
                                                {formData.images.length > 1 && (
                                                    <>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                            onClick={prevImage}
                                                        >
                                                            <ChevronLeft className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                            onClick={nextImage}
                                                        >
                                                            <ChevronRight className="h-4 w-4" />
                                                        </Button>
                                                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                                                            {currentImageIndex + 1} / {formData.images.length}
                                                        </div>
                                                    </>
                                                )}
                                                {!isReadOnly && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute top-2 right-2 h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                        onClick={() => {
                                                            const newImages = formData.images.filter((_, i) => i !== currentImageIndex)
                                                            handleInputChange("images", newImages)
                                                            if (currentImageIndex >= newImages.length && newImages.length > 0) {
                                                                setCurrentImageIndex(newImages.length - 1)
                                                            }
                                                        }}
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                )}
                                            </div>

                                            {/* Thumbnail Strip */}
                                            {formData.images.length > 1 && (
                                                <div className="flex space-x-2 overflow-x-auto">
                                                    {formData.images.map((image, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => setCurrentImageIndex(index)}
                                                            className={`flex-shrink-0 w-16 h-12 rounded border-2 overflow-hidden ${index === currentImageIndex ? "border-blue-500" : "border-gray-200 dark:border-gray-700"
                                                                }`}
                                                        >
                                                            <img
                                                                src={image || "/placeholder.svg?height=48&width=64"}
                                                                alt={`Thumbnail ${index + 1}`}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                                            <div className="text-center">
                                                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                                <p className="text-sm text-gray-500">Chưa có hình ảnh</p>
                                            </div>
                                        </div>
                                    )}

                                    {!isReadOnly && (
                                        <div className="w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center hover:border-blue-400 transition-colors cursor-pointer">
                                            <div className="text-center">
                                                <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                                                <p className="text-sm text-gray-500">Thêm ảnh</p>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Basic Information */}
                            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center justify-between text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        <div className="flex items-center space-x-2">
                                            <Home className="h-5 w-5 text-green-600" />
                                            <span>Thông tin cơ bản</span>
                                        </div>
                                        {isReadOnly && getStatusBadge(formData.status)}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Tên bất động sản *
                                        </Label>
                                        <div className="relative">
                                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="title"
                                                value={formData.title}
                                                onChange={(e) => handleInputChange("title", e.target.value)}
                                                placeholder="Golden Ridge Apartment"
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 ${errors.title ? "border-red-500 focus:border-red-500" : ""
                                                    }`}
                                                disabled={isReadOnly}
                                            />
                                            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="district" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Quận/Huyện *
                                            </Label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="district"
                                                    value={formData.district}
                                                    onChange={(e) => handleInputChange("district", e.target.value)}
                                                    placeholder="Quận 1"
                                                    className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 ${errors.district ? "border-red-500 focus:border-red-500" : ""
                                                        }`}
                                                    disabled={isReadOnly}
                                                />
                                                {errors.district && <p className="text-sm text-red-500 mt-1">{errors.district}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="city" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Thành phố
                                            </Label>
                                            <Select
                                                value={formData.city}
                                                onValueChange={(value) => handleInputChange("city", value)}
                                                disabled={isReadOnly}
                                            >
                                                <SelectTrigger className="h-11 border-gray-200 dark:border-gray-700">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="TP.HCM">TP. Hồ Chí Minh</SelectItem>
                                                    <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                                                    <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
                                                    <SelectItem value="Cần Thơ">Cần Thơ</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="location" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Địa chỉ đầy đủ *
                                        </Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="location"
                                                value={formData.location}
                                                onChange={(e) => handleInputChange("location", e.target.value)}
                                                placeholder="123 Đường ABC, Quận 1, TP.HCM"
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 ${errors.location ? "border-red-500 focus:border-red-500" : ""
                                                    }`}
                                                disabled={isReadOnly}
                                            />
                                            {errors.location && <p className="text-sm text-red-500 mt-1">{errors.location}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="price" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Giá thuê *
                                            </Label>
                                            <div className="flex space-x-2">
                                                <div className="relative flex-1">
                                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                    <Input
                                                        id="price"
                                                        type="number"
                                                        value={formData.price}
                                                        onChange={(e) => handleInputChange("price", e.target.value)}
                                                        placeholder="15000000"
                                                        className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 ${errors.price ? "border-red-500 focus:border-red-500" : ""
                                                            }`}
                                                        disabled={isReadOnly}
                                                    />
                                                </div>
                                                <Select
                                                    value={formData.currency}
                                                    onValueChange={(value) => handleInputChange("currency", value)}
                                                    disabled={isReadOnly}
                                                >
                                                    <SelectTrigger className="w-24 h-11 border-gray-200 dark:border-gray-700">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="VND">VND</SelectItem>
                                                        <SelectItem value="USD">USD</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="type" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Loại bất động sản
                                            </Label>
                                            <Select
                                                value={formData.type}
                                                onValueChange={(value) => handleInputChange("type", value)}
                                                disabled={isReadOnly}
                                            >
                                                <SelectTrigger className="h-11 border-gray-200 dark:border-gray-700">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="apartment">Căn hộ</SelectItem>
                                                    <SelectItem value="house">Nhà riêng</SelectItem>
                                                    <SelectItem value="condo">Chung cư</SelectItem>
                                                    <SelectItem value="villa">Biệt thự</SelectItem>
                                                    <SelectItem value="studio">Studio</SelectItem>
                                                    <SelectItem value="townhouse">Nhà phố</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    {!isReadOnly && (
                                        <div className="space-y-2">
                                            <Label htmlFor="status" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Trạng thái
                                            </Label>
                                            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                                                <SelectTrigger className="h-11 border-gray-200 dark:border-gray-700">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="available">Có sẵn</SelectItem>
                                                    <SelectItem value="rented">Đã thuê</SelectItem>
                                                    <SelectItem value="pending">Chờ duyệt</SelectItem>
                                                    <SelectItem value="maintenance">Bảo trì</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column - Details and Owner Info */}
                        <div className="space-y-6">
                            {/* Property Details */}
                            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        <Square className="h-5 w-5 text-purple-600" />
                                        <span>Chi tiết bất động sản</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="beds" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Phòng ngủ
                                            </Label>
                                            <div className="relative">
                                                <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="beds"
                                                    type="number"
                                                    value={formData.beds}
                                                    onChange={(e) => handleInputChange("beds", e.target.value)}
                                                    placeholder="2"
                                                    className="pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                                                    disabled={isReadOnly}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="baths" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Phòng tắm
                                            </Label>
                                            <div className="relative">
                                                <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="baths"
                                                    type="number"
                                                    value={formData.baths}
                                                    onChange={(e) => handleInputChange("baths", e.target.value)}
                                                    placeholder="2"
                                                    className="pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                                                    disabled={isReadOnly}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="area" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Diện tích (m²) *
                                            </Label>
                                            <div className="relative">
                                                <Square className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="area"
                                                    type="number"
                                                    value={formData.area}
                                                    onChange={(e) => handleInputChange("area", e.target.value)}
                                                    placeholder="120"
                                                    className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 ${errors.area ? "border-red-500 focus:border-red-500" : ""
                                                        }`}
                                                    disabled={isReadOnly}
                                                />
                                                {errors.area && <p className="text-sm text-red-500 mt-1">{errors.area}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="yearBuilt" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Năm xây dựng
                                            </Label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="yearBuilt"
                                                    type="number"
                                                    value={formData.yearBuilt}
                                                    onChange={(e) => handleInputChange("yearBuilt", e.target.value)}
                                                    placeholder="2020"
                                                    className="pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                                                    disabled={isReadOnly}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="floor" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Tầng
                                            </Label>
                                            <div className="relative">
                                                <Layers className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="floor"
                                                    type="number"
                                                    value={formData.floor}
                                                    onChange={(e) => handleInputChange("floor", e.target.value)}
                                                    placeholder="15"
                                                    className="pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                                                    disabled={isReadOnly}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="totalFloors" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Tổng số tầng
                                            </Label>
                                            <div className="relative">
                                                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="totalFloors"
                                                    type="number"
                                                    value={formData.totalFloors}
                                                    onChange={(e) => handleInputChange("totalFloors", e.target.value)}
                                                    placeholder="25"
                                                    className="pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                                                    disabled={isReadOnly}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                                            <div className="flex items-center space-x-2">
                                                <Sofa className="h-4 w-4 text-blue-600" />
                                                <span className="text-sm font-medium">Có nội thất</span>
                                            </div>
                                            <Switch
                                                checked={formData.furnished}
                                                onCheckedChange={(checked) => handleInputChange("furnished", checked)}
                                                disabled={isReadOnly}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                                            <div className="flex items-center space-x-2">
                                                <PawPrint className="h-4 w-4 text-green-600" />
                                                <span className="text-sm font-medium">Cho phép thú cưng</span>
                                            </div>
                                            <Switch
                                                checked={formData.petAllowed}
                                                onCheckedChange={(checked) => handleInputChange("petAllowed", checked)}
                                                disabled={isReadOnly}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Mô tả
                                        </Label>
                                        <div className="relative">
                                            <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Textarea
                                                id="description"
                                                value={formData.description}
                                                onChange={(e) => handleInputChange("description", e.target.value)}
                                                placeholder="Mô tả chi tiết về bất động sản..."
                                                rows={4}
                                                className="pl-10 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 resize-none"
                                                disabled={isReadOnly}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Owner Information */}
                            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        <User className="h-5 w-5 text-orange-600" />
                                        <span>Thông tin chủ sở hữu</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="owner" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Họ và tên *
                                        </Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="owner"
                                                value={formData.owner}
                                                onChange={(e) => handleInputChange("owner", e.target.value)}
                                                placeholder="Nguyễn Văn A"
                                                className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 ${errors.owner ? "border-red-500 focus:border-red-500" : ""
                                                    }`}
                                                disabled={isReadOnly}
                                            />
                                            {errors.owner && <p className="text-sm text-red-500 mt-1">{errors.owner}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="ownerPhone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Số điện thoại *
                                            </Label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="ownerPhone"
                                                    value={formData.ownerPhone}
                                                    onChange={(e) => handleInputChange("ownerPhone", e.target.value)}
                                                    placeholder="0901234567"
                                                    className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 ${errors.ownerPhone ? "border-red-500 focus:border-red-500" : ""
                                                        }`}
                                                    disabled={isReadOnly}
                                                />
                                                {errors.ownerPhone && <p className="text-sm text-red-500 mt-1">{errors.ownerPhone}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="ownerEmail" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Email *
                                            </Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    id="ownerEmail"
                                                    type="email"
                                                    value={formData.ownerEmail}
                                                    onChange={(e) => handleInputChange("ownerEmail", e.target.value)}
                                                    placeholder="owner@email.com"
                                                    className={`pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 ${errors.ownerEmail ? "border-red-500 focus:border-red-500" : ""
                                                        }`}
                                                    disabled={isReadOnly}
                                                />
                                                {errors.ownerEmail && <p className="text-sm text-red-500 mt-1">{errors.ownerEmail}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Amenities */}
                            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        <Star className="h-5 w-5 text-yellow-600" />
                                        <span>Tiện ích ({formData.amenities.length})</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {!isReadOnly && (
                                        <div className="flex space-x-2">
                                            <Input
                                                value={newAmenity}
                                                onChange={(e) => setNewAmenity(e.target.value)}
                                                placeholder="Thêm tiện ích..."
                                                className="flex-1 h-10 border-gray-200 dark:border-gray-700"
                                                onKeyPress={(e) => e.key === "Enter" && addAmenity()}
                                            />
                                            <Button onClick={addAmenity} size="sm" className="h-10 px-4">
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                    <div className="flex flex-wrap gap-2">
                                        {formData.amenities.map((amenity, index) => (
                                            <Badge key={index} variant="outline" className="border-gray-300 dark:border-gray-600 px-3 py-1">
                                                {amenity}
                                                {!isReadOnly && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-4 w-4 p-0 ml-2 hover:bg-red-100 dark:hover:bg-red-900/20"
                                                        onClick={() => removeAmenity(amenity)}
                                                    >
                                                        <X className="h-3 w-3 text-red-500" />
                                                    </Button>
                                                )}
                                            </Badge>
                                        ))}
                                    </div>
                                    {formData.amenities.length === 0 && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                                            Chưa có tiện ích nào được thêm
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <DialogFooter className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex justify-between items-center w-full">
                        {mode === "view" && property && (
                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center space-x-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>Tạo: {new Date(property.createdAt).toLocaleDateString("vi-VN")}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>Cập nhật: {new Date(property.updatedAt).toLocaleDateString("vi-VN")}</span>
                                </div>
                            </div>
                        )}
                        <div className="flex justify-end space-x-3 ml-auto">
                            <Button
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                className="px-6 h-10 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                {mode === "view" ? "Đóng" : "Hủy"}
                            </Button>
                            {mode !== "view" && (
                                <Button
                                    onClick={handleSubmit}
                                    className="px-6 h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm"
                                >
                                    {mode === "add" ? "Thêm bất động sản" : "Cập nhật"}
                                </Button>
                            )}
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
