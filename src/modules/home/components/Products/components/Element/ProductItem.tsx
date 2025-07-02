import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Star, MapPin, Heart, Share2, Eye, ArrowRight, TrendingUp, Square, Bath, Bed } from 'lucide-react'
import { Button } from '@/components/ui/button'
export const getFeatureIcon = (feature: string) => {
    if (feature.includes("m²")) return <Square className="h-3 w-3" />
    if (feature.includes("phòng ngủ") || feature.includes("phòng")) return <Bed className="h-3 w-3" />
    if (feature.includes("WC")) return <Bath className="h-3 w-3" />
    return null
}
export default function ProductItem({ toggleLike, property, index, hoveredCard, setHoveredCard, isVisible, likedProperties }: { property: any, index: number, hoveredCard: any, setHoveredCard: (id: any) => void, isVisible: boolean, toggleLike: (id: string, e: React.MouseEvent) => void, likedProperties: Set<string> }) {
    return (
        <div
            key={property.id}
            className="property-card-wrapper h-full flex flex-col"
            onMouseEnter={() => setHoveredCard(property.id)}
            onMouseLeave={() => setHoveredCard(null)}
        >
            <Card className="group overflow-hidden bg-white/90 border-0 shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-[1.02] property-card relative h-full flex flex-col">
                <Link to={`/products/${property.id}`} className="block h-full flex flex-col">
                    <div className="relative overflow-hidden">
                        {/* Image Container */}
                        <div className="aspect-[4/3] overflow-hidden relative">
                            <img
                                src={property.image || "/placeholder.svg"}
                                alt={property.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        {/* Floating Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                            {property.isNew && (
                                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white shadow border-0">
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    Mới
                                </Badge>
                            )}
                            {property.isFeatured && (
                                <Badge className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white shadow border-0">
                                    <Star className="h-3 w-3 mr-1 fill-current" />
                                    Nổi bật
                                </Badge>
                            )}
                            {property.discount && (
                                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow border-0">
                                    -{property.discount}%
                                </Badge>
                            )}
                        </div>
                        {/* Action Buttons */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                            <Button
                                size="sm"
                                variant="secondary"
                                className="h-10 w-10 p-0 bg-white/90 hover:bg-white shadow border-0 transition-transform duration-200 hover:scale-110"
                                onClick={(e) => toggleLike(property.id, e)}
                            >
                                <Heart
                                    className={`h-4 w-4 transition-all duration-200 ${likedProperties.has(property.id)
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
                        {/* Quick View Button */}
                        <div className="absolute bottom-4 right-4 z-10">
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
                                {property.title}
                            </h3>
                            <div className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                                <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-primary" />
                                <span className="line-clamp-1">{property.location}</span>
                            </div>
                        </div>
                        {/* Rating */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center bg-yellow-50 rounded-full px-3 py-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                <span className="text-sm font-semibold text-yellow-700">{property.rating}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">({property.reviews} đánh giá)</span>
                            {property.rating >= 4.8 && (
                                <Badge variant="outline" className="text-xs text-green-600 border-green-200 bg-green-50">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    Top rated
                                </Badge>
                            )}
                        </div>
                        {/* Features */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground min-h-[32px]">
                            {property.features.slice(0, 3).map((feature: any, featureIndex: number) => (
                                <div
                                    key={featureIndex}
                                    className="flex items-center gap-1 bg-gray-50 rounded-full px-3 py-1 hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                                >
                                    {getFeatureIcon(feature)}
                                    <span className="font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                        {/* Price and Button */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="space-y-1">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                        {property.price.toLocaleString('vi-VN')} VNĐ
                                    </span>
                                    <span className="text-sm text-muted-foreground font-medium">/tháng</span>
                                </div>
                                {property.originalPrice && (
                                    <div className="text-sm text-muted-foreground line-through">
                                        {property.originalPrice.toLocaleString('vi-VN')} VNĐ
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
