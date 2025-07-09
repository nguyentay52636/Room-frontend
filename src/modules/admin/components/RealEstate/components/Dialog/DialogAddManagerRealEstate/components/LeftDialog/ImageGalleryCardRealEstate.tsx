import { CardContent } from '@/components/ui/card'
import { CardHeader, CardTitle } from '@/components/ui/card'
import { Card } from '@/components/ui/card'
import { Camera, Upload } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export default function ImageGalleryCardRealEstate({ setCurrentImageIndex, formData, isReadOnly, currentImageIndex, handleInputChange, prevImage, nextImage }: any) {
    return (
        <>
            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                        <Camera className="h-5 w-5 text-blue-600" />
                        <span>Hình ảnh ({formData.images.length})</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {formData.images.length > 0 ? (
                        <div className="space-y-4">
                            {/* Main Image */}
                            <div className="relative group">
                                <img
                                    src={formData.images[currentImageIndex] || "/placeholder.svg?height=300&width=400"}
                                    alt={`Property ${currentImageIndex + 1}`}
                                    className="w-full h-64 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                                />
                                {formData.images.length > 1 && (
                                    <>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={prevImage}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={nextImage}
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                                            {currentImageIndex + 1} / {formData.images.length}
                                        </div>
                                    </>
                                )}
                                {!isReadOnly && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="absolute top-2 right-2 h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => {
                                            const newImages = formData.images.filter((_: any, i: any) => i !== currentImageIndex)
                                            handleInputChange("images", newImages)
                                            if (currentImageIndex >= newImages.length && newImages.length > 0) {
                                                setCurrentImageIndex(newImages.length - 1)
                                            }
                                        }}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                )}
                            </div>

                            {/* Thumbnail Strip */}
                            {formData.images.length > 1 && (
                                <div className="flex space-x-2 overflow-x-auto">
                                    {formData.images.map((image: any, index: any) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`flex-shrink-0 w-16 h-12 rounded border-2 overflow-hidden ${index === currentImageIndex ? "border-blue-500" : "border-gray-200 dark:border-gray-700"
                                                }`}
                                        >
                                            <img
                                                src={image || "/placeholder.svg?height=48&width=64"}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">Chưa có hình ảnh</p>
                            </div>
                        </div>
                    )}

                    {!isReadOnly && (
                        <div className="w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center hover:border-blue-400 transition-colors cursor-pointer">
                            <div className="text-center">
                                <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">Thêm ảnh</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </>
    )
}
