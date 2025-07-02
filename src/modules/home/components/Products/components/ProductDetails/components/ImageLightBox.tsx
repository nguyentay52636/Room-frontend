

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface ImageLightboxProps {
    images: string[]
    currentIndex: number
    isOpen: boolean
    onClose: () => void
    onImageChange: (index: number) => void
}

export function ImageLightBox({ images, currentIndex, isOpen, onClose, onImageChange }: ImageLightboxProps) {
    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [touchEnd, setTouchEnd] = useState<number | null>(null)

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return

            switch (e.key) {
                case "ArrowLeft":
                    prevImage()
                    break
                case "ArrowRight":
                    nextImage()
                    break
                case "Escape":
                    onClose()
                    break
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, currentIndex])

    // Handle touch events for swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > 50
        const isRightSwipe = distance < -50

        if (isLeftSwipe) {
            nextImage()
        }
        if (isRightSwipe) {
            prevImage()
        }

        setTouchStart(null)
        setTouchEnd(null)
    }

    const nextImage = () => {
        onImageChange((currentIndex + 1) % images.length)
    }

    const prevImage = () => {
        onImageChange((currentIndex - 1 + images.length) % images.length)
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center"
            onClick={onClose}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Close button */}
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/10 z-50"
                onClick={(e) => {
                    e.stopPropagation()
                    onClose()
                }}
            >
                <X className="h-6 w-6" />
            </Button>

            {/* Main image */}
            <div
                className="relative w-full h-[calc(100vh-200px)] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10 z-10"
                    onClick={(e) => {
                        e.stopPropagation()
                        prevImage()
                    }}
                >
                    <ChevronLeft className="h-8 w-8" />
                </Button>

                <div className="relative w-full max-w-5xl h-full">
                    <img
                        src={images[currentIndex] || "/placeholder.svg"}
                        alt={`Ảnh ${currentIndex + 1}`}

                        className="object-contain"

                    />
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10 z-10"
                    onClick={(e) => {
                        e.stopPropagation()
                        nextImage()
                    }}
                >
                    <ChevronRight className="h-8 w-8" />
                </Button>
            </div>

            {/* Image counter */}
            <div className="text-white text-center my-4">
                {currentIndex + 1} / {images.length}
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-2 overflow-x-auto p-4 max-w-full" onClick={(e) => e.stopPropagation()}>
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation()
                            onImageChange(index)
                        }}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${index === currentIndex ? "border-primary scale-110" : "border-gray-500 opacity-70"
                            }`}
                    >
                        <img
                            src={image || "/placeholder.svg"}
                            alt={`Thumbnail ${index + 1}`}
                            width={80}
                            height={64}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}
