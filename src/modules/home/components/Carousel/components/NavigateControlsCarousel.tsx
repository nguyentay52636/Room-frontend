import React from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useState } from 'react'
export default function NavigateControlsCarousel({ currentSlide, slides, isTransitioning, prevSlide, nextSlide, goToSlide }: { currentSlide: number, slides: any, isTransitioning: boolean, prevSlide: () => void, nextSlide: () => void, goToSlide: (index: number) => void }) {
    const [isPlaying, setIsPlaying] = useState(false)
    return (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
            <div className="flex items-center gap-6 bg-black/20 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-4">
                <button
                    onClick={prevSlide}
                    disabled={isTransitioning}
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-xl transition-all duration-300 hover:scale-110 disabled:opacity-50"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-3">
                    {slides.map((_, index: number) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            disabled={isTransitioning}
                            className={`h-2 rounded-full transition-all duration-500 ${index === currentSlide ? "w-8 bg-teal-500" : "w-2 bg-white/40 hover:bg-white/60"
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={nextSlide}
                    disabled={isTransitioning}
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-xl transition-all duration-300 hover:scale-110 disabled:opacity-50"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>

                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-xl transition-all duration-300 hover:scale-110 ml-2"
                >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
            </div>
        </div>

    )
}
