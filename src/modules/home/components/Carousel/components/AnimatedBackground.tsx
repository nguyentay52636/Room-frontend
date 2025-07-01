import React from 'react'

export default function AnimatedBackground({ slide, index, currentSlide, mousePosition }: { slide: any, index: number, currentSlide: number, mousePosition: any }) {
    return (
        <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.color}`} />

            {/* Animated Particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(25)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-float-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.3}s`,
                            animationDuration: `${6 + Math.random() * 4}s`,
                        }}
                    />
                ))}
            </div>

            {/* Geometric Shapes */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
                <div
                    className="absolute top-20 left-20 w-32 h-32 border border-white rounded-full"
                    style={{
                        transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 10}px)`,
                    }}
                />
                <div
                    className="absolute bottom-32 right-32 w-24 h-24 border border-white rotate-45"
                    style={{
                        transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -8}px) rotate(45deg)`,
                    }}
                />
            </div>
        </div>
    )
}
