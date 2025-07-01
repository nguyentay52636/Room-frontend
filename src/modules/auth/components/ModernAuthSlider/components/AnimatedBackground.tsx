import { Home, MapPin } from "lucide-react"
import React from "react"

interface AnimatedBackgroundProps {
    mousePosition: { x: number; y: number }
}

export function AnimatedBackground({ mousePosition }: AnimatedBackgroundProps) {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating Geometric Shapes */}
            <div
                className="absolute top-20 left-20 w-32 h-32 opacity-20 transition-all duration-[2000ms] ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 30}px) rotate(${mousePosition.x * 60}deg)`,
                }}
            >
                <div className="w-full h-full border-4 border-pink-300 rounded-full" />
            </div>
            <div
                className="absolute top-40 right-32 w-24 h-24 opacity-20 transition-all duration-[2000ms] ease-out"
                style={{
                    transform: `translate(${mousePosition.x * -35}px, ${mousePosition.y * 25}px) rotate(${mousePosition.y * 80}deg)`,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-blue-300 to-purple-300 rounded-lg" />
            </div>
            <div
                className="absolute bottom-32 left-32 w-20 h-20 opacity-20 transition-all duration-[2000ms] ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * -20}px) rotate(${mousePosition.x * -45}deg)`,
                }}
            >
                <div className="w-full h-full border-4 border-orange-300" />
            </div>
            <div
                className="absolute top-1/2 right-20 w-16 h-16 opacity-20 transition-all duration-[2000ms] ease-out"
                style={{
                    transform: `translate(${mousePosition.x * -25}px, ${mousePosition.y * 35}px) scale(${1 + mousePosition.x * 0.5})`,
                }}
            >
                <div className="w-full h-full bg-gradient-to-br from-green-300 to-teal-300 rounded-full" />
            </div>
            {/* House Icons */}
            <div
                className="absolute top-1/4 left-1/4 w-12 h-12 opacity-30 transition-all duration-[2000ms] ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 15}px)`,
                }}
            >
                <Home className="w-full h-full text-blue-400" />
            </div>
            <div
                className="absolute bottom-1/3 right-1/3 w-10 h-10 opacity-30 transition-all duration-[2000ms] ease-out"
                style={{
                    transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * 20}px)`,
                }}
            >
                <MapPin className="w-full h-full text-pink-400" />
            </div>
            {/* Decorative Dots Pattern */}
            <div className="absolute top-10 left-10 grid grid-cols-6 gap-2 opacity-30">
                {[...Array(24)].map((_, i) => (
                    <div
                        key={i}
                        className="w-2 h-2 bg-pink-300 rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 100}ms` }}
                    />
                ))}
            </div>
            <div className="absolute bottom-20 right-10 grid grid-cols-4 gap-3 opacity-30">
                {[...Array(16)].map((_, i) => (
                    <div
                        key={i}
                        className="w-3 h-3 bg-blue-300 rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 150}ms` }}
                    />
                ))}
            </div>
            {/* Plus Pattern */}
            <div className="absolute top-32 right-40 grid grid-cols-3 gap-1 opacity-30">
                {[...Array(9)].map((_, i) => (
                    <div
                        key={i}
                        className={`w-4 h-4 transition-all duration-1000 ${i === 1 || i === 3 || i === 4 || i === 5 || i === 7 ? "bg-pink-400" : "bg-transparent"}`}
                        style={{ animationDelay: `${i * 200}ms` }}
                    />
                ))}
            </div>
            {/* Wave Patterns */}
            <div className="absolute bottom-0 left-0 w-full h-32 opacity-20">
                <svg viewBox="0 0 1200 120" className="w-full h-full">
                    <path
                        d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
                        fill="url(#wave-gradient)"
                        className="animate-pulse"
                    />
                    <defs>
                        <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#93C5FD" />
                            <stop offset="50%" stopColor="#C084FC" />
                            <stop offset="100%" stopColor="#F9A8D4" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    )
} 