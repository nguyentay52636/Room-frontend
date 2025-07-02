import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, Share2, Flag, MapPin, Star, Tag } from 'lucide-react'

export default function HeaderCardProductDetails({ property, isLiked, setIsLiked }: { property: any, isLiked: boolean, setIsLiked: (isLiked: boolean) => void }) {
    return (
        <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">
                            <Tag className="h-3 w-3 mr-1" />
                            {property.category}
                        </Badge>
                        {property.isNew && <Badge className="bg-red-500">Mới</Badge>}
                        {property.isFeatured && <Badge className="bg-yellow-500">Nổi bật</Badge>}
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                    <div className="flex items-center text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{property.location}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="font-medium">{property.rating}</span>
                            <span className="text-muted-foreground ml-1">({property.reviews} đánh giá)</span>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                            Có sẵn từ {property.availableFrom}
                        </Badge>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => setIsLiked(!isLiked)}>
                        <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Flag className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>

    )
}
