import React from 'react'

export default function StepTwoCreatePostNew({ formData, handleInputChange }: { formData: any, handleInputChange: (field: string, value: any) => void }) {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Diện tích (m²)</label>
                    <input
                        type="number"
                        value={formData.area}
                        onChange={(e) => handleInputChange("area", e.target.value)}
                        placeholder="VD: 85"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Giá thuê (VNĐ/tháng)</label>
                    <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        placeholder="VD: 25000000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Số phòng ngủ</label>
                    <select
                        value={formData.bedrooms}
                        onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                        <option value="">Chọn số phòng ngủ</option>
                        <option value="0">Studio (không phòng ngủ riêng)</option>
                        <option value="1">1 phòng ngủ</option>
                        <option value="2">2 phòng ngủ</option>
                        <option value="3">3 phòng ngủ</option>
                        <option value="4">4+ phòng ngủ</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Số phòng tắm</label>
                    <select
                        value={formData.bathrooms}
                        onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                        <option value="">Chọn số phòng tắm</option>
                        <option value="1">1 phòng tắm</option>
                        <option value="2">2 phòng tắm</option>
                        <option value="3">3 phòng tắm</option>
                        <option value="4">4+ phòng tắm</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Tiền cọc (VNĐ)</label>
                    <input
                        type="number"
                        value={formData.deposit}
                        onChange={(e) => handleInputChange("deposit", e.target.value)}
                        placeholder="VD: 50000000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Ngày có thể vào ở</label>
                    <input
                        type="date"
                        value={formData.availableFrom}
                        onChange={(e) => handleInputChange("availableFrom", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Tình trạng nội thất</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["Không nội thất", "Nội thất cơ bản", "Đầy đủ nội thất"].map((option) => (
                        <button
                            key={option}
                            onClick={() => handleInputChange("furnished", option)}
                            className={`p-4 border-2 rounded-xl text-center transition-all duration-300 ${formData.furnished === option
                                ? "border-blue-600 bg-blue-50 text-blue-600"
                                : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
