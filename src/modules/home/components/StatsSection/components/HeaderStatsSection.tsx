import { TrendingUp } from 'lucide-react'
import React from 'react'

export default function HeaderStatsSection({ isVisible }: { isVisible: boolean }) {
    return (
        <>
            <div className="text-center mb-16 lg:mb-20">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <TrendingUp className="w-4 h-4" />
                    Thành tích nổi bật
                </div>

                <h2
                    className={`text-4xl lg:text-6xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                >
                    Những con số ấn tượng
                </h2>

                <p
                    className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                >
                    Chúng tôi tự hào là nền tảng cho thuê căn hộ hàng đầu với hàng ngàn khách hàng tin tưởng và những thành tích
                    đáng tự hào
                </p>
            </div>
        </>
    )
}
