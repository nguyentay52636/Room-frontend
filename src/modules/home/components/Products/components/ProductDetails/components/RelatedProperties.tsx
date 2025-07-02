"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Share2, MapPin, Star, Bed, Bath, Car, Square } from "lucide-react"
import { Link } from "react-router-dom"


interface RelatedPropertiesProps {
    currentPropertyId: string
    category: string
    location: string
}

export function RelatedProperties({ currentPropertyId, category, location }: RelatedPropertiesProps) {
    const [likedProperties, setLikedProperties] = useState<string[]>([])

    const toggleLike = (propertyId: string) => {
        setLikedProperties((prev) =>
            prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId],
        )
    }

    // Mock data cho related properties
    const relatedProperties = [
        {
            id: "3",
            title: "Căn hộ hiện đại Landmark 81",
            location: "Quận Bình Thạnh, TP. HCM",
            category: "Căn hộ cao cấp",
            price: "35.000.000",
            originalPrice: "40.000.000",
            area: "95",
            bedrooms: 3,
            bathrooms: 2,
            parking: 1,
            rating: 4.9,
            reviews: 89,
            image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
            isNew: true,
            isFeatured: false,
        },
        {
            id: "4",
            title: "Studio sang trọng Vinhomes",
            location: "Quận 1, TP. HCM",
            category: "Studio",
            price: "18.000.000",
            area: "45",
            bedrooms: 1,
            bathrooms: 1,
            parking: 0,
            rating: 4.6,
            reviews: 124,
            image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
            isNew: false,
            isFeatured: true,
        },
        {
            id: "6",
            title: "Phòng trọ cao cấp gần ĐH",
            location: "Quận Thủ Đức, TP. HCM",
            category: "Phòng trọ",
            price: "4.500.000",
            area: "30",
            bedrooms: 1,
            bathrooms: 0,
            parking: 0,
            rating: 4.3,
            reviews: 45,
            image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
            isNew: false,
            isFeatured: false,
        },
        {
            id: "7",
            title: "Căn hộ dịch vụ full nội thất",
            location: "Quận 3, TP. HCM",
            category: "Căn hộ dịch vụ",
            price: "22.000.000",
            area: "65",
            bedrooms: 2,
            bathrooms: 1,
            parking: 1,
            rating: 4.7,
            reviews: 78,
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
            isNew: true,
            isFeatured: false,
        },
        {
            id: "8",
            title: "Nhà nguyên căn 2 tầng",
            location: "Quận 7, TP. HCM",
            category: "Nhà nguyên căn",
            price: "45.000.000",
            area: "120",
            bedrooms: 4,
            bathrooms: 3,
            parking: 2,
            rating: 4.8,
            reviews: 156,
            image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&h=300&fit=crop",
            isNew: false,
            isFeatured: true,
        },
        {
            id: "9",
            title: "KTX sinh viên tiện nghi",
            location: "Quận Bình Thạnh, TP. HCM",
            category: "KTX Sinh viên",
            price: "2.800.000",
            area: "20",
            bedrooms: 1,
            bathrooms: 0,
            parking: 0,
            rating: 4.2,
            reviews: 234,
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
            isNew: false,
            isFeatured: false,
        },
    ]

    // Filter properties khác current property
    const filteredProperties = relatedProperties.filter((p) => p.id !== currentPropertyId)

    return (
        <div className="mt-16 mb-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Sản phẩm liên quan</h2>
                    <p className="text-muted-foreground">Khám phá thêm các lựa chọn phù hợp trong khu vực {location}</p>
                </div>
                <Button variant="outline" asChild>
                    <Link to="/products">Xem tất cả</Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.slice(0, 6).map((property, index) => (
                    <Card
                        key={property.id}
                        className="group overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="relative">
                            <img
                                src={property.image || "/placeholder.svg"}
                                alt={property.title}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-3 left-3 flex gap-2">
                                <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                                    {property.category}
                                </Badge>
                                {property.isNew && <Badge className="bg-red-500">Mới</Badge>}
                                {property.isFeatured && <Badge className="bg-yellow-500">Nổi bật</Badge>}
                            </div>
                            <div className="absolute top-3 right-3 flex gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 bg-white/90 backdrop-blur-sm hover:bg-white"
                                    onClick={() => toggleLike(property.id)}
                                >
                                    <Heart
                                        className={`h-4 w-4 ${likedProperties.includes(property.id) ? "fill-red-500 text-red-500" : ""}`}
                                    />
                                </Button>
                                <Button variant="outline" size="icon" className="h-8 w-8 bg-white/90 backdrop-blur-sm hover:bg-white">
                                    <Share2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <CardContent className="p-4">
                            <div className="mb-3">
                                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                                    <Link to={`/property/${property.id}`}>{property.title}</Link>
                                </h3>
                                <div className="flex items-center text-sm text-muted-foreground mb-2">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    <span>{property.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center">
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                                        <span className="text-sm font-medium">{property.rating}</span>
                                        <span className="text-xs text-muted-foreground ml-1">({property.reviews})</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center">
                                        <Square className="h-3 w-3 mr-1" />
                                        <span>{property.area}m²</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Bed className="h-3 w-3 mr-1" />
                                        <span>{property.bedrooms}</span>
                                    </div>
                                    {property.bathrooms > 0 && (
                                        <div className="flex items-center">
                                            <Bath className="h-3 w-3 mr-1" />
                                            <span>{property.bathrooms}</span>
                                        </div>
                                    )}
                                    {property.parking > 0 && (
                                        <div className="flex items-center">
                                            <Car className="h-3 w-3 mr-1" />
                                            <span>{property.parking}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-bold text-primary">
                                            {Number.parseInt(property.price).toLocaleString()}
                                        </span>
                                        <span className="text-sm text-muted-foreground">VNĐ/tháng</span>
                                    </div>
                                    {property.originalPrice && (
                                        <div className="text-xs text-muted-foreground line-through">
                                            {Number.parseInt(property.originalPrice).toLocaleString()} VNĐ
                                        </div>
                                    )}
                                </div>
                                <Button size="sm" asChild>
                                    <Link to={`/products/${property.id}`}>Xem chi tiết</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
