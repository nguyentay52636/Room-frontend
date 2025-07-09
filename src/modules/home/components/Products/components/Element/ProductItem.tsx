import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Star, MapPin, Heart, Share2, Eye, ArrowRight, TrendingUp, Square, Bath, Bed, Building, Wifi, Zap, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const getFeatureIcon = (feature: any) => {
    if (feature.icon === "local_laundry_service") return <Zap className="h-3 w-3" />
    if (feature.icon === "wifi") return <Wifi className="h-3 w-3" />
    if (feature.icon === "kitchen") return <Home className="h-3 w-3" />
    if (feature.text.includes("m²")) return <Square className="h-3 w-3" />
    if (feature.text.includes("phòng ngủ") || feature.text.includes("phòng")) return <Bed className="h-3 w-3" />
    if (feature.text.includes("WC")) return <Bath className="h-3 w-3" />
    return null
}

export const getStatusBadge = (status: string) => {
    switch (status) {
        case "dang_hoat_dong":
            return <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs">Có sẵn</Badge>
        case "da_thue":
            return <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs">Đã thuê</Badge>
        case "cho_duyet":
            return <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs">Chờ duyệt</Badge>
        case "bao_tri":
            return <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs">Bảo trì</Badge>
        default:
            return <Badge variant="secondary" className="text-xs">{status}</Badge>
    }
}

export const getTypeLabel = (type: string) => {
    switch (type) {
        case "can_ho": return "Căn hộ"
        case "nha_rieng": return "Nhà riêng"
        case "chung_cu": return "Chung cư"
        case "biet_thu": return "Biệt thự"
        case "studio": return "Studio"
        case "nha_pho": return "Nhà phố"
        default: return type
    }
}

export default function ProductItem({ toggleLike, property, index, hoveredCard, setHoveredCard, isVisible, likedProperties }: { property: any, index: number, hoveredCard: any, setHoveredCard: (id: any) => void, isVisible: boolean, toggleLike: (id: string, e: React.MouseEvent) => void, likedProperties: Set<string> }) {
    return (
        <div
            key={property._id}
            className="property-card-wrapper h-full flex flex-col"
            onMouseEnter={() => setHoveredCard(property._id)}
            onMouseLeave={() => setHoveredCard(null)}
        >
            <Card className="group overflow-hidden bg-white/90 border-0 shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-[1.02] property-card relative h-full flex flex-col">
                <Link to={`/products/${property._id}`} className="block h-full flex flex-col">
                    <div className="relative overflow-hidden">
                        {/* Image Container */}
                        <div className="aspect-[4/3] overflow-hidden relative">
                            <img
                                src={property.anhDaiDien}
                                alt={property.tieuDe}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>

                        {/* Status Badge - Top Left */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                            {getStatusBadge(property.trangThai)}
                            {property.badge && (
                                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white shadow border-0">
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    {property.badge}
                                </Badge>
                            )}
                            {property.overlay?.category && (
                                <Badge className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white shadow border-0">
                                    <Star className="h-3 w-3 mr-1 fill-current" />
                                    {property.overlay.category}
                                </Badge>
                            )}
                        </div>

                        {/* Property Type Badge - Top Right */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                            <Badge variant="outline" className="bg-white/90 text-gray-700 border-gray-300 text-xs">
                                <Building className="h-3 w-3 mr-1" />
                                {getTypeLabel(property.loaiBds)}
                            </Badge>
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-16 right-4 flex flex-col gap-2 z-10">
                            <Button
                                size="sm"
                                variant="secondary"
                                className="h-10 w-10 p-0 bg-white/90 hover:bg-white shadow border-0 transition-transform duration-200 hover:scale-110"
                                onClick={(e) => toggleLike(property._id, e)}
                            >
                                <Heart
                                    className={`h-4 w-4 transition-all duration-200 ${likedProperties.has(property._id)
                                        ? "fill-red-500 text-red-500 scale-110"
                                        : "text-muted-foreground hover:text-red-500 hover:scale-110"
                                        }`}
                                />
                            </Button>
                            <Button
                                size="sm"
                                variant="secondary"
                                className="h-10 w-10 p-0 bg-white/90 hover:bg-white shadow border-0 transition-transform duration-200 hover:scale-110"
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                }}
                            >
                                <Share2 className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors duration-200" />
                            </Button>
                        </div>

                        {/* Views Counter */}
                        {property.views && (
                            <div className="absolute bottom-4 left-4 z-10">
                                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md rounded-full px-3 py-2 text-white text-sm border border-white/20">
                                    <Eye className="h-3 w-3" />
                                    <span className="font-medium">{property.views.toLocaleString()}</span>
                                    <span className="text-xs opacity-80">lượt xem</span>
                                </div>
                            </div>
                        )}

                        {/* Property Details Overlay */}
                        <div className="absolute bottom-4 right-4 z-10">
                            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md rounded-full px-3 py-2 text-white text-sm border border-white/20">
                                <Square className="h-3 w-3" />
                                <span className="font-medium">{property.dienTich}m²</span>
                                <span className="text-xs opacity-80">•</span>
                                <Bed className="h-3 w-3" />
                                <span className="font-medium">{property.phongNgu}</span>
                                <span className="text-xs opacity-80">•</span>
                                <Bath className="h-3 w-3" />
                                <span className="font-medium">{property.phongTam}</span>
                            </div>
                        </div>

                        {/* Quick View Button */}
                        <div className="absolute bottom-16 right-4 z-10">
                            <Button
                                size="sm"
                                className="bg-primary/90 hover:bg-primary text-white shadow border-0 transition-transform duration-200 hover:scale-105"
                            >
                                <Eye className="h-4 w-4 mr-2" />
                                Xem nhanh
                            </Button>
                        </div>
                    </div>

                    <CardContent className="p-6 space-y-4 relative flex-1 flex flex-col justify-between">
                        {/* Title and Location */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-xl text-card-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-tight">
                                {property.tieuDe}
                            </h3>
                            <div className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                                <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-primary" />
                                <span className="line-clamp-1">{property.diaChi}</span>
                            </div>
                            {property.subtitle && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                                    {property.subtitle}
                                </p>
                            )}
                        </div>

                        {/* Property Info Grid */}
                        <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-100">
                            <div className="flex items-center gap-2 text-sm">
                                <Square className="h-4 w-4 text-blue-500" />
                                <span className="text-gray-600">{property.dienTich}m²</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Bed className="h-4 w-4 text-purple-500" />
                                <span className="text-gray-600">{property.phongNgu} phòng ngủ</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Bath className="h-4 w-4 text-orange-500" />
                                <span className="text-gray-600">{property.phongTam} phòng tắm</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Building className="h-4 w-4 text-green-500" />
                                <span className="text-gray-600">{getTypeLabel(property.loaiBds)}</span>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center bg-yellow-50 rounded-full px-3 py-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                <span className="text-sm font-semibold text-yellow-700">{property.overlay?.rating || 0}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">({property.overlay?.reviews || 0} đánh giá)</span>
                            {(property.overlay?.rating || 0) >= 4.8 && (
                                <Badge variant="outline" className="text-xs text-green-600 border-green-200 bg-green-50">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    Top rated
                                </Badge>
                            )}
                        </div>

                        {/* Features */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground min-h-[32px]">
                            {property.features?.slice(0, 3).map((feature: any, featureIndex: number) => (
                                <div
                                    key={feature._id || featureIndex}
                                    className="flex items-center gap-1 bg-gray-50 rounded-full px-3 py-1 hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                                    style={{ borderColor: feature.color }}
                                >
                                    {getFeatureIcon(feature)}
                                    <span className="font-medium text-xs">{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Amenities */}
                        {property.overlay?.amenities && property.overlay.amenities.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {property.overlay.amenities.slice(0, 3).map((amenity: string, index: number) => (
                                    <Badge key={index} variant="outline" className="text-xs border-gray-300">
                                        {amenity}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {/* Price and Button */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="space-y-1">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                        {property.gia?.toLocaleString('vi-VN')} VNĐ
                                    </span>
                                    <span className="text-sm text-muted-foreground font-medium">/tháng</span>
                                </div>
                                {property.overlay?.priceDisplay && (
                                    <div className="text-sm text-muted-foreground">
                                        {property.overlay.priceDisplay}
                                    </div>
                                )}
                            </div>
                            <Button
                                size="sm"
                                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow border-0 transition-transform duration-200 hover:scale-105 group/btn cursor-pointer"
                            >
                                <span>Chi tiết</span>
                                <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1" />
                            </Button>
                        </div>
                    </CardContent>
                </Link>
            </Card>
        </div>
    )
}
