
import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
    Building,

    Bed,
    Bath,
    Square,
    FileText,
    Calendar,
    Eye,
    Layers,
    PawPrint,
    Sofa,
    Star,

} from "lucide-react"
import CardInfoUserDetailRealEstate from "./components/Card/CardInfoUserDetailRealEstate"
import CardAmenitiesManagerRealEstate from "./components/Card/CardAmenitiesManagerRealEstate"
import FooterDialogAddManagerRealEsate from "./components/Card/FooterDialogAddManagerRealEsate"

import CardLeftDialog from "./components/LeftDialog/CardLeftDialog"
import CardRightDialog from "./components/RightDialog/CardRightDialog"

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
    nguoiDungId: any // Changed from string to any to handle User object
}

const initialFormData: FormData = {
    title: "",
    location: "",
    district: "",
    city: "TP.HCM",
    price: "",
    currency: "VND",
    type: "can_ho",
    status: "dang_hoat_dong",
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
    nguoiDungId: null, // Changed from empty string to null
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
                title: property.tieuDe || "",
                location: property.diaChi || "",
                district: property.quanHuyen || "",
                city: property.tinhThanh || "TP.HCM",
                price: property.gia?.toString() || "",
                currency: "VND",
                type: property.loaiBds || "can_ho",
                status: property.trangThai || "dang_hoat_dong",
                beds: property.phongNgu?.toString() || "1",
                baths: property.phongTam?.toString() || "1",
                area: property.dienTich?.toString() || "",
                description: property.moTa || "",
                owner: property.nguoiDungId?.ten || "", // Fixed: access ten property from User object
                ownerPhone: property.nguoiDungId?.soDienThoai || "", // Also get phone from User object
                ownerEmail: property.nguoiDungId?.email || "", // Also get email from User object

                amenities: property.overlay?.amenities || [],
                images: property.gallery || [property.anhDaiDien || ""],
                yearBuilt: new Date().getFullYear().toString(),
                floor: property.thongTinChiTiet?.tang?.toString() || "1",
                totalFloors: "1",
                furnished: property.thongTinChiTiet?.noiThat === "Đầy đủ" || false,
                petAllowed: false,
                nguoiDungId: property.nguoiDungId || null, // Store the entire User object
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
                return `ID: #${property?._id || "N/A"} • Tạo: ${property?.createdAt ? new Date(property.createdAt).toLocaleDateString("vi-VN") : "N/A"} • Cập nhật: ${property?.updatedAt ? new Date(property.updatedAt).toLocaleDateString("vi-VN") : "N/A"}`
            default:
                return ""
        }
    }

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
                                        <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">{property.overlay?.rating || 0}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full">
                                        <Eye className="h-3 w-3 text-blue-500" />
                                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{property.overlay?.reviews || 0}</span>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </DialogHeader>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(95vh-140px)]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                        {/* left info card  */}
                        <CardLeftDialog formData={formData} isReadOnly={isReadOnly} currentImageIndex={currentImageIndex} handleInputChange={handleInputChange} prevImage={prevImage} nextImage={nextImage} getStatusBadge={getStatusBadge} errors={errors} />

                        {/* right info card  */}
                        <CardRightDialog formData={formData} handleInputChange={handleInputChange} isReadOnly={isReadOnly} errors={errors} newAmenity={newAmenity} setNewAmenity={setNewAmenity} addAmenity={addAmenity} removeAmenity={removeAmenity} />

                    </div>
                </div>

                <FooterDialogAddManagerRealEsate property={property} mode={mode} onOpenChange={onOpenChange} handleSubmit={handleSubmit} />

            </DialogContent>
        </Dialog>
    )
}
