
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Download, Share2, Play, Pause, Maximize } from "lucide-react"

interface ImageGalleryProps {
    images: string[]
    title: string
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const [lightboxIndex, setLightboxIndex] = useState(0)
    const [isAutoPlay, setIsAutoPlay] = useState(false)
    const [zoomLevel, setZoomLevel] = useState(1)

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    const nextLightboxImage = () => {
        setLightboxIndex((prev) => (prev + 1) % images.length)
        setZoomLevel(1)
    }

    const prevLightboxImage = () => {
        setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)
        setZoomLevel(1)
    }

    const openLightbox = (index: number) => {
        setLightboxIndex(index)
        setIsLightboxOpen(true)
        setZoomLevel(1)
    }

    const closeLightbox = () => {
        setIsLightboxOpen(false)
        setIsAutoPlay(false)
        setZoomLevel(1)
    }

    const handleZoomIn = () => {
        setZoomLevel((prev) => Math.min(prev + 0.5, 3))
    }

    const handleZoomOut = () => {
        setZoomLevel((prev) => Math.max(prev - 0.5, 0.5))
    }

    const handleDownload = () => {
        const link = document.createElement("a")
        link.href = images[lightboxIndex]
        link.download = `${title}-image-${lightboxIndex + 1}.jpg`
        link.click()
    }

    return (
        <>
            <div className="space-y-4">
                {/* Main Image */}
                <div className="relative group">
                    <div
                        className="relative h-96 rounded-xl overflow-hidden cursor-pointer"
                        onClick={() => openLightbox(currentIndex)}
                    >
                        <img
                            src={images[currentIndex] || "/placeholder.svg"}
                            alt={`${title} - Image ${currentIndex + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                        {/* Overlay hint */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2">
                                <Maximize className="h-4 w-4" />
                                <span className="text-sm font-medium">Click để xem chi tiết</span>
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                            onClick={(e) => {
                                e.stopPropagation()
                                prevImage()
                            }}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                            onClick={(e) => {
                                e.stopPropagation()
                                nextImage()
                            }}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>

                        {/* Image Counter */}
                        <Badge className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white">
                            {currentIndex + 1} / {images.length}
                        </Badge>

                        {/* Action Buttons */}
                        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button
                                variant="outline"
                                size="icon"
                                className="bg-white/90 backdrop-blur-sm hover:bg-white"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    // Share functionality
                                }}
                            >
                                <Share2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden transition-all duration-300 ${index === currentIndex
                                    ? "ring-2 ring-primary ring-offset-2 scale-105"
                                    : "hover:scale-105 opacity-70 hover:opacity-100"
                                }`}
                            onClick={() => setCurrentIndex(index)}
                        >
                            <img
                                src={image || "/placeholder.svg"}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {isLightboxOpen && (
                <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
                    {/* Header */}
                    <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <h3 className="text-white font-medium">{title}</h3>
                                <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                                    {lightboxIndex + 1} / {images.length}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                                >
                                    {isAutoPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                                    onClick={handleZoomOut}
                                    disabled={zoomLevel <= 0.5}
                                >
                                    <ZoomOut className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                                    onClick={handleZoomIn}
                                    disabled={zoomLevel >= 3}
                                >
                                    <ZoomIn className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                                    onClick={handleDownload}
                                >
                                    <Download className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                                    onClick={closeLightbox}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Main Image */}
                    <div className="absolute inset-0 flex items-center justify-center p-4 pt-20 pb-24">
                        <img
                            src={images[lightboxIndex] || "/placeholder.svg"}
                            alt={`${title} - Image ${lightboxIndex + 1}`}
                            className="max-w-full max-h-full object-contain transition-transform duration-300"
                            style={{ transform: `scale(${zoomLevel})` }}
                        />
                    </div>

                    {/* Navigation */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20"
                        onClick={prevLightboxImage}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20"
                        onClick={nextLightboxImage}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>

                    {/* Thumbnail Strip */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                        <div className="flex gap-2 justify-center overflow-x-auto">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    className={`relative flex-shrink-0 w-16 h-12 rounded overflow-hidden transition-all duration-300 ${index === lightboxIndex
                                            ? "ring-2 ring-white scale-110"
                                            : "opacity-60 hover:opacity-100 hover:scale-105"
                                        }`}
                                    onClick={() => {
                                        setLightboxIndex(index)
                                        setZoomLevel(1)
                                    }}
                                >
                                    <img
                                        src={image || "/placeholder.svg"}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
