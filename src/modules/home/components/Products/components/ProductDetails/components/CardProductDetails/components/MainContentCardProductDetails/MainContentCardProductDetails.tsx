import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import { ImageGallery } from '../../../ImageGallery'
import {
    Bath,
    Car,
    Wifi,
    Shield,
    Zap,
    Droplets,
    Wind,
    TreePine,
    ShoppingCart,
    GraduationCap,
    Building,
    Bus,
    Plane,
    Star,
    Square,
    Bed,
    Phone,
    Calendar,
    CheckCircle,
    Clock,
    Users,
    Home,
} from "lucide-react"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CardHeader, CardTitle } from '@/components/ui/card'
import { owner, policies, productDetais, tabs } from '@/utils/data/types'
import QuickInfoMainContentCardProductDetails from './components/QuickInfoMainContentCardProductDetails'
import TabsMainContentCardProductDetails from './components/TabsMainContentCardProductDetails'



interface MainContentCardProductDetailsProps {
    property: productDetais
}

export default function MainContentCardProductDetails({ property }: MainContentCardProductDetailsProps) {
    const [activeTab, setActiveTab] = useState("overview")
    const [showPhoneNumber, setShowPhoneNumber] = useState(false)
    const amenities = [
        { icon: Wifi, name: "Wifi miễn phí", available: true },
        { icon: Wind, name: "Điều hòa", available: property.category !== "Phòng trọ" },
        { icon: Car, name: "Chỗ đậu xe", available: property.parking > 0 },
        { icon: Shield, name: "Bảo vệ 24/7", available: property.category === "Căn hộ cao cấp" },
        { icon: Droplets, name: "Hồ bơi", available: property.category === "Căn hộ cao cấp" },
        { icon: Zap, name: "Phòng gym", available: property.category === "Căn hộ cao cấp" },
        { icon: TreePine, name: "Công viên", available: property.category !== "Phòng trọ" },
        { icon: ShoppingCart, name: "Trung tâm thương mại", available: true },
    ]

    const nearbyPlaces = [
        { icon: ShoppingCart, name: "Landmark 81", distance: "500m", type: "Trung tâm thương mại" },
        { icon: GraduationCap, name: "Trường RMIT", distance: "1.2km", type: "Trường học" },
        { icon: Building, name: "Bitexco Tower", distance: "2.5km", type: "Văn phòng" },
        { icon: Bus, name: "Bến xe Miền Đông", distance: "3km", type: "Giao thông" },
        { icon: Plane, name: "Sân bay Tân Sơn Nhất", distance: "8km", type: "Sân bay" },
    ]






    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
                {/* Image Gallery */}
                <ImageGallery images={property.images} title={property.title} />

                {/* Quick Info */}
                <QuickInfoMainContentCardProductDetails property={property} />

                {/* Tabs */}
                <TabsMainContentCardProductDetails activeTab={activeTab} setActiveTab={setActiveTab} property={property} amenities={amenities} nearbyPlaces={nearbyPlaces} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
                {/* Price Card */}
                <Card className="sticky top-4">
                    <CardContent className="p-6">
                        <div className="text-center mb-6">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="text-3xl font-bold text-primary">
                                    {Number.parseInt(property.price).toLocaleString()}
                                </span>
                                <span className="text-muted-foreground">VNĐ/tháng</span>
                            </div>
                            {property.originalPrice && (
                                <div className="text-sm text-muted-foreground line-through">
                                    {Number.parseInt(property.originalPrice).toLocaleString()} VNĐ/tháng
                                </div>
                            )}
                        </div>

                        <div className="space-y-3 mb-6">
                            <Button variant="outline" className="w-full bg-transparent" size="lg">
                                <Calendar className="h-4 w-4 mr-2" />
                                Đặt lịch xem nhà
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            <Shield className="h-4 w-4 inline mr-1" />
                            Thông tin được bảo mật và an toàn
                        </div>
                    </CardContent>
                </Card>

                {/* Owner Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Thông tin người đăng</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center mb-4">
                            <Avatar className="h-12 w-12 mr-3">
                                <AvatarImage src={owner.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                    {owner.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-lg">{owner.name}</span>
                                    {owner.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                                    <span>
                                        {owner.rating} ({owner.reviews} đánh giá)
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Buttons */}
                        <div className="space-y-3 mb-4">
                            <Button
                                variant="outline"
                                className="w-full justify-start bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                                size="lg"
                            >
                                <img
                                    src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Zalo-Arc.png"
                                    alt="Zalo"
                                    className="h-5 w-5 mr-3"
                                />
                                Chat qua Zalo
                            </Button>

                            <Button
                                className="w-full justify-start bg-teal-600 hover:bg-teal-700"
                                size="lg"
                                onClick={() => setShowPhoneNumber(!showPhoneNumber)}
                            >
                                <Phone className="h-4 w-4 mr-3" />
                                {showPhoneNumber ? owner.phone : `${owner.phone.slice(0, 8)} ***`} -{" "}
                                {showPhoneNumber ? "Ẩn số" : "Hiện số"}
                            </Button>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>Phản hồi: {owner.responseTime}</span>
                            </div>
                            <div className="flex items-center">
                                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>Ngôn ngữ: {owner.languages.join(", ")}</span>
                            </div>
                            <div className="flex items-center">
                                <Home className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>Tham gia từ {owner.joinDate}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Safety Tips */}
                <Card className="border-yellow-200 bg-yellow-50">
                    <CardHeader>
                        <CardTitle className="text-yellow-800 flex items-center">
                            <Shield className="h-5 w-5 mr-2" />
                            Lưu ý an toàn
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-yellow-700">
                        <ul className="space-y-1">
                            <li>• Luôn xem nhà trực tiếp trước khi thuê</li>
                            <li>• Không chuyển tiền trước khi ký hợp đồng</li>
                            <li>• Kiểm tra giấy tờ pháp lý của chủ nhà</li>
                            <li>• Báo cáo nếu phát hiện thông tin sai lệch</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
