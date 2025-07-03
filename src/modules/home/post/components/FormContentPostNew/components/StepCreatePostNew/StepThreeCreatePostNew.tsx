import { Badge } from 'lucide-react'
import React from 'react'

export default function StepThreeCreatePostNew({ formData, handleInputChange, amenitiesList, handleAmenityToggle }: { formData: any, handleInputChange: (field: string, value: any) => void, amenitiesList: any[], handleAmenityToggle: (amenityId: string) => void }) {
    return (
        <div className="space-y-8">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Mô tả chi tiết</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={8}
                    placeholder="Mô tả chi tiết về bất động sản:
• Vị trí, giao thông thuận lợi
• Tình trạng nội thất
• Tiện ích xung quanh (chợ, trường học, bệnh viện...)
• Quy định của chủ nhà
• Các ưu điểm nổi bật khác..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                    Mô tả chi tiết sẽ giúp khách hàng hiểu rõ hơn về căn nhà
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Tiện ích có sẵn</label>

                {/* Popular Amenities */}
                <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-600 mb-3">Tiện ích phổ biến</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {amenitiesList
                            .filter((a) => a.popular)
                            .map((amenity) => (
                                <button
                                    key={amenity.id}
                                    onClick={() => handleAmenityToggle(amenity.id)}
                                    className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all duration-300 hover:shadow-md ${formData.amenities.includes(amenity.id)
                                        ? "border-blue-600 bg-gradient-to-br from-blue-50 to-purple-50 text-blue-600 shadow-md"
                                        : "border-gray-200 hover:border-gray-300 bg-white"
                                        }`}
                                >
                                    {React.createElement(amenity.icon, { className: "w-6 h-6" })}
                                    <span className="text-sm font-medium text-center">{amenity.name}</span>
                                </button>
                            ))}
                    </div>
                </div>

                {/* Other Amenities */}
                <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-3">Tiện ích khác</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {amenitiesList
                            .filter((a) => !a.popular)
                            .map((amenity) => (
                                <button
                                    key={amenity.id}
                                    onClick={() => handleAmenityToggle(amenity.id)}
                                    className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all duration-300 hover:shadow-md ${formData.amenities.includes(amenity.id)
                                        ? "border-blue-600 bg-gradient-to-br from-blue-50 to-purple-50 text-blue-600 shadow-md"
                                        : "border-gray-200 hover:border-gray-300 bg-white"
                                        }`}
                                >
                                    {React.createElement(amenity.icon, { className: "w-6 h-6" })}
                                    <span className="text-sm font-medium text-center">{amenity.name}</span>
                                </button>
                            ))}
                    </div>
                </div>

                {formData.amenities.length > 0 && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                        <p className="text-sm font-medium text-blue-900 mb-2">
                            Đã chọn {formData.amenities.length} tiện ích:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {formData.amenities.map((amenityId: number) => {
                                const amenity = amenitiesList.find((a) => a.id === amenityId)
                                return (
                                    <Badge key={amenityId} className="bg-blue-600 text-white">
                                        {amenity?.name}
                                    </Badge>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
