import React from 'react'
import { Badge } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Camera, Upload, X } from 'lucide-react'

export default function StepFourCreatePostNew({ formData, handleImageUpload, removeImage }: { formData: any, handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void, removeImage: (index: number) => void }) {
    return (
        <div className="space-y-8">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Hình ảnh bất động sản</label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center bg-gradient-to-br from-gray-50 to-white hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Upload className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Tải lên hình ảnh</h3>
                    <p className="text-gray-600 mb-2">Kéo thả hoặc click để chọn ảnh</p>
                    <p className="text-sm text-gray-500 mb-6">Hỗ trợ JPG, PNG. Tối đa 10 ảnh, mỗi ảnh dưới 5MB</p>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                    />
                    <Button
                        type="button"
                        onClick={() => document.getElementById("image-upload")?.click()}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                        <Camera className="w-4 h-4 mr-2" />
                        Chọn ảnh từ máy
                    </Button>
                </div>
            </div>

            {formData.images.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-medium text-gray-700">
                            Ảnh đã tải lên ({formData.images.length}/10)
                        </p>
                        <p className="text-xs text-gray-500">Kéo thả để sắp xếp thứ tự</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {formData.images.map((image: any, index: number) => (
                            <div key={index} className="relative group">
                                <div className="relative overflow-hidden rounded-xl">
                                    <img
                                        src={image || "/placeholder.svg"}
                                        alt={`Upload ${index + 1}`}
                                        className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                </div>
                                <button
                                    onClick={() => removeImage(index)}
                                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                {index === 0 && (
                                    <Badge className="absolute bottom-2 left-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs">
                                        Ảnh đại diện
                                    </Badge>
                                )}
                                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                                    {index + 1}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 p-4 bg-green-50 rounded-xl">
                        <p className="text-sm text-green-800">
                            💡 <strong>Mẹo:</strong> Ảnh đầu tiên sẽ là ảnh đại diện. Hãy chọn ảnh đẹp nhất!
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
