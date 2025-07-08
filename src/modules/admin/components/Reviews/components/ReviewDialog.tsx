
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Star,
    MapPin,
    Building2,
    Calendar,
    Phone,
    Mail,
    User,
    Reply,
    ThumbsUp,
    Flag,
    Share2,
    Heart,
    MessageSquare,
    Award,
    Clock,
    CheckCircle2,
    Sparkles,
    Home,
    Compass,
    Sofa,
    Layers,
    DollarSign,
    Square,
    Bed,
    Bath,
    Target,
    ChevronLeft,
    ChevronRight,
    Users,
    Shield,
    Wifi,
    Car,
    Waves,
    TreePine,
} from "lucide-react"
import { useEffect, useState } from "react"
import type { Review } from "@/lib/apis/types"

interface ReviewDialogProps {
    review: Review | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ReviewDialog({ review, open, onOpenChange }: ReviewDialogProps) {
    const [replyText, setReplyText] = useState("")
    const [isReplying, setIsReplying] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        setCurrentImageIndex(0)
    }, [review])

    if (!review) return null

    const getStarColor = (rating: number) => {
        if (rating >= 4) return "text-emerald-500"
        if (rating >= 3) return "text-amber-500"
        return "text-red-500"
    }

    const getRatingBadgeColor = (rating: number) => {
        if (rating >= 4) return "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200"
        if (rating >= 3) return "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border-amber-200"
        return "bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-red-200"
    }

    const handleReply = () => {
        if (replyText.trim()) {
            console.log("Gửi phản hồi:", replyText)
            setReplyText("")
            setIsReplying(false)
            // Ở đây bạn sẽ gửi phản hồi đến backend
        }
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price)
    }

    const nextImage = () => {
        if (review.batDongSanId?.gallery && review.batDongSanId.gallery.length > 0) {
            setCurrentImageIndex((prev) => (prev + 1) % review.batDongSanId!.gallery.length)
        }
    }

    const prevImage = () => {
        if (review.batDongSanId?.gallery && review.batDongSanId.gallery.length > 0) {
            setCurrentImageIndex(
                (prev) => (prev - 1 + review.batDongSanId!.gallery.length) % review.batDongSanId!.gallery.length,
            )
        }
    }

    const getAmenityIcon = (amenity: string) => {
        const amenityLower = amenity.toLowerCase()
        if (amenityLower.includes("hồ bơi") || amenityLower.includes("pool")) return Waves
        if (amenityLower.includes("gym") || amenityLower.includes("phòng gym")) return Target
        if (amenityLower.includes("wifi")) return Wifi
        if (amenityLower.includes("xe") || amenityLower.includes("garage")) return Car
        if (amenityLower.includes("an ninh") || amenityLower.includes("security")) return Shield
        if (amenityLower.includes("sân vườn") || amenityLower.includes("vườn")) return TreePine
        return Home
    }

    return (

        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-7xl! max-h-[95vh] bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-950 dark:via-blue-950 dark:to-purple-950 border-0 shadow-2xl">
                <DialogHeader className="pb-6">
                    <DialogTitle className="flex items-center gap-4 text-2xl">
                        <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                            <MessageSquare className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                                Chi tiết đánh giá khách hàng
                            </span>
                            <p className="text-sm text-gray-500 font-normal mt-1">Thông tin đầy đủ và chi tiết ✨</p>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="max-h-[75vh] pr-4">
                    <div className="space-y-8">
                        {/* Thông tin khách hàng */}
                        <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
                            <CardHeader className="pb-4 relative z-10">
                                <CardTitle className="flex items-center gap-3 text-xl">
                                    <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                                        <User className="h-5 w-5 text-white" />
                                    </div>
                                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        Thông tin khách hàng
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <div className="flex items-start space-x-6">
                                    <div className="relative">
                                        <Avatar className="h-20 w-20 ring-4 ring-blue-200 shadow-2xl">
                                            <AvatarImage
                                                src={review.nguoiDungId.anhDaiDien || "/placeholder.svg"}
                                                alt={review.nguoiDungId.ten}
                                            />
                                            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-bold text-2xl">
                                                {review.nguoiDungId.ten.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                                            <Users className="h-4 w-4 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                                                {review.nguoiDungId.ten}
                                                <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 font-semibold">
                                                    <Award className="h-3 w-3 mr-1" />
                                                    Khách VIP
                                                </Badge>
                                                <Badge className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200 font-semibold">
                                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                                    Đã xác thực
                                                </Badge>
                                            </h3>
                                            <p className="text-gray-500 flex items-center gap-2 mt-2 text-lg">
                                                <span>@{review.nguoiDungId.tenDangNhap}</span>
                                                <span className="text-gray-300">•</span>
                                                <span className="capitalize">{review.nguoiDungId.vaiTro.replace("_", " ")}</span>
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-2xl border border-blue-200 dark:border-blue-800">
                                                <div className="p-2 bg-blue-600 rounded-xl">
                                                    <Mail className="h-4 w-4 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium">Email liên hệ</p>
                                                    <p className="font-semibold text-gray-900 dark:text-gray-100">{review.nguoiDungId.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                                                <div className="p-2 bg-emerald-600 rounded-xl">
                                                    <Phone className="h-4 w-4 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium">Số điện thoại</p>
                                                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                                                        {review.nguoiDungId.soDienThoai}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-2xl border border-purple-200 dark:border-purple-800">
                                                <div className="p-2 bg-purple-600 rounded-xl">
                                                    <Calendar className="h-4 w-4 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium">Ngày tham gia</p>
                                                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                                                        {new Date(review.nguoiDungId.createdAt).toLocaleDateString("vi-VN")}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-2xl border border-amber-200 dark:border-amber-800">
                                                <div className="p-2 bg-amber-600 rounded-xl">
                                                    <Shield className="h-4 w-4 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium">Trạng thái tài khoản</p>
                                                    <p className="font-semibold text-gray-900 dark:text-gray-100 capitalize">
                                                        {review.nguoiDungId.trangThai.replace("_", " ")}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Thông tin bất động sản chi tiết */}
                        {review.batDongSanId && (
                            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5" />
                                <CardHeader className="pb-4 relative z-10">
                                    <CardTitle className="flex items-center gap-3 text-xl">
                                        <div className="p-2 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl">
                                            <Building2 className="h-5 w-5 text-white" />
                                        </div>
                                        <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                                            Thông tin chi tiết bất động sản
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6 relative z-10">
                                    {/* Hình ảnh bất động sản */}
                                    {review.batDongSanId.gallery && review.batDongSanId.gallery.length > 0 && (
                                        <div className="space-y-4">
                                            <div className="relative overflow-hidden rounded-2xl">
                                                <img
                                                    src={review.batDongSanId.gallery?.[currentImageIndex] || "/placeholder.svg"}
                                                    alt={`${review.batDongSanId.tieuDe} - Hình ${currentImageIndex + 1}`}
                                                    className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
                                                />
                                                {review.batDongSanId.gallery.length > 1 && (
                                                    <>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full p-2"
                                                            onClick={prevImage}
                                                        >
                                                            <ChevronLeft className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full p-2"
                                                            onClick={nextImage}
                                                        >
                                                            <ChevronRight className="h-4 w-4" />
                                                        </Button>
                                                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                                            {review.batDongSanId.gallery.map((_, index) => (
                                                                <button
                                                                    key={index}
                                                                    className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentImageIndex ? "bg-white scale-110" : "bg-white/50"
                                                                        }`}
                                                                    onClick={() => setCurrentImageIndex(index)}
                                                                />
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </div>

                                            {/* Thumbnail Strip */}
                                            {review.batDongSanId.gallery.length > 1 && (
                                                <div className="flex space-x-3 overflow-x-auto pb-2">
                                                    {review.batDongSanId.gallery.map((image, index) => (
                                                        <button
                                                            key={index}
                                                            className={`flex-shrink-0 w-24 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${index === currentImageIndex
                                                                ? "border-blue-500 ring-2 ring-blue-200"
                                                                : "border-gray-200 hover:border-blue-300"
                                                                }`}
                                                            onClick={() => setCurrentImageIndex(index)}
                                                        >
                                                            <img
                                                                src={image || "/placeholder.svg"}
                                                                alt={`Thumbnail ${index + 1}`}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Thông tin cơ bản */}
                                    <div className="p-6 bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-800 dark:via-blue-900 dark:to-indigo-900 rounded-2xl border border-slate-200 dark:border-slate-700">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                                    {review.batDongSanId.tieuDe}
                                                </h4>
                                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                                    {review.batDongSanId.moTa}
                                                </p>
                                            </div>
                                            <div className="flex flex-col items-end space-y-2">
                                                <Badge className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200 font-bold text-sm">
                                                    {review.batDongSanId.overlay.category}
                                                </Badge>
                                                <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200 font-semibold">
                                                    ID: {review.batDongSanId._id.slice(-8)}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Địa chỉ */}
                                        <div className="flex items-center space-x-2 mb-6 p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                                            <MapPin className="h-5 w-5 text-red-500" />
                                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                                                {review.batDongSanId.diaChi}
                                            </span>
                                        </div>

                                        {/* Thông tin chi tiết grid */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                            <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 rounded-xl text-center border border-emerald-200 dark:border-emerald-800">
                                                <DollarSign className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                                                <p className="text-xs text-gray-500 font-medium">Giá thuê</p>
                                                <p className="font-bold text-emerald-600 text-lg">{formatPrice(review.batDongSanId.gia)}</p>
                                            </div>
                                            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-xl text-center border border-purple-200 dark:border-purple-800">
                                                <Square className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                                                <p className="text-xs text-gray-500 font-medium">Diện tích</p>
                                                <p className="font-bold text-purple-600 text-lg">{review.batDongSanId.dienTich}m²</p>
                                            </div>
                                            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-xl text-center border border-amber-200 dark:border-amber-800">
                                                <Bed className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                                                <p className="text-xs text-gray-500 font-medium">Phòng ngủ</p>
                                                <p className="font-bold text-amber-600 text-lg">{review.batDongSanId.soPhongNgu}</p>
                                            </div>
                                            <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 rounded-xl text-center border border-cyan-200 dark:border-cyan-800">
                                                <Bath className="h-6 w-6 text-cyan-600 mx-auto mb-2" />
                                                <p className="text-xs text-gray-500 font-medium">Phòng tắm</p>
                                                <p className="font-bold text-cyan-600 text-lg">{review.batDongSanId.soPhongTam}</p>
                                            </div>
                                        </div>

                                        {/* Thông tin chi tiết bổ sung */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                            <div className="p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl text-center">
                                                <Layers className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                                                <p className="text-xs text-gray-500">Tầng</p>
                                                <p className="font-semibold text-sm">{review.batDongSanId.thongTinChiTiet.tang}</p>
                                            </div>
                                            <div className="p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl text-center">
                                                <Compass className="h-5 w-5 text-green-600 mx-auto mb-1" />
                                                <p className="text-xs text-gray-500">Hướng</p>
                                                <p className="font-semibold text-sm">{review.batDongSanId.thongTinChiTiet.huong}</p>
                                            </div>
                                            <div className="p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl text-center">
                                                <Home className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                                                <p className="text-xs text-gray-500">Ban công</p>
                                                <p className="font-semibold text-sm">{review.batDongSanId.thongTinChiTiet.banCong}</p>
                                            </div>
                                            <div className="p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl text-center">
                                                <Sofa className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                                                <p className="text-xs text-gray-500">Nội thất</p>
                                                <p className="font-semibold text-sm">{review.batDongSanId.thongTinChiTiet.noiThat}</p>
                                            </div>
                                        </div>

                                        {/* Thống kê bất động sản */}
                                        <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-6">
                                                    <div className="flex items-center space-x-2">
                                                        <Star className="h-5 w-5 text-amber-500 fill-current" />
                                                        <span className="font-bold text-lg">{review.batDongSanId.overlay.rating}/5</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <MessageSquare className="h-5 w-5 text-blue-500" />
                                                        <span className="font-semibold">{review.batDongSanId.overlay.reviews} đánh giá</span>
                                                    </div>
                                                </div>
                                                <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 font-bold">
                                                    {review.batDongSanId.overlay.priceDisplay}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Tiện ích */}
                                        <div className="mt-6">
                                            <h5 className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2 text-lg">
                                                <Sparkles className="h-5 w-5 text-purple-500" />
                                                Tiện ích nổi bật
                                            </h5>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                {review.batDongSanId.overlay.amenities.map((amenity, index) => {
                                                    const IconComponent = getAmenityIcon(amenity)
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="flex items-center space-x-3 p-3 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 rounded-xl border border-emerald-200 dark:border-emerald-800 hover:scale-105 transition-transform duration-200"
                                                        >
                                                            <IconComponent className="h-5 w-5 text-emerald-600" />
                                                            <span className="font-semibold text-emerald-700 dark:text-emerald-300">{amenity}</span>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Nội dung đánh giá */}
                        <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5" />
                            <CardHeader className="pb-4 relative z-10">
                                <CardTitle className="flex items-center gap-3 text-xl">
                                    <div className="p-2 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl">
                                        <Star className="h-5 w-5 text-white" />
                                    </div>
                                    <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                        Nội dung đánh giá chi tiết
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 relative z-10">
                                {/* Hiển thị đánh giá */}
                                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-2xl border border-amber-200 dark:border-amber-800">
                                    <div className="flex items-center space-x-6">
                                        <div className="flex items-center space-x-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-7 w-7 transition-all duration-200 ${i < review.soSao ? `${getStarColor(review.soSao)} fill-current` : "text-gray-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <Badge
                                            className={`${getRatingBadgeColor(review.soSao)} border rounded-xl text-lg font-bold px-4 py-2`}
                                        >
                                            {review.soSao}/5 ⭐
                                        </Badge>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                                            <Calendar className="h-4 w-4" />
                                            {new Date(review.createdAt).toLocaleDateString("vi-VN", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                        <p className="text-xs text-gray-400 flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {new Date(review.createdAt).toLocaleTimeString("vi-VN", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                </div>

                                {/* Bình luận */}
                                <div className="p-6 bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-800 dark:via-blue-900 dark:to-indigo-900 rounded-2xl border border-slate-200 dark:border-slate-700">
                                    <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2 text-lg">
                                        <MessageSquare className="h-5 w-5 text-blue-600" />
                                        Bình luận chi tiết từ khách hàng
                                    </h4>
                                    <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed text-base border-l-4 border-blue-400 pl-6 bg-white/60 dark:bg-gray-800/60 p-6 rounded-r-2xl italic">
                                        "{review.binhLuan}"
                                    </blockquote>
                                </div>

                                {/* Thống kê tương tác */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-xl text-center border border-blue-200 dark:border-blue-800">
                                        <div className="text-3xl font-bold text-blue-600 mb-1">👍</div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Hữu ích</p>
                                        <p className="text-lg font-bold text-blue-600">24</p>
                                    </div>
                                    <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 rounded-xl text-center border border-emerald-200 dark:border-emerald-800">
                                        <div className="text-3xl font-bold text-emerald-600 mb-1">💖</div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Yêu thích</p>
                                        <p className="text-lg font-bold text-emerald-600">12</p>
                                    </div>
                                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-xl text-center border border-purple-200 dark:border-purple-800">
                                        <div className="text-3xl font-bold text-purple-600 mb-1">👁️</div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Lượt xem</p>
                                        <p className="text-lg font-bold text-purple-600">156</p>
                                    </div>
                                    <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-xl text-center border border-amber-200 dark:border-amber-800">
                                        <div className="text-3xl font-bold text-amber-600 mb-1">📤</div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Chia sẻ</p>
                                        <p className="text-lg font-bold text-amber-600">8</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Phần phản hồi */}
                        <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />
                            <CardHeader className="pb-4 relative z-10">
                                <CardTitle className="flex items-center gap-3 text-xl">
                                    <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
                                        <Reply className="h-5 w-5 text-white" />
                                    </div>
                                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                        Phản hồi khách hàng
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 relative z-10">
                                {!isReplying ? (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-6">💌</div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Chưa có phản hồi nào</h3>
                                        <p className="text-gray-500 mb-6 max-w-md mx-auto leading-relaxed">
                                            Hãy viết một phản hồi chân thành để thể hiện sự quan tâm và cảm ơn khách hàng đã chia sẻ trải
                                            nghiệm
                                        </p>
                                        <Button
                                            onClick={() => setIsReplying(true)}
                                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg font-semibold"
                                        >
                                            <Reply className="h-5 w-5 mr-2" />
                                            Viết phản hồi ngay
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl border border-blue-200 dark:border-blue-800">
                                            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                                <Sparkles className="h-4 w-4 text-purple-500" />
                                                <strong>Mẹo viết phản hồi tốt:</strong> Cảm ơn khách hàng, giải quyết các vấn đề được đề cập và
                                                thể hiện cam kết cải thiện dịch vụ
                                            </p>
                                        </div>
                                        <Textarea
                                            placeholder="💬 Viết phản hồi chân thành và chuyên nghiệp cho khách hàng...

Ví dụ: 'Cảm ơn anh/chị [Tên] đã dành thời gian chia sẻ trải nghiệm! Chúng tôi rất vui khi anh/chị hài lòng với [điểm tích cực]. Về [vấn đề được đề cập], chúng tôi sẽ [hành động cụ thể]. Hy vọng được phục vụ anh/chị trong tương lai!'"
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            className="min-h-[150px] bg-white dark:bg-gray-800 border-gray-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl resize-none text-base leading-relaxed"
                                        />
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                                <span>Phản hồi sẽ được gửi đến email: {review.nguoiDungId.email}</span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setIsReplying(false)}
                                                    className="rounded-xl border-gray-200 hover:bg-gray-50 bg-transparent px-6"
                                                >
                                                    Hủy bỏ
                                                </Button>
                                                <Button
                                                    onClick={handleReply}
                                                    disabled={!replyText.trim()}
                                                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 px-8 font-semibold"
                                                >
                                                    <Reply className="h-4 w-4 mr-2" />
                                                    Gửi phản hồi
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </ScrollArea>

                {/* Nút hành động cuối */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center space-x-3">
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl border-gray-200 hover:bg-red-50 hover:border-red-300 hover:text-red-600 bg-transparent transition-all duration-200"
                        >
                            <Flag className="h-4 w-4 mr-2" />
                            Báo cáo vi phạm
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl border-gray-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 bg-transparent transition-all duration-200"
                        >
                            <Share2 className="h-4 w-4 mr-2" />
                            Chia sẻ đánh giá
                        </Button>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl border-gray-200 hover:bg-pink-50 hover:border-pink-300 hover:text-pink-600 bg-transparent transition-all duration-200"
                        >
                            <Heart className="h-4 w-4 mr-2" />
                            Yêu thích
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl border-gray-200 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-600 bg-transparent transition-all duration-200"
                        >
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            Đánh dấu hữu ích
                        </Button>
                        <Button
                            onClick={() => onOpenChange(false)}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl px-8 font-semibold transition-all duration-200"
                        >
                            Đóng
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
