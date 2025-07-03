import { MapPin } from 'lucide-react'
import React from 'react'

export default function StepOneCreatePostNew({ formData, handleInputChange, categories }: { formData: any, handleInputChange: (field: string, value: any) => void, categories: any[] }) {
    return (
        <div className="space-y-8">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Loại hình bất động sản</label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleInputChange("category", category.id)}
                            className={`p-6 border-2 rounded-xl flex flex-col items-center gap-3 transition-all duration-300 hover:shadow-lg ${formData.category === category.id
                                ? "border-blue-600 bg-gradient-to-br from-blue-50 to-purple-50 text-blue-600 shadow-lg transform scale-105"
                                : "border-gray-200 hover:border-gray-300 bg-white"
                                }`}
                        >
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center ${formData.category === category.id ? "bg-blue-100" : "bg-gray-100"
                                    }`}
                            >
                                {React.createElement(category.icon, { className: "w-6 h-6" })}
                            </div>
                            <div className="text-center">
                                <span className="font-medium">{category.name}</span>
                                <p className="text-xs text-gray-500 mt-1">{category.desc}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Tiêu đề tin đăng</label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="VD: Căn hộ 2PN tại Vinhomes Central Park - View sông tuyệt đẹp"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <p className="text-xs text-gray-500 mt-2">Tiêu đề hấp dẫn sẽ thu hút nhiều người xem hơn</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Địa chỉ chi tiết</label>
                <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="Nhập địa chỉ chi tiết (số nhà, đường, phường, quận)"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                </div>
                <p className="text-xs text-gray-500 mt-2">Địa chỉ càng chi tiết càng dễ tìm thấy</p>
            </div>
        </div>
    )
}
