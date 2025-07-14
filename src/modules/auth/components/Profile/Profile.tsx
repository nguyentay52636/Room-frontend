"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
    MapPin,
    Phone,
    Calendar,
    Star,
    Home,
    Shield,
    Camera,
    Edit3,
    Save,
    Heart,
    MessageSquare,
    FileText,
    Award,
    Eye,
    CheckCircle,
    AlertCircle,
    DollarSign,
    Building,
} from "lucide-react"
import HeaderProfile from "./components/HeaderProfile"
import SiderProfile from "./components/Tabs/SiderProfile"
import QuickActionsProfile from "./components/QuickActionsProfileCard"
import OVerViewTabsInfo from "./components/OVerViewTabsInfo"
import RentalHistoryTabs from "./components/Tabs/RentalHistoryTabs"
import FavoritesTab from "./components/Tabs/FavoritesTab"
import ReviewsTabs from "./components/Tabs/ReviewsTabs"
import SetttingTabs from "./components/Tabs/SetttingTabs"
import SecurityTabs from "./components/Tabs/SecurityTabs"
import DocumentsTabs from "./components/Tabs/DocumentsTabs"
export default function Profile() {
    const [isEditing, setIsEditing] = useState(false)
    const [activeTab, setActiveTab] = useState("overview")

    // Mock user data
    const user = {
        _id: "507f1f77bcf86cd799439011",
        ten: "Nguyễn Văn Minh",
        email: "nguyenvanminh@email.com",
        tenDangNhap: "minh_nguyen",
        soDienThoai: "0901234567",
        vaiTro: "tenant", // tenant, landlord, admin
        anhDaiDien: "/placeholder.svg?height=120&width=120&text=NVM",
        trangThai: "active",
        createdAt: "2024-01-15T08:30:00Z",
        diaChi: "Quận 1, TP. Hồ Chí Minh",
        ngaySinh: "1990-05-15",
        gioiTinh: "Nam",
        ngheNghiep: "Kỹ sư phần mềm",
        moTa: "Tôi là một người thuê nhà có trách nhiệm, yêu thích sự sạch sẽ và trật tự. Tìm kiếm một không gian sống thoải mái và an toàn.",
        xacThuc: {
            email: true,
            soDienThoai: true,
            cccd: true,
            congViec: false,
        },
    }

    // Mock rental history
    const rentalHistory = [
        {
            id: "1",
            tieuDe: "Căn hộ cao cấp Vinhomes Central Park",
            diaChi: "Bình Thạnh, TP. Hồ Chí Minh",
            gia: 15000000,
            thoiGian: "01/2024 - Hiện tại",
            trangThai: "active",
            danhGia: 5,
            hinhAnh: "/placeholder.svg?height=80&width=120&text=Apartment",
        },
        {
            id: "2",
            tieuDe: "Nhà phố 3 tầng Quận 7",
            diaChi: "Quận 7, TP. Hồ Chí Minh",
            gia: 12000000,
            thoiGian: "06/2023 - 12/2023",
            trangThai: "completed",
            danhGia: 4,
            hinhAnh: "/placeholder.svg?height=80&width=120&text=House",
        },
    ]

    // Mock favorite properties
    const favoriteProperties = [
        {
            id: "1",
            tieuDe: "Studio hiện đại Quận 3",
            gia: 8000000,
            diaChi: "Quận 3, TP. Hồ Chí Minh",
            hinhAnh: "/placeholder.svg?height=80&width=120&text=Studio",
            soSao: 4.5,
            soLuotXem: 245,
        },
        {
            id: "2",
            tieuDe: "Căn hộ 2PN Landmark 81",
            gia: 25000000,
            diaChi: "Bình Thạnh, TP. Hồ Chí Minh",
            hinhAnh: "/placeholder.svg?height=80&width=120&text=2BR",
            soSao: 4.8,
            soLuotXem: 189,
        },
    ]

    // Mock reviews
    const userReviews = [
        {
            id: "1",
            batDongSan: "Căn hộ cao cấp Vinhomes Central Park",
            soSao: 5,
            binhLuan: "Căn hộ rất đẹp, view sông tuyệt vời. Chủ nhà thân thiện và hỗ trợ tốt.",
            ngayTao: "2024-02-15",
            phanHoi: "Cảm ơn bạn đã đánh giá tích cực!",
        },
        {
            id: "2",
            batDongSan: "Nhà phố 3 tầng Quận 7",
            soSao: 4,
            binhLuan: "Nhà rộng rãi, thoáng mát. Vị trí thuận tiện đi lại.",
            ngayTao: "2023-12-20",
            phanHoi: null,
        },
    ]

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("vi-VN")
    }

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            active: { label: "Đang thuê", variant: "default" as const, color: "bg-green-500" },
            completed: { label: "Đã kết thúc", variant: "secondary" as const, color: "bg-gray-500" },
            pending: { label: "Chờ xác nhận", variant: "outline" as const, color: "bg-yellow-500" },
        }
        return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
        ))
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <HeaderProfile />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <SiderProfile user={user} />
                    <div className="lg:col-span-3">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                            <TabsList className="grid w-full grid-cols-6">
                                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                                <TabsTrigger value="rental">Lịch sử thuê</TabsTrigger>
                                <TabsTrigger value="favorites">Yêu thích</TabsTrigger>
                                <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
                                <TabsTrigger value="settings">Cài đặt</TabsTrigger>
                                <TabsTrigger value="documents">Tài liệu</TabsTrigger>
                            </TabsList>

                            {/* Overview Tab */}
                            <TabsContent value="overview" className="space-y-6">
                                <OVerViewTabsInfo user={user} />
                                <QuickActionsProfile />
                            </TabsContent>

                            {/* Rental History Tab */}
                            <TabsContent value="rental" className="space-y-6">
                                <RentalHistoryTabs rentalHistory={rentalHistory} getStatusBadge={getStatusBadge} renderStars={renderStars} />
                            </TabsContent>
                            {/* Favorites Tab */}
                            <TabsContent value="favorites" className="space-y-6">
                                <FavoritesTab favoriteProperties={favoriteProperties} formatCurrency={formatCurrency} />
                            </TabsContent>
                            {/* Reviews Tab */}
                            <TabsContent value="reviews" className="space-y-6">
                                <ReviewsTabs userReviews={userReviews} formatDate={formatDate} renderStars={renderStars} />
                            </TabsContent>
                            {/* Settings Tab */}
                            <TabsContent value="settings" className="space-y-6">
                                <SetttingTabs />

                                <SecurityTabs />
                            </TabsContent>
                            {/* Documents Tab */}
                            <DocumentsTabs />
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}
