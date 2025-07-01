import React from 'react'

export default function ProgressBarCarousel({ currentSlide, slides }: { currentSlide: number, slides: any }) {
    return (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <div
                className="h-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-500 ease-out relative overflow-hidden"
                style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
        </div>
    )
}
