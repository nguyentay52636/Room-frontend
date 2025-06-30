import React from 'react'

export default function CallToActionSection({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      className={`text-center mt-16 lg:mt-20 transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
    >
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12 border border-blue-100">
        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
          Tham gia cùng hàng ngàn khách hàng hài lòng
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Trải nghiệm dịch vụ cho thuê căn hộ chuyên nghiệp và tìm được ngôi nhà mơ ước của bạn ngay hôm nay
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Khám phá ngay
          </button>
          <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-transparent">
            Liên hệ tư vấn
          </button>
        </div>
      </div>
    </div>
  )
}
