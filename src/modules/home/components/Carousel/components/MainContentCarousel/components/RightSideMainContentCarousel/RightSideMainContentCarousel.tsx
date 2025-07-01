import React from 'react'
import { Badge } from '@/components/ui/badge'
import { MapPin, Star, Heart, Award } from 'lucide-react'

export default function RightSideMainContentCarousel({ currentSlideData, isTransitioning, mousePosition }: { currentSlideData: any, isTransitioning: boolean, mousePosition: any }) {
    return (
        <>
            <div className="relative h-full flex items-center">
                <div
                    className={`relative w-full h-[600px] transform transition-all duration-800 ease-out ${!isTransitioning ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-8 scale-95"
                        }`}
                >
                    {/* Main Image Container */}
                    <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl group">
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{
                                backgroundImage: `url(${currentSlideData.image})`,
                                transform: `scale(${1 + mousePosition.x * 0.02})`,
                            }}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />

                        {/* Floating Elements */}
                        <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-2 animate-float">
                            <div className="flex items-center gap-2">
                                <Award className="w-5 h-5 text-yellow-400" />
                                <span className="text-white font-medium text-sm">Verified</span>
                            </div>
                        </div>

                        <div className="absolute top-6 left-6 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium animate-bounce-in">
                            Có sẵn
                        </div>

                        {/* Bottom Overlay Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <div className="bg-none  border border-white/20 rounded-2xl p-6 transform transition-all duration-500 hover:bg-white/15">
                                {/* Category Badge */}
                                <Badge className="bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
                                    {currentSlideData.overlayContent.category}
                                </Badge>

                                {/* Property Title */}
                                <h3 className="text-2xl font-bold text-white mb-2">{currentSlideData.overlayContent.title}</h3>

                                {/* Location */}
                                <div className="flex items-center gap-2 text-white/80 mb-4">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">{currentSlideData.overlayContent.location}</span>
                                </div>

                                {/* Price and Rating */}
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="text-2xl font-bold text-white">{currentSlideData.overlayContent.price}</div>
                                        <div className="text-white/60 text-sm">Giá thuê hàng tháng</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 mb-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-white font-bold">{currentSlideData.overlayContent.rating}</span>
                                        </div>
                                        <div className="text-white/60 text-sm">({currentSlideData.overlayContent.reviews})</div>
                                    </div>
                                </div>

                                {/* Amenities */}
                                <div className="flex flex-wrap gap-2">
                                    {currentSlideData.overlayContent.amenities.map((amenity: any, idx: number) => (
                                        <span
                                            key={idx}
                                            className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20"
                                        >
                                            {amenity}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Heart Button */}
                        <button className="absolute top-1/2 right-6 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-red-500 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 group">
                            <Heart className="w-6 h-6 group-hover:fill-current" />
                        </button>
                    </div>

                    {/* Decorative Elements */}
                    <div
                        className="absolute -top-4 -left-4 w-24 h-24 border-2 border-teal-400/30 rounded-full animate-pulse"
                        style={{
                            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 5}px)`,
                        }}
                    />
                    <div
                        className="absolute -bottom-4 -right-4 w-16 h-16 bg-teal-400/20 rounded-lg rotate-45 animate-float"
                        style={{
                            transform: `translate(${mousePosition.x * -8}px, ${mousePosition.y * -4}px) rotate(45deg)`,
                        }}
                    />
                </div>
            </div>
        </>
    )
}
