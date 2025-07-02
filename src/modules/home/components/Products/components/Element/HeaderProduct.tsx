import React from 'react'
import { Sparkles } from 'lucide-react'

export default function HeaderProduct({ isVisible }: { isVisible: boolean }) {
    return (
        <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
        >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                Bất động sản nổi bật
            </div>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Khám phá không gian sống{" "}
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">hoàn hảo</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Những căn hộ và phòng trọ chất lượng cao với thiết kế hiện đại, tiện nghi đầy đủ và giá cả hợp lý tại các vị
                trí đắc địa
            </p>
        </div>
    )
}
