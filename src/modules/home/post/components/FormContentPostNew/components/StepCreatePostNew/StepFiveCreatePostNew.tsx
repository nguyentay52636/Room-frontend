import React from 'react'
import { Eye, Camera, Info } from 'lucide-react'

export default function StepFiveCreatePostNew({ formData, handleInputChange }: { formData: any, handleInputChange: (field: string, value: any) => void }) {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Họ và tên *</label>
                    <input
                        type="text"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange("contactName", e.target.value)}
                        placeholder="Nhập họ và tên đầy đủ"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Số điện thoại *</label>
                    <input
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                        placeholder="VD: 0901234567"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
            </div>

            {/* Preview Card */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6">
                <h4 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Xem trước tin đăng của bạn
                </h4>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-start gap-4">
                        <div className="w-24 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                            {formData.images.length > 0 ? (
                                <img
                                    src={formData.images[0] || "/placeholder.svg"}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                <Camera className="w-8 h-8 text-gray-400" />
                            )}
                        </div>
                        <div className="flex-1">
                            <h5 className="font-semibold text-gray-900 mb-1">
                                {formData.title || "Tiêu đề tin đăng sẽ hiển thị ở đây"}
                            </h5>
                            <p className="text-sm text-gray-600 mb-2">
                                {formData.address || "Địa chỉ sẽ hiển thị ở đây"}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-red-600">
                                    {formData.price
                                        ? `${Number.parseInt(formData.price).toLocaleString()} VNĐ/tháng`
                                        : "Giá thuê"}
                                </span>
                                <div className="text-sm text-gray-500">
                                    {formData.area && `${formData.area}m²`}
                                    {formData.bedrooms && ` • ${formData.bedrooms}PN`}
                                    {formData.bathrooms && ` • ${formData.bathrooms}WC`}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-blue-600">
                                    {formData.contactName ? formData.contactName.charAt(0).toUpperCase() : "?"}
                                </span>
                            </div>
                            <div>
                                <p className="font-medium text-sm">{formData.contactName || "Tên người đăng"}</p>
                                <p className="text-xs text-gray-500">{formData.contactPhone || "Số điện thoại"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Terms */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                        <p className="font-medium text-yellow-800 mb-1">Lưu ý quan trọng:</p>
                        <ul className="text-yellow-700 space-y-1">
                            <li>• Tin đăng sẽ được kiểm duyệt trong vòng 24h</li>
                            <li>• Thông tin liên hệ sẽ được hiển thị công khai</li>
                            <li>• Bạn có thể chỉnh sửa tin đăng sau khi đăng</li>
                            <li>• Tin đăng miễn phí có thời hạn 30 ngày</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
