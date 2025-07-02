"use client"

import { useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Share2, MapPin, Star, Square, Bed, Bath, Eye, TrendingUp } from "lucide-react"
import { Link } from "react-router-dom"

interface PropertyCardProps {
    id: string
    title: string
    location: string
    price: string
    originalPrice?: string
    rating: number
    reviews: number
    image: string
    features: string[]
    isNew?: boolean
    isFeatured?: boolean
    views?: number
    discount?: number
}

export function ProductCard({
    id,
    title,
    location,
    price,
    originalPrice,
    rating,
    reviews,
    image,
    features,
    isNew = false,
    isFeatured = false,
    views,
    discount,
}: PropertyCardProps) {
    const [isLiked, setIsLiked] = useState(false)

    const getFeatureIcon = (feature: string) => {
        if (feature.includes("m²")) return <Square className="h-3 w-3" />
        if (feature.includes("phòng ngủ") || feature.includes("phòng")) return <Bed className="h-3 w-3" />
        if (feature.includes("WC")) return <Bath className="h-3 w-3" />
        return null
    }

    return (
        <Card className="group overflow-hidden cursor-pointer! hover:shadow-2xl animate-fade-in bg-card border-border property-card">
            <div className="relative">
                <div className="aspect-[4/3] overflow-hidden">
                    <img
                        src={image || "/placeholder.svg"}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 theme-transition"
                    />
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 theme-transition" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {isNew && <Badge className="bg-red-500 hover:bg-red-600 text-white shadow-lg animate-pulse">Mới</Badge>}
                    {isFeatured && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg">
                            Nổi bật
                        </Badge>
                    )}
                    {discount && <Badge className="bg-green-500 hover:bg-green-600 text-white shadow-lg">-{discount}%</Badge>}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 theme-transition transform translate-x-4 group-hover:translate-x-0">
                    <Button
                        size="sm"
                        variant="secondary"
                        className="h-9 w-9 p-0 bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm hover:scale-110 theme-transition"
                        onClick={(e) => {
                            e.preventDefault()
                            setIsLiked(!isLiked)
                        }}
                    >
                        <Heart
                            className={`h-4 w-4 theme-transition ${isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-500"
                                }`}
                        />
                    </Button>
                    <Button
                        size="sm"
                        variant="secondary"
                        className="h-9 w-9 p-0 bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm hover:scale-110 theme-transition"
                    >
                        <Share2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </div>

                {/* Views Counter */}
                {views && (
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 theme-transition">
                        <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                            <Eye className="h-3 w-3" />
                            <span>{views.toLocaleString()}</span>
                        </div>
                    </div>
                )}
            </div>

            <CardContent className="p-6 space-y-4">
                {/* Title and Location */}
                <div className="space-y-2">
                    <h3 className="font-bold text-lg text-card-foreground group-hover:text-primary theme-transition line-clamp-1">
                        {title}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span className="line-clamp-1">{location}</span>
                    </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium ml-1">{rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({reviews} đánh giá)</span>
                    {rating >= 4.8 && (
                        <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Top rated
                        </Badge>
                    )}
                </div>

                {/* Features */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center gap-1">
                            {getFeatureIcon(feature)}
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-primary">{Number.parseInt(price).toLocaleString()}</span>
                            <span className="text-sm text-muted-foreground">VNĐ/tháng</span>
                        </div>
                        {originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                                {Number.parseInt(originalPrice).toLocaleString()} VNĐ
                            </div>
                        )}
                    </div>
                    <Button asChild size="sm" className="bg-primary hover:bg-primary/90 shadow-lg hover:scale-105 theme-transition">
                        <Link to={`/property/${id}`}>Xem chi tiết</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
